const mongoose =  require("mongoose");

let tableschema = new mongoose.Schema ({
    seats: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    free: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model ("Tables", tableschema);