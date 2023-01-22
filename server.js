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
// '/make_item' -> this route will get information from the front end and create a new Item in the collection
app.post("/make_item", async (req, res) => {
  const {
    nameString: name,
    priceNumber: price,
    inventoryNumber: inventory,
    nextDeliveryDate: deliveryDate,
    deliveryAmtNumber: deliveryAmt,
  } = req.body;

  // model methods usually give a promise, so wait for the response
  let returnedValue = await Item.create({
    name,
    price,
    inventory,
    deliveryDate,
    deliveryAmt,
  });

  console.log(returnedValue);
  if (returnedValue) {
    console.log("upload complete");
  }

  // send final value to the front end
  res.send(returnedValue);
});

// '/show_all_items' -> this route will get all Item objects from the database and send them to the front end
app.get("/show_all_items", async (req, res) => {
  // get data from database
  let response = await Item.find({});
  console.log(response);
  // send it back to front end
  res.json(response);
});

// '/search/:itemName' -> this route will take the value of the user's search and get that specific item from the database and send it to the front end to be displayed
app.get("/search/:itemName", async (req, res) => {
  let itemToShow = req.params.itemName;
  let regex = new RegExp(["^", itemToShow, "$"].join(""), "i");
  let itemRes = await Item.find({ name: regex });
  res.json(itemRes);
});

// '/delete_nameless_items' -> this route will delete all fruits that do not have a name
app.delete("/delete_nameless_items", async (req, res) => {
  let itemResponse = await Item.deleteMany({ name: "" });

  console.log(`${itemResponse}`);

  res.send({ data: `deleted ${itemResponse.deletedCount} items.` });
});

// PORT -> tell server where to listen
app.listen(5000, () => {
  console.log(`Server is Listening on port 5000`);
});
