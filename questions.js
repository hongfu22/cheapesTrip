import inquirer from "inquirer";
import Places from "./places.js";

const places = new Places();
await places.initialize();

export async function selectContinent(fromTo) {
  try {
    const continet = await places.exploitContinentNames();
    if (continent.length === 0) {
      throw new Error("Invalid country name");
    }
    const message = {
      from: "Which continent are you leaving from?",
      to: "Which continent would you like to visit?",
    };
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "continent",
        message: message[fromTo],
        choices: continet,
      },
    ]);
    return answers.continent;
  } catch (error) {
    console.log("エラー:", error);
    throw error;
  }
}

export async function selectCountry(continent, fromTo) {
  try {
    const countryNames = await places.exploitCountryNames(continent);
    if (countryNames.length === 0) {
      throw new Error("Invalid country name");
    }
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
    return answers.country;
  } catch (error) {
    console.log("エラー:", error);
    throw error;
  }
}

export async function selectCity(country, fromTo) {
  try {
    const cityNames = await places.exploitCityNames(country);
    if (cityNames.length === 0) {
      throw new Error("Invalid country name");
    }
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
    return answers.city;
  } catch (error) {
    console.log("エラー:", error);
    throw error;
  }
}

export async function selectAirport(country) {
  try {
    const airportNames = await places.exploitAirportNames(country);
    if (airportNames.length === 0) {
      throw new Error("Invalid country name");
    }
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "airport",
        message: "Which airport will you use?",
        choices: airportNames,
      },
    ]);
    return answers.airport;
  } catch (error) {
    console.log("エラー:", error);
    throw error;
  }
}
