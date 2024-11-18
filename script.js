"use strict";

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
  let cryptoGained = (investAmount / currentPrice).toFixed(8);

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //How much money would I have if I invested _ money at _ price and the price went up to _?:

  //Variables used:
  //Invest Amount
  //Price At Purchase
  //Projected Price

  let boughtCrypto = (investAmount / priceAtPurchase).toFixed(8);
  let futureValue = (boughtCrypto * projectedPrice).toFixed(2);
  let profit = (futureValue - investAmount).toFixed(2);
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  document.querySelector("#cryptoGained").textContent = `Crypto Gained: ${cryptoGained} ${crypto}`;

  document.querySelector("#futureValue").textContent = `Future Value: ${currencySymbol}${futureValue} ${currency}`;

  document.querySelector("#profit").textContent = `Profit: ${currencySymbol}${profit} ${currency}`;

  // document.querySelector(".summary").textContent = `With ${cryptoGained} ${crypto} You would have ${futureValue}${currency} worth of ${crypto} making a profit of ${profit}${currency}`;
});
