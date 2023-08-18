import inquirer from "inquirer";
import confirm from "@inquirer/confirm";
import DatePrompt from "inquirer-date-prompt";
import { getMessage } from "./translation.js";

inquirer.registerPrompt("date", DatePrompt);

export default class Questions {
  async selectContinent(continent, fromTo) {
    if (continent.length === 0) {
      throw new Error(await getMessage("noContinent"));
    }
    const message = {
      from: await getMessage("fromContinent"),
      to: await getMessage("toContinent"),
    };
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "continent",
        message: message[fromTo],
        choices: continent,
      },
    ]);
    return answers.continent;
  }

  async selectCountry(countryNames, fromTo) {
    if (countryNames.length === 0) {
      throw new Error(await getMessage("noCountry"));
    }
    const message = {
      from: await getMessage("fromCountry"),
      to: await getMessage("toCountry"),
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
  }

  async selectCity(cityNames, fromTo) {
    if (cityNames.length === 0) {
      throw new Error(await getMessage("noCity"));
    }
    const message = {
      from: await getMessage("fromCity"),
      to: await getMessage("toCity"),
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
  }

  async selectAirport(airportNames) {
    if (airportNames.length === 0) {
      throw new Error(await getMessage("noAirport"));
    }
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "airport",
        message: await getMessage("airport"),
        choices: airportNames,
      },
    ]);
    return answers.airport;
  }

  async selectLanguage() {
    const languages = {
      Japanese: "jp",
      "English-US": "us",
      "Chinese-TW": "tw",
    };

    const locales = {
      jp: "ja-JP",
      us: "en-US",
      tw: "zh-TW",
    };

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: "言語を選んでください/Choose your language/選您的語言",
        choices: Object.keys(languages),
      },
    ]);

    const language = languages[answer.language];
    const locale = locales[language];
    return [language, locale];
  }

  // async selectLocale() {
  //   const locales = {
  //     "Japan": "ja-JP",
  //     "United States": "en-US",
  //     "Taiwan": "zh-TW"
  //   }

  //   const answer = await inquirer.prompt([
  //     {
  //       type: "list",
  //       name: "locale",
  //       message: "ご利用地域を教えてください/Tell us your area of use./選您使用的地理區域",
  //       choices: Object.keys(locales),
  //     },
  //   ]);

  //   return locales[answer.locale];
  // }

  async selectCurrency() {
    const currencies = {
      "Japanese Yen(JPY)": "JPY",
      "US dollar": "USD",
      "Taiwan Dollar(TWD)": "TWD",
    };

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "currency",
        message: "ご利用の通貨は？/What currency do you use?/您使用什麼貨幣?",
        choices: Object.keys(currencies),
      },
    ]);

    return currencies[answer.currency];
  }

  async isMonth() {
    const answer = await confirm({ message: getMessage("fixedMonth") });
    return answer;
  }

  async isDateFixed() {
    const answer = await confirm({ message: getMessage("fixedDay") });
    return answer;
  }

  async isReturn() {
    const answer = await confirm({ message: await getMessage("roundTrip") });
    return answer;
  }

  async selectDate(fromTo, dateFormat, locale) {
    const message = {
      fixed: await getMessage("fixed"),
      from: await getMessage("from"),
      to: await getMessage("to"),
    };
    const { timestamp } = await inquirer.prompt({
      type: "date",
      name: "timestamp",
      message: message[fromTo],
      prefix: " 🌎 ",
      filter: (date) => Math.floor(date.getTime() / 1000),
      validate: (time) => {
        const selectedDate = new Date(time * 1000);
        const currentDate = new Date();
        selectedDate.setUTCHours(0, 0, 0, 0);
        currentDate.setUTCHours(0, 0, 0, 0);
        if (selectedDate >= currentDate) {
          return true; // 有効な日付
        } else {
          return getMessage("invalidDate"); // 無効な日付のエラーメッセージ
        }
      },
      locale: locale,
      format: dateFormat,
    });
    return timestamp;
  }
}
