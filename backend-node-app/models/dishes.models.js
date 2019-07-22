var mongoose =  require("mongoose");

let dishSchema = new mongoose.Schema ({
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
        required: true
    },
    status: {
        type: Number,
        required: true
    },   
    preparetion: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model ("Dish", dishSchema);