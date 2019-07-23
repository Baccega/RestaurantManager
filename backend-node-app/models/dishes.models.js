var mongoose = require("mongoose");

let dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 0
  },
  preparation: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Dish", dishSchema);
