// use mongoose to make schema
const mongoose = require("mongoose");

// make schema
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  inventory: Number,
  nextDelivery: Date,
  deliveryAmt: Number,
});

// make a model from the schema and point it at the collection.
// can then use the model to CRUD in the collection.
const Item = mongoose.model("items", itemSchema);
// The first argument is the singular name of the collection the model is for. Mongoose automatically looks for the plural, lowercased version of the model name.

// export the model so it can be used.
module.exports = Item;
