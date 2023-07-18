
import inquirer from 'inquirer';
import Places from './places.js'

const places = new Places();
await places.initialize();

  export async function selectContinent(fromTo) {
    const continet = await places.exploitContinentNames();
    const message = {
      from: 'Which continent are you leaving from?',
      to: 'Which continent would you like to visit?'
    };
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'continent',
          message: message[fromTo],
          choices: continet
        }
      ])
      .then(answers => {
        const continent = answers.continent;
        resolve(continent);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  export async function selectCountry(continent, fromTo) {
    const countryNames = await places.exploitCountryNames(continent);
    const message = {
      from: 'Which country are you leaving from?',
      to: 'Which country are you thinking of visiting?'
    };
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'country',
          message: message[fromTo],
          choices: countryNames
        }
      ])
      .then(answers => {
        const country = answers.country;
        resolve(country);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  export async function selectCity(country, fromTo) {
    const cityNames = await places.exploitCityNames(country);
    const message = {
      from: 'In which city are you planning to fly from?',
      to: 'Which city are you planning to fly to?'
    };
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'city',
          message: message[fromTo],
          choices: cityNames
        }
      ])
      .then(answers => {
        const city = answers.city;
        resolve(city);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  export async function selectAirport(country) {
    const airportNames = await places.exploitAirportNames(country);
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'airport',
          message: 'Which airport will you use?',
          choices: airportNames
        }
      ])
      .then(answers => {
        const airport = answers.airport;
        resolve(airport);
      })
      .catch(error => {
        reject(error);
      });
    });
  }




