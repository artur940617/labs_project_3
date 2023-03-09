const all_customers = document.getElementById("all_customers");

class Customer {
  constructor(firstName, lastName, id, balance) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.balance = balance;
  }
}

fetch("../data.json")
  .then((response) => response.json())
  .then((json) => {
    for (let i = 0; i < json.length; i++) {
      const elem_div = document.createElement("div");
      const elem_about = document.createElement("div");
      const elem_First_name = document.createElement("span");
      const elem_last_name = document.createElement("span");
      const elem_id = document.createElement("span");
      const elem_balance = document.createElement("span");
      elem_div.setAttribute("class", "customer");
      elem_balance.setAttribute("id", "balance");
      elem_id.setAttribute("id", "id");
      elem_about.setAttribute("id", "about");
      elem_div.appendChild(elem_id);
      elem_about.appendChild(elem_First_name);
      elem_about.appendChild(elem_last_name);
      elem_div.appendChild(elem_about);
      elem_div.appendChild(elem_balance);
      all_customers.appendChild(elem_div);
      let customer = new Customer(
        json[i].firstName,
        json[i].lastName,
        json[i].id,
        json[i].balance
      );
      elem_First_name.innerHTML = customer.firstName;
      elem_last_name.innerHTML = customer.lastName;
      elem_id.innerHTML = "id" + customer.id;
      elem_balance.innerHTML = "balance " + customer.balance + "$";
    }
  });

const create_new_account = document.getElementById("create_new_account");
const add_customer = document.getElementById("add-customer");
const clos = document.getElementById("close");
const add = document.getElementById("add");
const add_money = document.getElementById("add-money");
const addMoney = document.getElementById("addMoney");
const close_add_money = document.getElementById("close_add_money");

create_new_account.addEventListener("click", () => {
  add_customer.style.display = "block";
  add_money.style.display = "none";
});

addMoney.addEventListener("click", () => {
  add_money.style.display = "block";
  add_customer.style.display = "none";
});

close_add_money.addEventListener("click", () => {
  add_money.style.display = "none";
});

clos.addEventListener("click", () => {
  add_customer.style.display = "none";
});

let firstNameValue = document.getElementById("add-firstName");
let lastNameValue = document.getElementById("add-lastName");

add.addEventListener("click", () => {
  fetch("/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: Date.now(),
      firstName: firstNameValue.value,
      lastName: lastNameValue.value,
      balance: 0,
    }),
  });
});

let id_customer_for_add_money = document.getElementById(
    "id_customer_for_add_money"
  ),
  sumOfMoney = document.getElementById("sumOfMoney"),
  add_money_button = document.getElementById("add_money");

add_money_button.addEventListener("click", () => {
  fetch("/", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sumOfMoney: sumOfMoney.value,
      id_customer_for_add_money: id_customer_for_add_money.value,
    }),
  });
  window.location.reload();
});
