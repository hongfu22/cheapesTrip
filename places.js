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
      const placesInParent = place.filter((place) => place.parentId === parentEntityId);
      const placeNames = placesInParent.map(place => place.name);
      if(!placesInParent) {
        reject(new Error("Continent not found"));
      } else {
        resolve(placeNames);
      }
    });
  }

  async extractContinentNames() {
    return new Promise((resolve) => {
      resolve(this.continents.map(continent => continent.name));
    });
  }

  async extractCountryNames(selectContinent) {
    return new Promise((resolve, reject) => {
      const choosedContinent = this.continents.find((continent) => continent.name === selectContinent)
      this.countryNames = this.extractPlaceNames(this.countries, choosedContinent.entityId)
      if(!choosedContinent){
        reject(new Error("Continent not found"));
      } else {
        resolve(this.countryNames);
      }
    });
  }

  async extractCityNames(selectCountry) {
    return new Promise((resolve, reject) => {
      const choosedCountry = this.countries.find((country) => country.name === selectCountry);
      this.cityNames = this.extractPlaceNames(this.cities, choosedCountry.entityId);
      if(!choosedCountry){
        reject(new Error("Country not found"));
      } else {
        resolve(this.cityNames);
      }
    });
  }

  async extractAirportNames(selectCity) {
    return new Promise((resolve, reject) => {
      const choosedCity = this.cities.find((city) => city.name === selectCity);
      this.airportNames = this.extractPlaceNames(this.airports, choosedCity.entityId)
      if(!choosedCity){
        reject(new Error("City not found"));
      } else {
        resolve(this.airportNames);
      }
    });
  }

  async fetchAirportInfo(airportName){
    return new Promise((resolve, reject) => {
      const airport = this.airports.filter(
        (airport) => airport.name === airportName
      );
      if(!airport) {
        reject(new Error("Airport not found"))
      } else {
        resolve(airport)
      }
    });
  }
}
