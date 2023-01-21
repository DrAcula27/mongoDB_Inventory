// SETUP
// use express
const express = require("express");

// use mongoose
const mongoose = require("mongoose");

// allow use of information from .env
require("dotenv").config();

// import model
const Item = require("./models/item");

// create app by calling express function
const app = express();

// parse string JSON back into actual objects found in req.body
app.use(express.json());

// allow use of queries in URL; { extended: true } allows nested objects in URL
app.use(express.urlencoded({ extended: true }));

// tell express to serve public folder by default when a request is made to this port
app.use(express.static("public"));

// string from MongoDB -> hide username and password in .env file
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.muoiuud.mongodb.net/Inventory?retryWrites=true&w=majority`;

// set 'strictQuery' to false to add ability to add to schema
mongoose.set("strictQuery", false);

// connect to MongoDB database (models specify which collections)
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// function activates once to show successful connection to the database
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// ROUTES

// PORT -> tell server where to listen
app.listen(5000, () => {
  console.log(`Server is Listening on port 5000`);
});
