const moment = require("moment")
// Convert each period to timeframe/range
const convertHoursToTime = (hour) => `${(parseInt(hour) < 10) ? '0'+hour : hour }:00:00`;

// create timeframes for each period
const getPeriodRange = (p) => {
      var min, max, period;
      period = p.toString()
      min = convertHoursToTime(p-1)
      max = convertHoursToTime(p)
      return {period, min, max}
}

// create all timeframes given number of periods
const createTimeframes = (nPeriods) => {
    var periods = {};
    for (var x = 1; x <= nPeriods; x++) {
      periods[x] = getPeriodRange(x)
    }
    return periods
}

// check if timestamp belongs to given period
const hasClickPeriod = (timestamp, min, max) => {
    var time = timestamp.slice(-8)
    var date = timestamp

    timestamp = moment(date+"T"+time, "MM-DD-YYYYTHH:mm:ss")
    min = moment(date+"T"+min, "MM-DD-YYYYTHH:mm:ss")
    max = moment(date+"T"+max, "MM-DD-YYYYTHH:mm:ss")


    if (timestamp >= min && timestamp < max){
        return true
    }

    return false
}

const groupClicks = (json_data, period) => {
    var period_clicks = []
    var invalid_ips = {}
    var ip_count = {} // use ip_count as lookup to counter IP appearance

    json_data.forEach(item => {
        var { ip, timestamp } = item
        if (ip_count[ip]){
            ip_count[ip] += 1
            if (ip_count[ip] > 10){
                invalid_ips[ip] = ip_count[ip]
            }
        } else{
            ip_count[ip] = 1
        }
        var {max, min} = period

        if (hasClickPeriod(timestamp, min, max)){
            period_clicks.push(item)
        }
    })
    return { period_clicks, invalid_ips }
 }


// Sort and find most expensive click with IP occurence <= 10
const checkIps = (json_data, period) => {

    var { period_clicks, invalid_ips } = groupClicks(json_data, period)
    var expensive_clicks = []

    // sort clicks by timestamp
    period_clicks.sort((a, b) => {
      a = moment(a.timestamp, "MM/DD/YYYY HH:mm:ss")
      b = moment(b.timestamp, "MM/DD/YYYY HH:mm:ss")
      return a - b
    })

    if (period_clicks.length > 0){
        for (var c in period_clicks){
            let click = period_clicks[c]
            var clickIndex = expensive_clicks.findIndex( c => c.ip === click.ip ) // find duplicate click
            var is_higher = false
            var is_valid_ip = !invalid_ips[click.ip]

            if (clickIndex >= 0) {
                is_higher = click.amount > expensive_clicks[clickIndex].amount
                expensive_clicks[clickIndex] = (is_higher) ? click : expensive_clicks[clickIndex]
            } else if (is_valid_ip && clickIndex === -1) {
                expensive_clicks.push(click)
            }
        }

    }

    return { period_clicks, expensive_clicks, invalid_ips }
}

const createResultset = (data) => {
    var timeframes = createTimeframes(24)
    var resultset = []
    for (var period in timeframes){
        var expensive_clicks = checkIps(data, timeframes[period]).expensive_clicks
        resultset.push(...expensive_clicks)
    }

    return resultset
}


module.exports = { convertHoursToTime, getPeriodRange, createTimeframes, checkIps, hasClickPeriod, createResultset }
