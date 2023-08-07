import Questions from "./questions.js";
import Places from "./places.js";
import { fetchCheapestFare } from "./api.js";


class Trip {
  constructor(){
    this.questions = new Questions();
    this.places = new Places();
    this.FIXEDDATEFORMAT = { month: "short", hour: undefined, minute: undefined };
    this.UNFIXEDDATEFORMAT= { month: "short", day: undefined, hour: undefined, minute: undefined };
  }

  async initialize(){
    await this.places.initialize();
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
      const airport = await this.questions.selectAirport(airportNames);
      return { selectedContinent, selectedCountry, selectedCity, airport: await this.places.fetchAirportInfo(airport) };
    } catch(error) {
      console.log(error);
      console.log("もう一度選んでください");
      return this.selectLocation(isDeparture);
    }
  }

  async selectDateRange(){
    if(this.isDateFixed){
      const date = new Date(await this.questions.selectDate('fixed', this.FIXEDDATEFORMAT) * 1000);
      return [date];
    } else {
      const startDate = new Date(await this.questions.selectDate('from', this.UNFIXEDDATEFORMAT) * 1000);
      const endDate = new Date(await this.questions.selectDate('to', this.UNFIXEDDATEFORMAT) * 1000);
      return [startDate, endDate];
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

  async showCheapestFare(){
    const departure = await this.selectLocation(true);
    const arrival = await this.selectLocation(false);
    const placesQuery = []
    this.isReturn = await this.questions.isReturn();
    this.isDateFixed = await this.questions.isDateFixed();
    console.log("行きの日程を教えてください");
    const departureDate = await trip.selectDateRange();

    const departureDateRange = await this.createDateQuery(departureDate, this.isDateFixed)
    placesQuery.push({
      originPlace: { queryPlace: { iata: departure.airport[0].iata } },
      destinationPlace: { queryPlace: { iata: arrival.airport[0].iata } },
      ...departureDateRange
    });

    if (this.isReturn) {
      console.log("帰りの日程を教えてください");
      const arrivalDate = await trip.selectDateRange();
      const arrivalDateRange = await this.createDateQuery(arrivalDate, this.isDateFixed)
      placesQuery.push({
        originPlace: { queryPlace: { iata: arrival.airport[0].iata } },
        destinationPlace: { queryPlace: { iata: departure.airport[0].iata } },
        ...arrivalDateRange
      });
    }
    const totalFare = await fetchCheapestFare(placesQuery);
    return totalFare;
  };
}

const trip = new Trip();
await trip.initialize();
const totalFare = await trip.showCheapestFare();

console.log(`合計${totalFare}円になります。`)