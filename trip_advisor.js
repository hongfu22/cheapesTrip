import Questions from "./questions.js";
import Places from "./places.js";
import { fetchCheapestFlight } from "./api.js";
import { initializeI18n, getMessage } from "./translation.js";


class Trip {
  constructor(){
    this.questions = new Questions();
    this.places = new Places();
    this.FIXEDDATEFORMAT = { month: "short", hour: undefined, minute: undefined };
    this.UNFIXEDDATEFORMAT= { month: "short", day: undefined, hour: undefined, minute: undefined };
  }

  async initialize(){
    this.language = await this.questions.selectLanguage();
    this.locale = await this.questions.selectLocale();
    this.currency = await this.questions.selectCurrency();
    await this.places.initialize(this.locale);
    await initializeI18n(this.language);
  }

  async selectLocation(isDeparture){
    try{
      const continent = await this.places.extractContinentNames()
      const selectedContinent = await this.questions.selectContinent(continent, isDeparture ? 'from' : 'to');
      const countryNames = await this.places.extractCountryNames(selectedContinent);
      const selectedCountry = await this.questions.selectCountry(countryNames, isDeparture ? 'from' : 'to');
      const cityNames = await this.places.extractCityNames(selectedCountry);
      const selectedCity = await this.questions.selectCity(cityNames, isDeparture ? 'from' : 'to');
      const airportNames = await this.places.extractAirportNames(selectedCity);
      const selectedAirport = await this.questions.selectAirport(airportNames);
      return { selectedContinent, selectedCountry, selectedCity, airport: await this.places.fetchAirportInfo(selectedAirport) };
    } catch(error) {
      console.log(error);
      console.log(await getMessage("again"));
      return this.selectLocation(isDeparture);
    }
  }

  async selectDateRange(){
    try{
      if(this.isDateFixed){
        const date = new Date(await this.questions.selectDate('fixed', this.FIXEDDATEFORMAT) * 1000);
        return [date];
      } else {
        const startDate = new Date(await this.questions.selectDate('from', this.UNFIXEDDATEFORMAT) * 1000);
        const endDate = new Date(await this.questions.selectDate('to', this.UNFIXEDDATEFORMAT) * 1000);
        if(startDate > endDate){ throw new Error("Invalid Date") }
        return [startDate, endDate];
      }
    } catch(error) {
      console.log(error);
      console.log(await getMessage("chooseDateAgain"));
      return this.selectDateRange();
    }
  }

  async createDateQuery(date, isDateFixed){
    if (isDateFixed) {
      return {
        fixedDate: {
          year: date[0].getFullYear(),
          month: date[0].getMonth() + 1,
          day: date[0].getDate()
        }
      };
    } else {
      return {
        dateRange: {
          startDate: {
            month: date[0].getMonth() + 1,
            year: date[0].getFullYear()
          },
          endDate: {
            month: date[1].getMonth() + 1,
            year: date[1].getFullYear()
          }
        }
      };
    }
  }

  async searchCheapestFlight(language, locale, currency){
    try{
      const departureLocation = await this.selectLocation(true);
      const arrivalLocation = await this.selectLocation(false);
      const placesQuery = []
      this.isReturn = await this.questions.isReturn();
      this.isDateFixed = await this.questions.isDateFixed();
      console.log(await getMessage("tellDepartureDate"));
      const departureDate = await this.selectDateRange();
      const departureDateRange = await this.createDateQuery(departureDate, this.isDateFixed)
      placesQuery.push({
        originPlace: { queryPlace: { iata: departureLocation.airport[0].iata } },
        destinationPlace: { queryPlace: { iata: arrivalLocation.airport[0].iata } },
        ...departureDateRange
      });

      if (this.isReturn) {
        console.log(await getMessage("tellReturnDate"));
        const arrivalDate = await this.selectDateRange();
        if(arrivalDate[0] < departureDate[0]){ throw new Error("Invalid Date") };
        const arrivalDateRange = await this.createDateQuery(arrivalDate, this.isDateFixed)
        placesQuery.push({
          originPlace: { queryPlace: { iata: arrivalLocation.airport[0].iata } },
          destinationPlace: { queryPlace: { iata: departureLocation.airport[0].iata } },
          ...arrivalDateRange
        });
      }
      const cheapestFlight = await fetchCheapestFlight(placesQuery, language, locale, currency);
      return cheapestFlight;
    } catch(error) {
      console.log(error);
      console.log(await getMessage("noTickets"))
      return this.searchCheapestFlight();
    }
  };

  async showCheapestFlight(cheapestFlight) {
    console.log(await getMessage("departureFlight"));
    console.log(`${await getMessage("airline")}:${cheapestFlight['departureFlightCarrier']}`);
    console.log(`${await getMessage("departureDate")}:${cheapestFlight['departureDateTime']['year']}-${cheapestFlight['departureDateTime']['month']}-${cheapestFlight['departureDateTime']['day']}`)
    console.log(await getMessage("returnFlight"))
    console.log(`${await getMessage("airline")}:${cheapestFlight['returnFlightCarrier']}`);
    console.log(`${await getMessage("returnDate")}:${cheapestFlight['returnDateTime']['year']}-${cheapestFlight['returnDateTime']['month']}-${cheapestFlight['returnDateTime']['day']}`)
    console.log("--------------------------")
    console.log(cheapestFlight['isDirect'] ? await getMessage("direct") : await getMessage("connectingFlight"))
    console.log(`${await getMessage("ticketPrice")}:${cheapestFlight['amount']}円`)
  }
}

const trip = new Trip();
await trip.initialize();
const cheapestFlight = await trip.searchCheapestFlight(trip.language.toUpperCase(), trip.locale, trip.currency);
await trip.showCheapestFlight(cheapestFlight);
