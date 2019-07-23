const mongoose = require("mongoose");
var DishesModel = require("../models/dishes.models");

let orderSchema = new mongoose.Schema({
  table: {
    type: Number,
    required: true
  },
  waiter: {
    type: String,
    required: true
  },
  dishes: { type: [DishesModel.Schema], required: true },
  delivered: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Orders", orderSchema);
