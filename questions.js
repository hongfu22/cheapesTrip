
const inquirer = require('inquirer');

const region = ['Asia', 'Europe', 'Africa', 'Middle East', 'North America', 'South America']

module.exports = {
  selectRegion:() => {
    return inquirer.prompt([
      {
        name: 'region',
        message: 'Which region do you want to visit?',
        choices: region
      }
    ])
  },
  selectAirport:() => {
    return inquirer.prompt([
      {
        name: 'airport',
        message: 'Which region do you want to visit?',
        choices: ['Asia', 'Europe', 'Africa', 'Middle East', 'North America', 'South America']
      }
    ])
  }
}




