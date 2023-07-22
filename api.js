import request from "request";
const endpoint =
  "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search";
const apiKey = "sh428739766321522266746152871799";

export function fetchFee() {
  request.post(
    {
      uri: endpoint,
      headers: {
        "x-api-key": apiKey,
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
              anytime: true,
            },
            {
              originPlace: {
                queryPlace: { iata: "TPE" },
              },
              destinationPlace: {
                queryPlace: { iata: "HND" },
              },
              anytime: true,
            },
          ],
        },
      },
    },
    (error, response, data) => {
      if (error) {
        console.log(response.statusCode);
        console.log(error);
      } else {
        const quotesObject = data.content.results.quotes;
        const quotes = Object.keys(quotesObject).map(
          (key) => quotesObject[key].minPrice.amount
        );
        return quotes;
      }
    }
  );
}

export async function fetchPlace() {
  return new Promise((resolve, reject) => {
    request.get(
      {
        uri: "https://partners.api.skyscanner.net/apiservices/v3/geo/hierarchy/flights/ja-JP",
        headers: {
          "x-api-key": apiKey,
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
