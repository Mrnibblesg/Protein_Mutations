const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

app.use(express.json());

const username = "AdminDB";
const password = "csci492";
const cluster = "Cluster0";
const dbname = "ProteinDB";

mongoose.connect(
  `mongodb+srv://AdminDB:csci492@cluster0.wj1zjhz.mongodb.net/?retryWrites=true&w=majority`, 
  {
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});