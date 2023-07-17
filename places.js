import { fetchPlace } from './api.js';

export default class Places {
  constructor(){
    this.places = [];
  }

  async initialize() {
    this.places = await fetchPlace();
  }

  async exploitContinentNames() {
    this.continents = this.places.filter(d => d.type === 'PLACE_TYPE_CONTINENT');
    this.continentNames = this.continents.map(continent => continent.name);
    this.countries = this.places.filter(d => d.type === 'PLACE_TYPE_COUNTRY');
    return this.continentNames
  }

  async exploitCountryNames(continent) {
    this.choosedContinent = this.continents.filter(d => d.name === continent);
    this.continentEntityId = this.choosedContinent[0]['entityId'];
    this.countries = this.places.filter(d => d.type === 'PLACE_TYPE_COUNTRY');
    this.countriesInContinent = this.countries.filter(country => country.parentId === this.continentEntityId);
    this.countryNames = this.countriesInContinent.map(country => country.name);
    return this.countryNames
  }

  async exploitCityNames(country) {
    this.choosedCountry = this.countries.filter(d => d.name === country);
    this.countryEntityId = this.choosedCountry[0]['entityId'];
    this.cities = this.places.filter(d => d.type === 'PLACE_TYPE_CITY');
    this.citiesInCountry = this.cities.filter(city => city.parentId === this.countryEntityId);
    this.cityNames = this.citiesInCountry.map(city => city.name);
    return this.cityNames
  }

  async exploitAirportNames(city) {
    this.choosedCity = this.cities.filter(d => d.name === city);
    this.cityEntityId = this.choosedCity[0]['entityId'];
    this.airports = this.places.filter(d => d.type === 'PLACE_TYPE_AIRPORT');
    this.airportsInCountry = this.airports.filter(airport => airport.parentId === this.cityEntityId);
    this.airportNames = this.airportsInCountry.map(airport => airport.name);
    return this.airportNames
  }
}
