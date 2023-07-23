// import { selectContinent, selectCountry, selectAirport, selectCity } from "./questions.js";
import * as questions from "./questions.js";

const departure_continent = await questions.selectContinent('from');
console.log(departure_continent);
const departure_country = await questions.selectCountry(departure_continent, 'from');
console.log(departure_country);
const departure_city = await questions.selectCity(departure_country, 'from');
console.log(departure_city);
const departure_airport = await questions.selectAirport(departure_city);
console.log(departure_airport);

const departureDateFixed = await questions.askDateFixed();
let departureDate = "";
let departureDateStart = ""
let departureDateEnd = ""
if(departureDateFixed){
  departureDate = new Date(await questions.selectDate('fixed') * 1000);
  // console.log(departureDate.getDate());
} else {
  departureDateStart = new Date(await questions.selectDate('from'));
  departureDateEnd = new Date(await questions.selectDate('to'));
  // console.log(departureDateStart);
  // console.log(departureDateEnd);
}


const arrival_continent = await questions.selectContinent('from');
console.log(arrival_continent);
const arrival_country = await questions.selectCountry(arrival_continent, 'from');
console.log(arrival_country);
const arrival_city = await questions.selectCity(arrival_country, 'from');
console.log(arrival_city);
const arrival_airport = await questions.selectAirport(arrival_city);
console.log(arrival_airport);

const returnDateFixed = await questions.askDateFixed();
let returnDate = ""
let returnDateStart = ""
let returnDateEnd = ""
if(returnDateFixed){
  returnDate = new Date(await questions.selectDate(returnDateFixed, 'fixed'));
  console.log(returnDate);
} else {
  returnDateStart = new Date(await questions.selectDate('from'));
  returnDateEnd = new Date(await questions.selectDate('to'));
  console.log(returnDateStart);
  console.log(returnDateEnd);
}
