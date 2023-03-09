import express from "express";
import path from "path";
import fs from "fs"

const app = express();

app.listen(3000, (err) => {
  err ? console.log(err) : console.log("listening 3000 port");
});

app.use(express.static("Front"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

app.post("/", (req, res) => {
  const data = fs.readFileSync(path.resolve("Front/data.json"), "utf8");
  let arr = JSON.parse(data);
  arr.push(req.body);
  fs.writeFileSync(path.resolve("Front/data.json"), JSON.stringify(arr));
});

app.put("/", (req, res) => {
  const data = fs.readFileSync(path.resolve("Front/data.json"), "utf8");
  let arr = JSON.parse(data);
  for (let elem of arr) {
    if (String(elem.id) === String(req.body.id_customer_for_add_money)) {
      if (req.body.sumOfMoney) {
        elem.balance += 1 + +req.body.sumOfMoney;
      }
    }
  }
  fs.writeFileSync(path.resolve("Front/data.json"), JSON.stringify(arr));
  res.send(arr);
});

app.put("/transfer.html", (req, res) => {
  const data = fs.readFileSync(path.resolve("Front/data.json"), "utf8");
  let arr = JSON.parse(data);
  for (let elem of arr) {
    if (String(elem.id) === String(req.body.money_from_id)) {
      elem.balance = +elem.balance - +req.body.sumOfTransferMoney;
      console.log(elem);
    }
    if (String(elem.id) === String(req.body.money_to_id)) {
      elem.balance = +elem.balance + +req.body.sumOfTransferMoney;
      console.log(elem);
    }
  }

  fs.writeFileSync(path.resolve("Front/data.json"), JSON.stringify(arr));
  res.redirect("/");
});

app.delete("/delete.html", (req, res) => {
  const data = fs.readFileSync(path.resolve("Front/data.json"), "utf8");
  let arr = JSON.parse(data);
  let sortedArr = arr.filter((elem) => {
    return String(elem.id) !== req.body.delete_account_id;
  });
  fs.writeFileSync(path.resolve("Front/data.json"), JSON.stringify(sortedArr));
  res.redirect("/");
});
