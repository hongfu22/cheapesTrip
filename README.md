# cheapestrip

## Install/インストール/下載

`npm install -g cheapestrip`

## API キー

`export API_KEY=YOUR_API_KEY`

アプリを使うためには、API キーを次の[サイト](https://www.partners.skyscanner.net/contact/travel-api)で取得し、
上の YOUR_API_KEY の部分に差し替えてください。
テスト用の API キーなどは次の[サイト](https://developers.skyscanner.net/docs/getting-started/authentication)を参考にしてください。

## 使い方

1. 下のコマンドを入力してください
   ![コマンド](/image/start_jp.gif)

1. 言語と通貨通貨を選んでください
   ![言語と通貨](/image/setting_jp.gif)
1. 出発と到着の場所（大陸/国/都市/空港）を選んでください
   ![ロケーション](/image/location_jp.gif)
1. 往復の値段を出す場合 -> y、そうでなければ -> n
1. 月単位で日程が決まっていれば -> y、そうでなければ -> n
1. 日単位で日程が決まっていれば -> y、そうでなければ -> n
1. 決まっている日程の範囲に応じて日程を選んでください

- 月単位で決まっている：年月単位で選んでください
- 日単位で決まっている：年月日単位で選んでください
  ![旅程](/image/date_jp.gif)
- 日程内の最安値のチケット代が分かります。（日程を選択しなかった場合はその時点で最安値のチケット代が分かります。）

## API key

`export API_KEY=YOUR_API_KEY`

To use this app, you need to get API key [here](https://www.partners.skyscanner.net/contact/travel-api) and paste it in YOUR_API_KEY part.
If you want test API, please reference [here](https://developers.skyscanner.net/docs/getting-started/authentication)

## Usage

1. type this command
   ![command](/image/start_jp.gif)

1. Choose language and currency
   ![languageandcurrency](/image/setting_en.gif)
1. Choose location(Continent/Country/City/Airport) for departure and arrival
   ![location](/image/location_en.gif)
1. Include go and return way of price -> y, no -> n
1. If you've already fixed what month you will go(return) ->, if not -> n
1. If you've already fixed what date you will go(return) ->, if not -> n
1. Set your month/date depending on your fixed schedule.

- month fixed：choose what month(and year)
- date fixed：choose what date(also month and year)
  ![itinerary](/image/date_en.gif)
- You can get cheapest ticket price of flight（if you didn't choose month neither date, the package return cheapest price at the moment）

## API 密鑰

`export API_KEY=YOUR_API_KEY`

您要在以下網站拿下[API 密鑰](https://www.partners.skyscanner.net/contact/travel-api)用這 App
拿下後貼到 YOUR_API_KEY 部分。
如果您要測試 API 密鑰的話，去[這裡](https://developers.skyscanner.net/docs/getting-started/authentication)

## 怎麼用

1. 安裝
   ![安裝](/image/start_jp.gif)

1. 選語言和貨幣
   ![languageandcurrency](/image/setting_tw.gif)
1. 選出發和到達的地點（洲/国家/城市/机场）
   ![地點](/image/location_tw.gif)
1. 要知道往返旅程價格的話 -> y, 不然的話 -> n
1. 您已經決定了要去（返回）哪個月的話 -> y, 沒有計畫 -> n
1. 您已經決定了要去（返回）日期的話 -> y, 沒有計畫 -> n
1. 根據您的固定時間表，設置月份/日期

- 決定了哪個月：選幾月去（返回）
- 決定了日期：選什麼時候去（返回）(年月日)
  ![旅程](/image/date_tw.gif)
- 可以取得最便宜的機票價格（如果沒有日期計畫，可以取得目前最便宜的機票價格）

## 注意/Caution/注意

- 中国語を使用する場合は API の仕様でうまく動かない場合があります。
- When you use Chinese for package, sometimes the package doesn't work well due to API setting.
- 如果您用中文，由於 API 設定，它有時候不工作。
