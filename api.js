import request from "request";
const ENDPOINT =
  "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search";
const APIKEY = "sh428739766321522266746152871799";

export async function fetchCheapestFare(placesQuery) {
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
          queryLegs: placesQuery,
        },
      },
    },
    (error, response, data) => {
      const quotesObject = data.content.results.quotes;
      if (error || Object.entries(quotesObject).length === 0) {
        console.log(response.statusCode);
        reject(new Error("Ticket not found"))
      } else {
        const quotes = Object.keys(quotesObject).map(
          (key) => Number(quotesObject[key].minPrice.amount)
        );
        resolve(Math.min(...quotes));
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
