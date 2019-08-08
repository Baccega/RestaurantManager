let mongoose = require("mongoose");

let billSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  dishes: {
    type: Object,
    required: false
  },
  table: String,
  customerNumber: Number,
  waiter: String,
  total: Number
});

module.exports = mongoose.model("Bill", billSchema);
