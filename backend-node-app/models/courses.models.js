let mongoose = require("mongoose");
var DishesModel = require("../models/dishes.models");
const autoIncrement = require("mongoose-sequence")(mongoose);

//Bisgona mettere un array di tipo model.Schema il ".Schema" è MEGA importante per le relazioni tra tabelle

let courseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  dishes: {
    type: [DishesModel.schema],
    required: false
  }
});

courseSchema.plugin(autoIncrement, { inc_field: "courseId" });
module.exports = mongoose.model("Course", courseSchema);
