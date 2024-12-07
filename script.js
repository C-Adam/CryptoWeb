"use strict";

let crypto = document.querySelector("#crypto");
let currency = document.querySelector("#currency");
let livePrice = document.querySelector("#livePrice");

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

//--Update Live Price Function
function UpdateLivePrice() {
  switch (crypto.value) {
    case "unselected":
      livePrice.textContent = "";
      break;
    case "btc":
      currency.value == "eur" ? (livePrice.textContent = btcEurLivePrice) : (livePrice.textContent = btcUsdLivePrice);
      break;
    case "eth":
      currency.value == "eur" ? (livePrice.textContent = ethEurLivePrice) : (livePrice.textContent = ethUsdLivePrice);
      break;
    case "xrp":
      currency.value == "eur" ? (livePrice.textContent = xrpEurLivePrice) : (livePrice.textContent = xrpUsdLivePrice);
      break;
  }
}

//--Socket Methods
btcEurWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  btcEurLivePrice = stockObject.p;
};

btcUsdWs.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  btcUsdLivePrice = stockObject.p;
  UpdateLivePrice(); //We put this here because we want to update as much as possible and btcusd receives the most updates making it update the fastest out of all websockets
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

//--Selector Methods
crypto.addEventListener("change", UpdateLivePrice);
currency.addEventListener("change", UpdateLivePrice);

//--Find Current Price Function
function FindCurrentPrice() {
  let cp;

  switch (crypto.value) {
    case "unselected":
      cp = "_";
      break;
    case "btc":
      currency.value == "eur" ? (cp = btcEurLivePrice) : (cp = btcUsdLivePrice);
      break;
    case "eth":
      currency.value == "eur" ? (cp = ethEurLivePrice) : (cp = ethUsdLivePrice);
      break;
    case "xrp":
      currency.value == "eur" ? (cp = xrpEurLivePrice) : (cp = xrpUsdLivePrice);
      break;
  }
  return cp;
}

//--Calculate Button Function
document.querySelector("#calculateButton").addEventListener("click", function () {
  let investAmount = Number(document.querySelector("#investAmount").value);
  let priceAtPurchase = Number(document.querySelector("#priceAtPurchase").value);
  let projectedPrice = Number(document.querySelector("#projectedPrice").value);
  let currentPrice = Number(FindCurrentPrice()); //Finds the current crypto and currency that we are tracking.
  let currencySymbol = currency == "eur" ? "€" : "$";

  if (isNaN(currentPrice)) {
    document.querySelector("#cryptoGained").textContent = "Please Select a Cryptocurrency to receive results.";
    return; //Ensures that if no crypto is selected, don't continue the calculations.
  }
  //How much crypto would I gain if I invested _ amount at _ price?
  let cryptoGained = Number((investAmount / currentPrice).toFixed(8));

  //How much money would I have if I invested _ money at _ price and the price went up to _?:
  //Variables used:
  //Invest Amount
  //Price At Purchase
  //Projected Price
  let boughtCrypto = (investAmount / priceAtPurchase).toFixed(8);
  let futureValue = (boughtCrypto * projectedPrice).toFixed(2);
  let profit = (futureValue - investAmount).toFixed(2);

  //-----------
  if (cryptoGained == 0) {
    document.querySelector("#cryptoGained").textContent = `Crypto Gained: _`;
  } else {
    document.querySelector("#cryptoGained").textContent = `Crypto Gained: ${cryptoGained} ${crypto.value}`;
  }

  console.log(futureValue);
  if (isNaN(futureValue)) {
    document.querySelector("#futureValue").textContent = `Future Value: _`;
  } else {
    document.querySelector("#futureValue").textContent = `Future Value: ${currencySymbol}${futureValue}`;
  }

  document.querySelector("#profit").textContent = `Profit: ${currencySymbol}${profit}`;
});
