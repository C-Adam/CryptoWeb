"use strict";

let crypto = document.querySelector("#crypto");
let currency = document.querySelector("#currency");
let currentPrice = document.querySelector("#currentPrice");

//--Live Prices
let btcEurLivePrice = 0;
let btcUsdLivePrice = 0;
let ethEurLivePrice = 0;
let ethUsdLivePrice = 0;
let xrpEurLivePrice = 0;
let xrpUsdLivePrice = 0;

//--Web Sockets
let btcEurWs = new WebSocket("wss://stream.binance.com:9443/ws/btceur@trade");
let btcUsdWs = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
let ethEurWs = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
let ethUsdWs = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");
let xrpEurWs = new WebSocket("wss://stream.binance.com:9443/ws/xrpeur@trade");
let xrpUsdWs = new WebSocket("wss://stream.binance.com:9443/ws/xrpusdt@trade");

//--Socket Methods
btcEurWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  btcEurLivePrice = stockObject.p;
};

btcUsdWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  btcUsdLivePrice = stockObject.p;
};

ethEurWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  ethEurLivePrice = stockObject.p;
};

ethUsdWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  ethUsdLivePrice = stockObject.p;
};

xrpEurWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  xrpEurLivePrice = stockObject.p;
};

xrpUsdWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  xrpUsdLivePrice = stockObject.p;
};

//--Update Live Price Function
function UpdateLivePrice() {
  switch (crypto.value) {
    case "unselected":
      currentPrice.textContent = "";
      break;
    case "btc":
      currency.value == "eur" ? (currentPrice.textContent = btcEurLivePrice) : (currentPrice.textContent = btcUsdLivePrice);
      break;
    case "eth":
      currency.value == "eur" ? (currentPrice.textContent = ethEurLivePrice) : (currentPrice.textContent = ethUsdLivePrice);
      break;
    case "xrp":
      currency.value == "eur" ? (currentPrice.textContent = xrpEurLivePrice) : (currentPrice.textContent = xrpUsdLivePrice);
      break;
  }
}

//--Selector Methods
crypto.addEventListener("change", UpdateLivePrice);
currency.addEventListener("change", UpdateLivePrice);

//--Calculate Button Function
document.querySelector("#calculateButton").addEventListener("click", function () {
  let investAmount = Number(document.querySelector("#investAmount").value);
  let priceAtPurchase = Number(document.querySelector("#priceAtPurchase").value);
  let projectedPrice = Number(document.querySelector("#projectedPrice").value);

  let commission = 0.99;
  let currencySymbol = currency == "eur" ? "€" : "$";

  if (currency == "usd") {
    investAmount *= 1.05;
    priceAtPurchase *= 1.05;
    projectedPrice *= 1.05;
    currentPrice *= 1.05;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //How much crypto would I gain if I invested _ amount at _ price:
  let cryptoGained = Number((investAmount / currentPrice).toFixed(8));

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //How much money would I have if I invested _ money at _ price and the price went up to _?:

  //Variables used:
  //Invest Amount
  //Price At Purchase
  //Projected Price

  let boughtCrypto = (investAmount / priceAtPurchase).toFixed(8);
  let futureValue = (boughtCrypto * projectedPrice).toFixed(2);
  let profit = ((futureValue - investAmount) * commission).toFixed(2);
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  if (cryptoGained == "Infinity") {
    document.querySelector("#cryptoGained").textContent = "`Crypto Gained: _`";
  } else {
    document.querySelector("#cryptoGained").textContent = `Crypto Gained: ${cryptoGained} ${crypto}`;
  }

  document.querySelector("#futureValue").textContent = `Future Value: ${currencySymbol}${futureValue} ${currency}`;

  document.querySelector("#profit").textContent = `Profit: ${currencySymbol}${profit} ${currency}`;
});
