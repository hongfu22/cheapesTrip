
import inquirer from 'inquirer';
import Places from './places.js'

const places = new Places();
await places.initialize();

  export async function selectContinent() {
    const continet = await places.exploitContinentNames();
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'continent',
          message: 'Which continent do you want to visit?',
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

  export async function selectCountry(continent) {
    const countryNames = await places.exploitCountryNames(continent);
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'country',
          message: 'Which country do you want to visit?',
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

  export async function selectCity(country) {
    const cityNames = await places.exploitCityNames(country)
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'city',
          message: 'Which city do you want to visit?',
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
          message: 'Which airport do you want to visit?',
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




