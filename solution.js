const fs = require('fs');
const { createResultset } = require('./src/helpers');

const solution = (data) => {
    // create resultset json string given data
    var resultset = createResultset(data)

    // check if code output folder exists
    if (!fs.existsSync('code_output')){
        fs.mkdirSync('code_output');
    }

    // write resultset json string to file
    fs.writeFile('code_output/resultset.json', JSON.stringify(resultset), function (err) {
      if (err) {
          console.log(`there was an error ${err} while saving`)
          return false
      }
      console.log('resultset.json has been saved!');
      return true
    });
}

// load data from clicks.json
const data = require('./src/data/clicks.json');
// run solution
solution(data)
