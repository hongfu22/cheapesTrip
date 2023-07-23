import request from "request";
const ENDPOINT =
  "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search";
const APIKEY = "sh428739766321522266746152871799";

export async function fetchFee() {
  return new Promise((resolve, reject) => {
  request.post(
    {
      uri: ENDPOINT,
      headers: {
        "x-api-key": APIKEY,
        "Content-Type": "application/json",
      },
      json: {
        // JSONをPOSTする場合書く
        query: {
          market: "JP",
          locale: "ja-JP",
          currency: "JPY",
          queryLegs: [
            {
              originPlace: {
                queryPlace: { iata: "HND" },
              },
              destinationPlace: {
                queryPlace: { iata: "TPE" },
              },
              "dateRange": {
                "startDate":{
                    "month": 7,
                    "year": 2023
                },
                "endDate":{
                    "month": 8,
                    "year": 2023
                }
              },
            },
            {
              originPlace: {
                queryPlace: { iata: "TPE" },
              },
              destinationPlace: {
                queryPlace: { iata: "HND" },
              },
              "dateRange": {
                "startDate":{
                    "month": 7,
                    "year": 2023
                },
                "endDate":{
                    "month": 8,
                    "year": 2023
                }
              },
            },
          ],
        },
      },
    },
    (error, response, data) => {
      if (error) {
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
