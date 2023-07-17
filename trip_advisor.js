import { selectContinent, selectCountry, selectAirport, selectCity } from "./questions.js";

const continent = await selectContinent();
console.log(continent);
const country = await selectCountry(continent);
console.log(country);
const city = await selectCity(country);
console.log(city);
const airport = await selectAirport(city);
console.log(airport);
