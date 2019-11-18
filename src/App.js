import React, { Component } from 'react';
import './App.css';
import Clicks from './components/clicks'
import Display from './components/display'
import Periods from './components/periods'
import InputForm from './components/inputform'


const data = require('./data/clicks.json');
const { getPeriodRange, createPeriodRanges, checkClicks } = require('./helpers');


class App extends Component {

    constructor(props){
        super(props);
        this.state = {period: {}, period_clicks: [], highest_click: [], invalid_ips: [], hide_form: true, default_data: data}
    }

    // initialize display period to 1
    componentDidMount(){
        this.updatePeriod('1')
    }

     // update display data based on selected period
     updatePeriod = (period) => {
         period = getPeriodRange(period)

         var { period_clicks, highest_click, invalid_ips } = checkClicks(this.state.default_data, period)

         this.setState({ period, period_clicks, highest_click, invalid_ips })
     }

     // open form to update JSON data
     openForm = () => this.setState({hide_form: false})

     // close form to update JSON data
     closeForm = () => this.setState({hide_form: true})

     // reset to original JSON data
     reloadDefaultData = (data) => {
         var default_data = data

          var period = getPeriodRange("1")
          var { period_clicks, highest_click, invalid_ips } = checkClicks(default_data, period)

          this.setState({ period, period_clicks, highest_click, invalid_ips, default_data })
     }

     // Submit form with new JSON
     submitForm = (newjson) => {
         try {
             var jsonObject = JSON.parse(newjson);
             var default_data = jsonObject

              var period = getPeriodRange("1")
              var { period_clicks, highest_click, invalid_ips } = checkClicks(default_data, period)

             this.setState({ period, period_clicks, highest_click, invalid_ips, default_data })
             this.closeForm()
         } catch(e){
             window.confirm('Invalid JSON')

         }
     }



  render (){
      var { period, period_clicks, highest_click, invalid_ips, hide_form, default_data } = this.state
      if (hide_form === true ) {
          return (
              <div className="App">
                  <nav className={'navbar sticky-top navbar-dark bg-dark text-light'}>
                      <h4>Capterra Clicks</h4>
                      <span>
                      {
                              (default_data !== data) ? (
                              <div className="col text-secondary">
                                  <button style={{cursor:'pointer'}} className="btn btn-outline-warning btn-sm m-2" onClick={() => this.reloadDefaultData(data)}>
                                      <i className="fa fa-undo"></i>
                                      &nbsp; Reset to Default JSON (clicks.json)
                                  </button>
                                  <button style={{cursor:'pointer'}} className="btn btn-outline-secondary btn-sm m-2" onClick={()=> this.openForm()}>
                                      <i className="fa fa-edit"></i>
                                      &nbsp; Edit JSON
                                  </button>
                              </div>
                              ) : (
                                  <div className="col text-light">
                                      <span>Using Default JSON (clicks.json)
                                      <button style={{cursor:'pointer'}} className="btn btn-outline-secondary btn-sm m-2" onClick={()=> this.openForm()}>
                                          <i className="fa fa-edit"></i>
                                          &nbsp; Edit JSON
                                      </button>
                                      </span>
                                  </div>
                                )
                      }
                      </span>
                  </nav>

                  <div className="container">
                      <div className='row m-1 p-1'>
                          <Periods periods={createPeriodRanges(24)} updatePeriod={this.updatePeriod} period={period}  />
                      </div>

                      <div className="row m-2 p-3">
                          <div className={'col-md-12'}>
                              <Display period={period} period_clicks={period_clicks} highest_click={highest_click} invalid_ips={invalid_ips} openForm={this.openForm} />
                          </div>
                      </div>

                      <div className='row'>
                          <Clicks clickdata={default_data} period_clicks={period_clicks} invalid_ips={invalid_ips} />
                      </div>

                  </div>
              </div>
          )
      } else {
          return (
              <div className="App">
                  <nav className={'navbar sticky-top navbar-dark bg-dark text-light'}>
                      <h4>Capterra Clicks</h4>
                  </nav>

                  <div className="container">
                      <InputForm submitForm={this.submitForm} closeForm={this.closeForm} default_data={default_data} />
                  </div>

              </div>
          )
      }
  }
}

export default App;
