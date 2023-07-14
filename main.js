
const request = require('request');
const endpoint = 'https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search';
const apiKey = 'sh428739766321522266746152871799';


request.post({
  uri: endpoint,
  headers: {
    'x-api-key': apiKey,
    'Content-Type': 'application/json'
  },
  json: {
      // JSONをPOSTする場合書く
    query: {
      market: 'JP',
      locale: 'ja-JP',
      currency: 'JPY',
      queryLegs: [{
        originPlace: {
          queryPlace: { iata: 'HND' }
        },
        destinationPlace: {
          queryPlace: { iata: 'TPE' }
        },
        anytime: true
      }]
    }
  }
}, (error, response, data) => {
  if(error){
    console.log(response.statusCode)
    console.log(error)
  } else {
    const quotesObject = data.content.results.quotes;
    const quotes = Object.keys(quotesObject).map(key => quotesObject[key].minPrice.amount);
    console.log(quotes)
  }
});
