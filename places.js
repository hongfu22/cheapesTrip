import { fetchPlace } from "./api.js";

export default class Places {
  constructor() {
    this.places = [];
  }

  async initialize() {
    this.places = await fetchPlace();
    this.continents = this.places.filter(place => place.type === "PLACE_TYPE_CONTINENT");
    this.countries = this.places.filter(place => place.type === "PLACE_TYPE_COUNTRY");
    this.cities = this.places.filter(place => place.type === "PLACE_TYPE_CITY");
    this.airports = this.places.filter(place => place.type === "PLACE_TYPE_AIRPORT");
  }

  async extractPlaceNames(place, parentEntityId){
    return new Promise((resolve, reject) => {
      try {
        const placesInParent = place.filter((place) => place.parentId === parentEntityId);
        const placeNames = placesInParent.map(place => place.name);
        resolve(placeNames);
      } catch (error) {
        reject(error);
      }
    });
  }

  async extractContinentNames() {
    return this.continents.map(continent => continent.name);
  }

  async extractCountryNames(selectContinent) {
    return new Promise((resolve, reject) => {
      try {
        const choosedContinent = this.continents.find((continent) => continent.name === selectContinent)
        this.countryNames = this.extractPlaceNames(this.countries, choosedContinent.entityId)
        resolve(this.countryNames);
      } catch (error) {
        reject(error);
      }
    });
  }

  async extractCityNames(selectCountry) {
    return new Promise((resolve, reject) => {
      try {
        const choosedCountry = this.countries.find((country) => country.name === selectCountry);
        this.cityNames = this.extractPlaceNames(this.cities, choosedCountry.entityId);
        resolve(this.cityNames);
      } catch (error) {
        reject(error);
      }
    });
  }

  async extractAirportNames(selectCity) {
    return new Promise((resolve, reject) => {
      try {
        const choosedCity = this.cities.find((city) => city.name === selectCity);
        this.airportNames = this.extractPlaceNames(this.airports, choosedCity.entityId)
        resolve(this.airportNames);
      } catch (error) {
        reject(error);
      }
    });
  }

  async fetchAirportInfo(airportName){
    return new Promise((resolve, reject) => {
      try {
        this.airport = this.airports.filter(
          (airport) => airport.name === airportName
        );
        resolve(this.airport)
      } catch(error){
        reject(error)
      }
    });
  }
}
