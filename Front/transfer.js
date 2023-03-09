const money_from_id = document.getElementById("money_from");
const money_to_id = document.getElementById("money_to");
const sumOfTransferMoney = document.getElementById("sumOfTransferMoney");
const transfer_money = document.getElementById("transfer_money");

transfer_money.addEventListener("click", () => {
  fetch("/transfer.html", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      money_from_id: money_from_id.value,
      money_to_id: money_to_id.value,
      sumOfTransferMoney: sumOfTransferMoney.value,
    }),
  });
});
