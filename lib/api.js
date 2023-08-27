import request from "request";
import { getMessage } from "./translation.js";
const ENDPOINT =
  "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search";
const APIKEY = "sh428739766321522266746152871799";

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
        headers: {
          "x-api-key": APIKEY,
          "Content-Type": "application/json",
        },
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
            let lowestPrice = 0;
            let cheapestFlight = null;
            for (const key in fetchedFlights.quotes) {
              if (fetchedFlights.quotes.hasOwnProperty(key)) {
                const minPrice = parseInt(
                  fetchedFlights.quotes[key].minPrice.amount
                );
                if (minPrice < lowestPrice || lowestPrice === 0) {
                  lowestPrice = minPrice;
                  cheapestFlight = fetchedFlights.quotes[key];
                }
              }
            }
            const isDirect = cheapestFlight.isDirect;
            const departureDateTime =
              cheapestFlight.outboundLeg.departureDateTime;
            const departureFlightCarrier =
              fetchedFlights.carriers[
                cheapestFlight.outboundLeg.marketingCarrierId
              ].name;
            const returnDateTime = cheapestFlight.inboundLeg.marketingCarrierId
              ? cheapestFlight.inboundLeg.departureDateTime
              : "";
            const returnFlightCarrier = cheapestFlight.inboundLeg
              .marketingCarrierId
              ? fetchedFlights.carriers[
                  cheapestFlight.inboundLeg.marketingCarrierId
                ].name
              : "";
            resolve({
              amount: lowestPrice,
              isDirect: isDirect,
              departureDateTime: departureDateTime,
              returnDateTime: returnDateTime,
              departureFlightCarrier: departureFlightCarrier,
              returnFlightCarrier: returnFlightCarrier,
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
        headers: {
          "x-api-key": APIKEY,
          "Content-Type": "application/json",
        },
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
        headers: {
          "x-api-key": APIKEY,
          "Content-Type": "application/json",
        },
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
