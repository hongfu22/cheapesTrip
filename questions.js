import inquirer from "inquirer";
import confirm from '@inquirer/confirm';
import DatePrompt from "inquirer-date-prompt";

inquirer.registerPrompt("date", DatePrompt);

export default class Questions{
  async selectContinent(continent, fromTo) {
      const message = {
        from: "Which continent are you leaving from?",
        to: "Which continent would you like to visit?",
      };
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "continent",
          message: message[fromTo],
          choices: continent,
        },
      ]);
      return new Promise((resolve, reject) => {
        if (continent.length === 0) {
          reject(new Error("No countries in this continent"));
        } else {
          resolve(answers.continent);
        }
      });
  }

  async selectCountry(countryNames, fromTo) {
    const message = {
      from: "Which country are you leaving from?",
      to: "Which country are you thinking of visiting?",
    };
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "country",
        message: message[fromTo],
        choices: countryNames,
      },
    ]);
    return new Promise((resolve, reject) => {
      if (countryNames.length === 0) {
        reject(new Error("No countries in this continent"));
      } else {
        resolve(answers.country);
      }
    });
  }

  async selectCity(cityNames, fromTo) {
    const message = {
      from: "In which city are you planning to fly from?",
      to: "Which city are you planning to fly to?",
    };
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "city",
        message: message[fromTo],
        choices: cityNames,
      },
    ]);
    return new Promise((resolve, reject) => {
      if (cityNames.length === 0) {
        reject(new Error("No cities in this country"));
      } else {
        resolve(answers.city);
      }
    });
  }

  async selectAirport(airportNames) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "airport",
        message: "Which airport will you use?",
        choices: airportNames,
      },
    ]);
    return new Promise((resolve, reject) => {
      if (airportNames.length === 0) {
        reject(new Error("No airport in this city"));
      } else {
        resolve(answers.airport);
      }
    });
  }

  async isDateFixed() {
    const answer = await confirm({ message: "Do you have a fixed flight itinerary?" });
    return answer;
  }

  async isReturn() {
    const answer = await confirm({ message: "Do you also need returning flight info?" });
    return answer;
  }

  async selectDate(fromTo, dateFormat) {
    const message = {
      fixed: "When?",
      from: "From?",
      to: "To?",
    };
    const { timestamp } = await inquirer.prompt({
      type: "date",
      name: "timestamp",
      message: message[fromTo],
      prefix: " 🌎 ",
      filter: (date) => Math.floor(date.getTime() / 1000),
      validate: (time) => time * 1000 > Date.now() + 86400000 || "Invalid Date",
      format: dateFormat,
    });
    return new Promise((resolve) => {
      resolve(timestamp);
    });
  }
}