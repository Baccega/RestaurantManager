let mongoose = require("mongoose");

let billSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  orders: {
    type: [String],
    required: false
  },
  table: String,
  waiter: String
});

module.exports = mongoose.model("Bill", billSchema);
