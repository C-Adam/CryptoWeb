"use strict";

let crypto = document.querySelector("#crypto");
let currency = document.querySelector("#currency");
let livePrice = document.querySelector("#livePrice");

let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${crypto.value}${currency.value}@trade`);

ws.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  livePrice.textContent = `Current Price: ${stockObject.p}`;
};

// crypto.addEventListener("change", function () {
//   let crypto = document.querySelector("#crypto");
//   let currency = document.querySelector("#currency");
//   ws.close();
//   console.log("old ws closed");

//   let newWs = new WebSocket(`wss://stream.binance.com:9443/ws/${crypto.value}${currency.value}@trade`);

//   newWs.onmessage = (event) => {
//     let stockObject = JSON.parse(event.data);
//     livePrice.textContent = `Current Price: ${stockObject.p}`;
//   }; //FIX, NEED TO SHOW NEW
// });

document.querySelector("#calculateButton").addEventListener("click", function () {
  let cryptoOwned = Number(document.querySelector("#cryptoOwned"));
  let currentPrice = Number(document.querySelector("#currentPrice").value);
  let projectedPrice = Number(document.querySelector("#projectedPrice").value);
  let crypto = document.querySelector("#crypto").value;
  let currency = document.querySelector("#currency").value;
  let investAmount = Number(document.querySelector("#investAmount").value);
  let priceAtPurchase = Number(document.querySelector("#priceAtPurchase").value);

  let commission = 0.99;
  let currencySymbol = currency == "EUR" ? "€" : "$";

  if (currency == "USD") {
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
