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
    console.log("1");
    response = "CON Enter Your Name";
  }
  if (text !== "") {
    let array = text.split("*");
    if (array.length === 1) {
      response = "CON Enter Your ID Number";
    } else if (array.length === 2) {
      if (parseInt(array[1]) > 0) {
        response =
          "CON Confirm If you want to save the data\n1.Confirm.\n 2.Cancel";
      } else {
        response = "END Network error please try again later";
      }
    } else if (array.length === 3) {
      if (parseInt(array[2]) === 1) {
        let data = new User();
        data.fullname = array[0];
        data.id_number = array[1];
        data.save(() => {
          response = "END Your data has been saved";
        });
      } else if (parseInt(array[2]) === 2) {
        response = "END Data was not saved";
      } else {
        response = "END Inavlid input";
      }
    } else {
      response = "END Network error please try again later";
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
