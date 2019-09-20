let mongoose = require("mongoose");

//Bisgona mettere un array di tipo model.Schema il ".Schema" è MEGA importante per le relazioni tra tabelle

let statisticsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	statistic: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("Statistics", statisticsSchema);
