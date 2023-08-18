import i18next from "i18next";

export async function initializeI18n(language) {
  await i18next.init({
    lng: language,
    debug: false,
    resources: {
      jp: {
        translation: {
          // エラー系
          noContinent: "大陸が見つかりませんでした。",
          noCountry: "国が見つかりませんでいた。",
          noCity: "都市が見つかりませんでした。",
          noAirport: "空港が見つかりませんでした。",
          noTicket: "チケットが見つかりませんでした。",
          invalidDate: "無効な日付です。",
          // Questionsクラス
          fromContinent: "出発地のある大陸を選んでください。",
          toContinent: "目的地のある大陸を選んでください。",
          fromCountry: "出発する国を選んでください。",
          toCountry: "訪れる国を選んでください。",
          fromCity: "出発する都市を選んでください。",
          toCity: "行きたい都市を選んでください。",
          airport: "空港を選んでください。",
          fixed: "いつ?",
          from: "出発月は?",
          to: "現地出発月は?",
          fixedMonth: "出発帰還月は決まっていますか？",
          fixedDay: "出発帰還日は決まっていますか?",
          roundTrip: "往復旅行ですか？?",
          // Tripクラス
          again: "もう一度選んでください",
          chooseDateAgain:
            "選択した日付が無効です。もう一度日付を選んでください",
          tellDepartureDate: "いつ出発しますか？",
          tellReturnDate: "いつ帰還しますか？",
          noTickets: "チケットがありませんでした。もう一度やり直してください。",
          departureFlight: "--------行きの飛行機--------",
          airline: "航空会社",
          departureDate: "出発日",
          returnDate: "帰還日",
          returnFlight: "--------帰りの飛行機--------",
          direct: "直行便",
          connectingFlight: "乗り継ぎあり",
          ticketPrice: "チケット代",
        },
      },
      us: {
        translation: {
          // Error
          noContinent: "Continent not found",
          noCountry: "Country not found",
          noCity: "City not found",
          noAirport: "Aiport not found",
          noTicket: "Ticket not found",
          invalidDate: "Invalid Date",
          // Questions
          fromContinent: "Which continent are you leaving from?",
          toContinent: "Which continent would you like to visit?",
          fromCountry: "Which country are you leaving from?",
          toCountry: "Which country are you thinking of visiting?",
          fromCity: "In which city are you planning to fly from?",
          toCity: "Which city are you planning to fly to?",
          airport: "Which airport will you use?",
          fixed: "When?",
          from: "When are you going to get bound flight?",
          to: "When are you going to get return flight?",
          fixedMonth: "Have you already decided what month you will go/return?",
          fixedDay: "Have you already decided what date you will go/return?",
          roundTrip: "Round-trip?",
          // Trip
          again: "Please choose again",
          chooseDateAgain: "The date you chose is invalid",
          tellDepartureDate: "When will you depart?",
          tellReturnDate: "When will you return?",
          noTickets: "No tickets were found. Please try again.",
          departureFlight: "--------Departure Flight--------",
          airline: "Airline",
          departureDate: "Departure date",
          returnDate: "Return date",
          returnFlight: "--------Return Flight--------",
          direct: "Direct flight",
          connectingFlight: "Connecting flight",
          ticketPrice: "Ticket Price",
        },
      },
      tw: {
        translation: {
          // Error
          noContinent: "找不到大陸",
          noCountry: "找不到國家",
          noCity: "找不到城市",
          noAirport: "找不到飛機場",
          noTicket: "找不到機票",
          invalidDate: "無效日期",
          // Questions
          fromContinent: "從哪個洲出發?",
          toContinent: "想去哪個洲?",
          fromCountry: "從哪個國家出發?",
          toCountry: "打算去哪個國家?",
          fromCity: "從哪個城市搭飛機場?",
          toCity: "到哪個城市?",
          airport: "哪個機場?",
          fixed: "什麼時候?",
          from: "什麼時候搭飛機去?",
          to: "什麼時候搭飛機回來?",
          fixedMonth: "您已經決定哪個月出發/返回?",
          fixedDay: "您已經決定出發/返回的日期嗎?",
          roundTrip: "往返旅程?",
          // Trip
          again: "請再選擇一次",
          chooseDateAgain: "你選的日期是無效",
          tellDepartureDate: "什麼時候出發?",
          tellReturnDate: "什麼時候返回?",
          noTickets: "找不到機票，請再選擇一次",
          departureFlight: "--------出發航班--------",
          airline: "航空公司",
          departureDate: "出發日期",
          returnDate: "返回日期",
          returnFlight: "--------回程航班--------",
          direct: "直飛航班",
          connectingFlight: "中轉航班",
          ticketPrice: "機票價格",
        },
      },
    },
  });
}

export async function getMessage(key) {
  return i18next.t(key);
}
