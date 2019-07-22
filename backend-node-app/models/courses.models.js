let mongoose =  require("mongoose");
var DishesModel = require("../models/dishes.models");


//Bisgona mettere un array di tipo model.Schema il ".Schema" è MEGA importante per le relazioni tra tabelle

let courseSchema = new mongoose.Schema ({
    category: {
        type: String,
        required: true
    },
    dishes: {
        type:[DishesModel.schema],
        required:false
    }
});

module.exports = mongoose.model ("Course", courseSchema );