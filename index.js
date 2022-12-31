//libraries
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//models
const user = require("./model/user");
const User = require("./model/user");

//Mongodb connection;
const database_url = "mongodb://localhost:27017/node";
mongoose.connect(database_url);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database is running");
});
//Body Parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Sucess MESSAGE");
});
app.post("/", (req, res) => {
  const { phoneNumber, text, sessionId } = req.body;
  let response;

  if (text === "") {
    response = "CON Main menu\n";
    response += "1. Register To acess Loan\n";
  }
  if (text == "1") {
    response = "CON Enter Your Full Name";
  } else if (text !== "") {
    let array = text.split("*");
    if (array.length === 2) {
      response = "CON Enter your ID";
    } else if (array.length === 3) {
      response = "CON Main menu\n";
      response += "1. Borrow a loan\n";
      response += "2. Check Loan Limit\n";
      response += "3. Pay loan\n";
    } else if (array.length === 4) {
      if (parseInt(array[3]) == 1) {
        response = "CON View loan options\n";
        response += "1. Short-term loan: 5% interest, due in 30 days\n";
        response += "2. Medium-term loan: 10% interest, due in 90 days\n";
        response += "3. Long-term loan: 15% interest, due in 180 days\n";
      }
    } else if (array.length === 5) {
      if (parseInt(array[4]) > 0) {
        response = "CON Apply for a loan\n";
        response += "Enter loan amount: [user inputs loan amount]\n";
      }
    } else if (array.length === 6) {
      response =
        "CON Confirm If you want apply for the loan\n1.Confirm.\n 2.Cancel";
    }
  }

  setTimeout(() => {
    console.log(text);
    res.send(response);
    res.end();
  }, 2000);
});

app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});
