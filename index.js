const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

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
    response = "CON Main menu";
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
