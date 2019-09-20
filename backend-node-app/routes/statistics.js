var express = require("express");
var router = express.Router();
const UserModel = require("../models/users.models");
const StatisticModel = require("../models/statistics.models");
const verify = require("./verifyToken");

router.get("/daily", verify, async (req, res, next) => {
	try {
		const today = await StatisticModel.find({});

		res.json([...today]);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/user/:id", verify, async (req, res, next) => {
	try {
		const user = await UserModel.findOne({ userId: req.params.id });

		const response = {
			preparedDishes: user.role == "waiter" ? 0 : user.dailyPlate,
			customersServed: user.role != "waiter" ? 0 : user.dailyPlate
		};
		res.json(response);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/endDay", verify, async (req, res, next) => {
	try {
		if (req.user.role != "cashier") {
			res.status(400).send("Permission Denied!");
		} else {
			await UserModel.updateMany({}, { $set: { dailyPlate: 0 } });
			await StatisticModel.updateOne(
				{ name: "todaysProfit" },
				{ $set: { statistic: 0 } }
			);
			await StatisticModel.updateOne(
				{ name: "todaysCustomers" },
				{ $set: { statistic: 0 } }
			);

			res.status(200).send({ res: "The resturant is closed!" });
		}
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;
