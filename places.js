import { fetchPlace } from "./api.js";

export default class Places {
  constructor() {
    this.places = [];
  }

  async initialize() {
    this.places = await fetchPlace();
    console.log(this.places);
    this.continents = this.places.filter(place => place.type === "PLACE_TYPE_CONTINENT");
    this.countries = this.places.filter(place => place.type === "PLACE_TYPE_COUNTRY");
    this.cities = this.places.filter(place => place.type === "PLACE_TYPE_CITY");
    this.airports = this.places.filter(place => place.type === "PLACE_TYPE_AIRPORT");
  }

  async extractPlaceNames(place, parentEntityId, type){
    const placesInParent = place.filter((place) => place.parentId === parentEntityId);
    if(!placesInParent){ throw new Error(`${type} not found`); }
    const placeNames = placesInParent.map(place => place.name);
    return placeNames;
  }

  async extractContinentNames() {
    if(!this.continents){ throw new Error("Continent not found"); }
    return this.continents.map(continent => continent.name)
  }

  async extractCountryNames(selectContinent) {
    const choosedContinent = this.continents.find((continent) => continent.name === selectContinent)
    if(!choosedContinent){ throw new Error("Continent not found"); }
    this.countryNames = this.extractPlaceNames(this.countries, choosedContinent.entityId, "Country")
    return this.countryNames;
  }

  async extractCityNames(selectCountry) {
    const choosedCountry = this.countries.find((country) => country.name === selectCountry);
    if(!choosedCountry){ throw new Error("Country not found"); }
    this.cityNames = this.extractPlaceNames(this.cities, choosedCountry.entityId, "City");
    return this.cityNames;
  }

  async extractAirportNames(selectCity) {
    const choosedCity = this.cities.find((city) => city.name === selectCity);
    if(!choosedCity){ throw new Error("City not found"); }
    this.airportNames = this.extractPlaceNames(this.airports, choosedCity.entityId, "Airport");
    return this.airportNames;
  }

  async fetchAirportInfo(airportName){
    const airport = this.airports.filter(
      (airport) => airport.name === airportName
    );
    return airport
  }
}
