import Questions from "./questions.js";
import Places from "./places.js";
import { fetchFee } from "./api.js";

const questions = new Questions();
const places = new Places();

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
let departureDateStart = "";
let departureDateEnd = "";
let fixedDateFormat = { month: "short", hour: undefined, minute: undefined };
let dateFormat = { month: "short", day: undefined, hour: undefined, minute: undefined };
if(departureDateFixed){
  departureDate = new Date(await questions.selectDate('fixed', fixedDateFormat) * 1000);
} else {
  departureDateStart = new Date(await questions.selectDate('from', dateFormat));
  departureDateEnd = new Date(await questions.selectDate('to', dateFormat));
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
let returnDate = "";
let returnDateStart = "";
let returnDateEnd = "";

if(returnDateFixed){
  returnDate = new Date(await questions.selectDate('fixed', fixedDateFormat));
  console.log(returnDate);
} else {
  returnDateStart = new Date(await questions.selectDate('from', dateFormat));
  returnDateEnd = new Date(await questions.selectDate('to', dateFormat));
}
const fee = await fetchFee();
console.log(fee);