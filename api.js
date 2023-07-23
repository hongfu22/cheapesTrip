import request from "request";
const ENDPOINT =
  "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search";
const APIKEY = "sh428739766321522266746152871799";

export async function fetchCheapestFare(departureAirport, arrivalAirport, departureDate, arrivalDate) {
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
          market: "JP",
          locale: "ja-JP",
          currency: "JPY",
          queryLegs: [
            {
              originPlace: {
                queryPlace: { iata: departureAirport },
              },
              destinationPlace: {
                queryPlace: { iata: arrivalAirport },
              },
              ...departureDate,
            },
            {
              originPlace: {
                queryPlace: { iata: arrivalAirport },
              },
              destinationPlace: {
                queryPlace: { iata: departureAirport },
              },
              ...arrivalDate,
            },
          ],
        },
      },
    },
    (error, response, data) => {
      if (error) {
        console.log(response.statusCode);
        reject(error)
      } else {
        const quotesObject = data.content.results.quotes;
        const quotes = Object.keys(quotesObject).map(
          (key) => quotesObject[key].minPrice.amount
        );
        resolve(quotes);
      }
    }
  )});
}

export async function fetchPlace() {
  return new Promise((resolve, reject) => {
    request.get(
      {
        uri: "https://partners.api.skyscanner.net/apiservices/v3/geo/hierarchy/flights/ja-JP",
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
