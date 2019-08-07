const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  role: {
    type: String,
    required: true
  },
  totalPlate: { type: Number, default: 0 },
  dailyPlate: { type: Number, default: 0 }

});

userSchema.plugin(autoIncrement, { inc_field: "userId" });
module.exports = mongoose.model("User", userSchema);
