import Questions from "./questions.js";
import Places from "./places.js";
import { fetchCheapestFare } from "./api.js";

const questions = new Questions();
const places = new Places();
await places.initialize();

const FIXEDDATEFORMAT = { month: "short", hour: undefined, minute: undefined };
const UNFIXEDDATEFORMAT= { month: "short", day: undefined, hour: undefined, minute: undefined };
const CONTINENT = await places.exploitContinentNames();

class Trip {
  async selectDepatureLocation(){
    try{
      this.departureContinent = await questions.selectContinent(CONTINENT, 'from');
      const countryNames = await places.exploitCountryNames(this.departureContinent);
      this.departureCountry = await questions.selectCountry(countryNames, 'from');
      const cityNames = await places.exploitCityNames(this.departureCountry);
      this.departureCity = await questions.selectCity(cityNames, 'from');
      const airportNames = await places.exploitAirportNames(this.departureCity);
      const departureAirport = await questions.selectAirport(airportNames);
      this.departureAirport = await places.fetchAirportInfo(departureAirport);
      this.DateFixed = await questions.isDateFixed();
      if(this.DateFixed){
        this.departureDate = new Date(await questions.selectDate('fixed', FIXEDDATEFORMAT) * 1000);
      } else {
        this.departureDateStart = new Date(await questions.selectDate('from', UNFIXEDDATEFORMAT) * 1000);
        this.departureDateEnd = new Date(await questions.selectDate('to', UNFIXEDDATEFORMAT) * 1000);
      }
      this.isReturn = await questions.isReturn();
    } catch(error) {
      console.log(error);
      console.log("もう一度選んでください")
      return this.selectDepartureLocation()
    }
  }

  async selectArrivalLocation(){
    try{
      this.arrivalContinent = await questions.selectContinent(CONTINENT, 'to');
      const countryNames = await places.exploitCountryNames(this.arrivalContinent);
      this.arrivalCountry = await questions.selectCountry(countryNames, 'to');
      const cityNames = await places.exploitCityNames(this.arrivalCountry);
      this.arrivalCity = await questions.selectCity(cityNames, 'to');
      const airportNames = await places.exploitAirportNames(this.arrivalCity);
      const arrivalAirport = await questions.selectAirport(airportNames);
      this.arrivalAirport = await places.fetchAirportInfo(arrivalAirport);
      if(this.isReturn){
        if(this.DateFixed){
          this.arrivalDate = new Date(await questions.selectDate('fixed', FIXEDDATEFORMAT) * 1000);
        } else {
          this.arrivalDateStart = new Date(await questions.selectDate('from', UNFIXEDDATEFORMAT) * 1000);
          this.arrivalDateEnd = new Date(await questions.selectDate('to', UNFIXEDDATEFORMAT) * 1000);
        }
      }
    } catch(error) {
      console.log(error);
      console.log("もう一度選んでください")
      return this.selectArrivalLocation()
    }
  }

  async showCheapestFare(){
    const placesQuery = []
    const departurePlace = {
      originPlace: {
        queryPlace: { iata: this.departureAirport[0].iata },
      },
      destinationPlace: {
        queryPlace: { iata: this.arrivalAirport[0].iata },
      }
    };
    if(this.DateFixed){
      this.departureDateRange = {
        fixedDate: {
          year: this.departureDate.getFullYear(),
          month: this.departureDate.getMonth() + 1,
          day: this.departureDate.getDate()
        }
      };
    } else {
      this.departureDateRange = {
        dateRange: {
          startDate: {
            month: this.departureDateStart.getMonth() + 1,
            year: this.departureDateStart.getFullYear()
          },
          endDate: {
            month: this.departureDateEnd.getMonth() + 1,
            year: this.departureDateEnd.getFullYear()
          }
        }
      };
    }
    placesQuery.push({...departurePlace, ...this.departureDateRange})
    if(this.isReturn){
      const arrivalPlace = {
        originPlace: {
          queryPlace: { iata: this.arrivalAirport[0].iata },
        },
        destinationPlace: {
          queryPlace: { iata: this.departureAirport[0].iata },
        }
      };
      if(this.DateFixed){
        this.arrivalDateRange = {
          fixedDate: {
            year: this.arrivalDate.getFullYear(),
            month: this.arrivalDate.getMonth() + 1,
            day: this.arrivalDate.getDate()
          }
        };
      } else {
        this.arrivalDateRange = {
          dateRange: {
            startDate: {
              month: this.arrivalDateStart.getMonth() + 1,
              year: this.arrivalDateStart.getFullYear(),
            },
            endDate: {
              month: this.arrivalDateEnd.getMonth() + 1,
              year: this.arrivalDateEnd.getFullYear(),
            },
          },
        };
      }
      placesQuery.push({...arrivalPlace, ...this.arrivalDateRange})
    }
    const totalFare = await fetchCheapestFare(placesQuery);
    console.log(totalFare)
    return totalFare;
  };
}

const trip = new Trip();
await trip.selectDepatureLocation();
await trip.selectArrivalLocation();
const totalFare = await trip.showCheapestFare();

console.log(`合計${totalFare}円になります。`)