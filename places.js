import { fetchPlace } from "./api.js";

export default class Places {
  constructor() {
    this.places = [];
  }

  async initialize() {
    this.places = await fetchPlace();
  }

  async exploitContinentNames() {
    return new Promise((resolve, reject) => {
      try {
        this.continents = this.places.filter(
          (d) => d.type === "PLACE_TYPE_CONTINENT"
        );
        this.continentNames = this.continents.map(
          (continent) => continent.name
        );
        this.countries = this.places.filter(
          (d) => d.type === "PLACE_TYPE_COUNTRY"
        );
        resolve(this.continentNames);
      } catch (error) {
        reject(error);
      }
    });
  }

  async exploitCountryNames(continent) {
    return new Promise((resolve, reject) => {
      try {
        this.choosedContinent = this.continents.filter(
          (d) => d.name === continent
        );
        this.continentEntityId = this.choosedContinent[0]["entityId"];
        this.countries = this.places.filter(
          (d) => d.type === "PLACE_TYPE_COUNTRY"
        );
        this.countriesInContinent = this.countries.filter(
          (country) => country.parentId === this.continentEntityId
        );
        this.countryNames = this.countriesInContinent.map(
          (country) => country.name
        );
        resolve(this.countryNames);
      } catch (error) {
        reject(error);
      }
    });
  }

  async exploitCityNames(country) {
    return new Promise((resolve, reject) => {
      try {
        this.choosedCountry = this.countries.filter((d) => d.name === country);
        this.countryEntityId = this.choosedCountry[0]["entityId"];
        this.cities = this.places.filter((d) => d.type === "PLACE_TYPE_CITY");
        this.citiesInCountry = this.cities.filter(
          (city) => city.parentId === this.countryEntityId
        );
        this.cityNames = this.citiesInCountry.map((city) => city.name);
        resolve(this.cityNames);
      } catch (error) {
        reject(error);
      }
    });
  }

  async exploitAirportNames(city) {
    return new Promise((resolve, reject) => {
      try {
        this.choosedCity = this.cities.filter((d) => d.name === city);
        this.cityEntityId = this.choosedCity[0]["entityId"];
        this.airports = this.places.filter(
          (d) => d.type === "PLACE_TYPE_AIRPORT"
        );
        this.airportsInCountry = this.airports.filter(
          (airport) => airport.parentId === this.cityEntityId
        );
        this.airportNames = this.airportsInCountry.map(
          (airport) => airport.name
        );
        resolve(this.airportNames);
      } catch (error) {
        reject(error);
      }
    });
  }
}
