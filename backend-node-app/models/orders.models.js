const mongoose = require("mongoose");
var DishesModel = require("../models/dishes.models");
const autoIncrement = require("mongoose-sequence")(mongoose);

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
  foodStatus: {
    type: Number,
    default: 0
  },
  drinkStatus: {
    type: Number,
    default: 0
  }
});

orderSchema.plugin(autoIncrement, { inc_field: "orderId" });
module.exports = mongoose.model("Orders", orderSchema);
