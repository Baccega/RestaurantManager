const mongoose = require("mongoose");
var DishesModel = require("../models/dishes.models");

let orderSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  waiter: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  dishes: [DishesModel.Schema]
});

module.exports = mongoose.model("Orders", orderSchema);
