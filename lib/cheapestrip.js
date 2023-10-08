import Questions from "./questions.js";
import Places from "./places.js";
import { fetchCheapestFlight } from "./api.js";
import { initializeI18n, getMessage } from "./translation.js";

export class Trip {
  constructor() {
    this.questions = new Questions();
    this.places = new Places();
    this.FIXEDDATEFORMAT = {
      month: "short",
      hour: undefined,
      minute: undefined,
    };
    this.UNFIXEDDATEFORMAT = {
      month: "short",
      day: undefined,
      hour: undefined,
      minute: undefined,
    };
  }

  async initialize() {
    [this.language, this.locale] = await this.questions.selectLanguage();
    this.currency = await this.questions.selectCurrency();
    await this.places.initialize(this.locale);
    await initializeI18n(this.language);
  }

  async selectLocation(isDeparture) {
    try {
      const continent = await this.places.extractContinentNames();
      const selectedContinent = await this.questions.selectContinent(
        continent,
        isDeparture ? "from" : "to"
      );
      const countryNames = await this.places.extractCountryNames(
        selectedContinent
      );
      const selectedCountry = await this.questions.selectCountry(
        countryNames,
        isDeparture ? "from" : "to"
      );
      const cityNames = await this.places.extractCityNames(selectedCountry);
      const selectedCity = await this.questions.selectCity(
        cityNames,
        isDeparture ? "from" : "to"
      );
      const airportNames = await this.places.extractAirportNames(selectedCity);
      const selectedAirport = await this.questions.selectAirport(airportNames);
      return {
        selectedContinent,
        selectedCountry,
        selectedCity,
        airport: await this.places.fetchAirportInfo(selectedAirport),
      };
    } catch (error) {
      console.log(error);
      console.log(await getMessage("again"));
      return this.selectLocation(isDeparture);
    }
  }

  async selectDateRange() {
    try {
      if (this.isDateFixed) {
        const date = new Date(
          (await this.questions.selectDate(
            "fixed",
            this.FIXEDDATEFORMAT,
            this.locale
          )) * 1000
        );
        return [date];
      } else {
        const startDate = new Date(
          (await this.questions.selectDate(
            "from",
            this.UNFIXEDDATEFORMAT,
            this.locale
          )) * 1000
        );
        const endDate = new Date(
          (await this.questions.selectDate(
            "to",
            this.UNFIXEDDATEFORMAT,
            this.locale
          )) * 1000
        );
        if (startDate > endDate) {
          throw new Error("Invalid Date");
        }
        return [startDate, endDate];
      }
    } catch (error) {
      console.log(error);
      console.log(await getMessage("chooseDateAgain"));
      return this.selectDateRange();
    }
  }

  async createDateQuery(date, isMonth, isDateFixed) {
    if (isMonth && isDateFixed) {
      return {
        fixedDate: {
          year: date[0].getFullYear(),
          month: date[0].getMonth() + 1,
          day: date[0].getDate(),
        },
      };
    } else if (isMonth) {
      return {
        dateRange: {
          startDate: {
            month: date[0].getMonth() + 1,
            year: date[0].getFullYear(),
          },
          endDate: {
            month: date[1].getMonth() + 1,
            year: date[1].getFullYear(),
          },
        },
      };
    }
  }

  async searchCheapestFlight(locale, currency) {
    try {
      const departureLocation = await this.selectLocation(true);
      const arrivalLocation = await this.selectLocation(false);
      const market = await this.places.extractMarketName(
        departureLocation.selectedCountry
      );
      const placesQuery = [];
      this.isReturn = await this.questions.isReturn();
      this.isMonth = await this.questions.isMonth();
      let departureDate = "";
      let departureDateRange = { anytime: true };
      if (this.isMonth) {
        this.isDateFixed = await this.questions.isDateFixed();
        console.log(await getMessage("tellDepartureDate"));
        departureDate = await this.selectDateRange();
        departureDateRange = await this.createDateQuery(
          departureDate,
          this.isMonth,
          this.isDateFixed
        );
      }
      placesQuery.push({
        originPlace: {
          queryPlace: { iata: departureLocation.airport[0].iata },
        },
        destinationPlace: {
          queryPlace: { iata: arrivalLocation.airport[0].iata },
        },
        ...departureDateRange,
      });

      if (this.isReturn) {
        let arrivalDate = "";
        let arrivalDateRange = { anytime: true };
        if (this.isMonth) {
          console.log(await getMessage("tellReturnDate"));
          arrivalDate = await this.selectDateRange();
          if (arrivalDate[0] < departureDate[0]) {
            throw new Error("Invalid Date");
          }
          arrivalDateRange = await this.createDateQuery(
            arrivalDate,
            this.isMonth,
            this.isDateFixed
          );
        }
        placesQuery.push({
          originPlace: {
            queryPlace: { iata: arrivalLocation.airport[0].iata },
          },
          destinationPlace: {
            queryPlace: { iata: departureLocation.airport[0].iata },
          },
          ...arrivalDateRange,
        });
      }
      const cheapestFlight = await fetchCheapestFlight(
        placesQuery,
        market,
        locale,
        currency
      );
      return cheapestFlight;
    } catch (error) {
      console.log(error);
      console.log(await getMessage("noTickets"));
      return this.searchCheapestFlight(locale, currency);
    }
  }

  async showCheapestFlight(cheapestFlight) {
    console.log(await getMessage("departureFlight"));
    console.log(
      `${await getMessage("airline")}:${
        cheapestFlight["departureFlightCarrier"]
      }`
    );
    console.log(
      `${await getMessage("departureDate")}:${
        cheapestFlight["departureDateTime"]["year"]
      }-${cheapestFlight["departureDateTime"]["month"]}-${
        cheapestFlight["departureDateTime"]["day"]
      }`
    );
    if (this.isReturn) {
      console.log(await getMessage("returnFlight"));
      console.log(
        `${await getMessage("airline")}:${
          cheapestFlight["returnFlightCarrier"]
        }`
      );
      console.log(
        `${await getMessage("returnDate")}:${
          cheapestFlight["returnDateTime"]["year"]
        }-${cheapestFlight["returnDateTime"]["month"]}-${
          cheapestFlight["returnDateTime"]["day"]
        }`
      );
    }
    console.log("--------------------------");
    console.log(
      cheapestFlight["isDirect"]
        ? await getMessage("direct")
        : await getMessage("connectingFlight")
    );
    console.log(
      `${await getMessage("ticketPrice")}:${cheapestFlight["amount"]} ${
        this.currency
      }`
    );
  }
}
