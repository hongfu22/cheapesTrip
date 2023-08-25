import { fetchPlace, fetchMarket } from "./api.js";
import { getMessage } from "./translation.js";

export default class Places {
  constructor() {
    this.places = [];
  }

  async initialize(locale) {
    this.places = await fetchPlace(locale);
    this.markets = await fetchMarket(locale);
    this.continents = this.places.filter(
      (place) => place.type === "PLACE_TYPE_CONTINENT"
    );
    this.countries = this.places.filter(
      (place) => place.type === "PLACE_TYPE_COUNTRY"
    );
    this.cities = this.places.filter(
      (place) => place.type === "PLACE_TYPE_CITY"
    );
    this.airports = this.places.filter(
      (place) => place.type === "PLACE_TYPE_AIRPORT"
    );
  }

  async extractPlaceNames(place, parentEntityId, type) {
    const placesInParent = place.filter(
      (place) => place.parentId === parentEntityId
    );
    if (!placesInParent) {
      throw new Error(await getMessage(`no${type}`));
    }
    const placeNames = placesInParent.map((place) => place.name);
    return placeNames;
  }

  async extractContinentNames() {
    if (!this.continents) {
      throw new Error(await getMessage("noContinent"));
    }
    return this.continents.map((continent) => continent.name);
  }

  async extractCountryNames(selectedContinent) {
    const choosedContinent = this.continents.find(
      (continent) => continent.name === selectedContinent
    );
    if (!choosedContinent) {
      throw new Error(await getMessage("noContinent"));
    }
    this.countryNames = this.extractPlaceNames(
      this.countries,
      choosedContinent.entityId,
      "Country"
    );
    return this.countryNames;
  }

  async extractCityNames(selectedCountry) {
    const choosedCountry = this.countries.find(
      (country) => country.name === selectedCountry
    );
    if (!choosedCountry) {
      throw new Error(await getMessage("noCountry"));
    }
    this.cityNames = this.extractPlaceNames(
      this.cities,
      choosedCountry.entityId,
      "City"
    );
    return this.cityNames;
  }

  async extractAirportNames(selectedCity) {
    const choosedCity = this.cities.find((city) => city.name === selectedCity);
    if (!choosedCity) {
      throw new Error(await getMessage("noCity"));
    }
    this.airportNames = this.extractPlaceNames(
      this.airports,
      choosedCity.entityId,
      "Airport"
    );
    return this.airportNames;
  }

  async extractMarketName(countryName) {
    const marketName = this.markets.find(
      (market) => market.name === countryName
    );
    return marketName.code;
  }

  async fetchAirportInfo(airportName) {
    const airport = this.airports.filter(
      (airport) => airport.name === airportName
    );
    return airport;
  }
}
