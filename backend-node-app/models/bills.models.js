let mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

let billSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  dishes: {
    type: Object,
    required: false,
    default: new Array()
  },
  table: String,
  customerNumber: Number,
  waiter: String,
  total: { type: Number, default: 0 }
});

billSchema.plugin(autoIncrement, { inc_field: "billId" });
module.exports = mongoose.model("Bill", billSchema);
