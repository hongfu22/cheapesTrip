import request from "request";
import { getMessage } from "./translation.js";
const ENDPOINT =
  "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search";
const APIKEY = process.env.API_KEY;
const HEADERS = {
  "x-api-key": APIKEY,
  "Content-Type": "application/json",
};

function findCheapestPrice(fetchedFlights) {
  let cheapestPrice = 0;
  let cheapestFlight = null;
  for (const key in fetchedFlights.quotes) {
    if (Object.prototype.hasOwnProperty.call(fetchedFlights.quotes, key)) {
      const minPrice = parseInt(fetchedFlights.quotes[key].minPrice.amount);
      if (minPrice < cheapestPrice || cheapestPrice === 0) {
        cheapestPrice = minPrice;
        cheapestFlight = fetchedFlights.quotes[key];
      }
    }
  }
  return [cheapestPrice, cheapestFlight];
}

function setFlightInfo(fetchedFlights, departureFlight, returnFlight) {
  const departureDateTime = departureFlight.departureDateTime;
  const departureFlightCarrier =
    fetchedFlights.carriers[departureFlight.marketingCarrierId]?.name;
  const returnDateTime = returnFlight?.departureDateTime || "";
  const returnFlightCarrier =
    fetchedFlights.carriers[returnFlight?.marketingCarrierId]?.name;
  return [
    departureDateTime,
    departureFlightCarrier,
    returnDateTime,
    returnFlightCarrier,
  ];
}

export async function fetchCheapestFlight(
  placesQuery,
  market,
  locale,
  currency
) {
  return new Promise((resolve, reject) => {
    request.post(
      {
        uri: ENDPOINT,
        headers: HEADERS,
        json: {
          query: {
            market: market,
            locale: locale,
            currency: currency,
            queryLegs: placesQuery,
          },
        },
      },
      (error, response, data) => {
        try {
          const fetchedFlights = data.content.results;
          if (error || Object.entries(fetchedFlights.quotes).length === 0) {
            console.log(response.statusCode);
            reject(new Error(getMessage("noTicket")));
          } else {
            const [cheapestPrice, cheapestFlight] =
              findCheapestPrice(fetchedFlights);
            const isDirect = cheapestFlight.isDirect;
            const [
              departureDateTime,
              departureFlightCarrier,
              returnDateTime,
              returnFlightCarrier,
            ] = setFlightInfo(
              fetchedFlights,
              cheapestFlight.outboundLeg,
              cheapestFlight.inboundLeg
            );
            resolve({
              amount: cheapestPrice,
              isDirect,
              departureDateTime,
              returnDateTime,
              departureFlightCarrier,
              returnFlightCarrier,
            });
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }
    );
  });
}

export async function fetchPlace(locale) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        uri: `https://partners.api.skyscanner.net/apiservices/v3/geo/hierarchy/flights/${locale}`,
        headers: HEADERS,
      },
      (error, response, data) => {
        if (error) {
          console.log(response.statusCode);
          reject(error);
        } else {
          const parsed_data = JSON.parse(data).places;
          const places = Object.keys(parsed_data).map(
            (key) => parsed_data[key]
          );
          resolve(places);
        }
      }
    );
  });
}

export async function fetchMarket(locale) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        uri: `https://partners.api.skyscanner.net/apiservices/v3/culture/markets/${locale}`,
        headers: HEADERS,
      },
      (error, response, data) => {
        if (error) {
          console.log(response.statusCode);
          reject(error);
        } else {
          const parsed_data = JSON.parse(data).markets;
          const markets = Object.keys(parsed_data).map(
            (key) => parsed_data[key]
          );
          resolve(markets);
        }
      }
    );
  });
}
