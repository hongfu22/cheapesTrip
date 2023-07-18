import { selectContinent, selectCountry, selectAirport, selectCity } from "./questions.js";

const departure_continent = await selectContinent('from');
console.log(departure_continent);
const departure_country = await selectCountry(departure_continent, 'from');
console.log(departure_country);
const departure_city = await selectCity(departure_country, 'from');
console.log(departure_city);
const departure_airport = await selectAirport(departure_city);
console.log(departure_airport);

const arrival_continent = await selectContinent('from');
console.log(arrival_continent);
const arrival_country = await selectCountry(arrival_continent, 'from');
console.log(arrival_country);
const arrival_city = await selectCity(arrival_country, 'from');
console.log(arrival_city);
const arrival_airport = await selectAirport(arrival_city);
console.log(arrival_airport);