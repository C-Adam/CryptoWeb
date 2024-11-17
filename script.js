"use strict";

document.querySelector("#calculateButton").addEventListener("click", function () {
  let currentPrice = Number(document.querySelector("#currentPrice").value);
  let projectedPrice = Number(document.querySelector("#projectedPrice").value);
  let crypto = document.querySelector("#crypto").value;
  let currency = document.querySelector("#currency").value;
  let investAmount = Number(document.querySelector("#investAmount").value);
  let priceAtPurchase = Number(document.querySelector("#priceAtPurchase").value);

  let commission = 0.99;

  if (currency == "usd") {
    investAmount *= 1.05;
    priceAtPurchase *= 1.05;
    projectedPrice *= 1.05;
    currentPrice *= 1.05;
  }

  let currentCrypto = ((investAmount / priceAtPurchase) * commission).toFixed(2);
  let cryptoGained = ((investAmount / currentPrice) * commission).toFixed(2);

  let futureGain = (currentCrypto * projectedPrice - commission).toFixed(2);

  let profit = (futureGain - investAmount).toFixed(2);

  console.log(profit);
  console.log(futureGain);
  console.log(cryptoGained);

  document.querySelector(".summary").textContent = `Crypto Gained: ${cryptoGained} ${crypto}
  Profit: x
  `;
});
