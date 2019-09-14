var express = require("express");
var router = express.Router();
const UserModel = require("../models/users.models");
const BillModel = require("../models/bills.models");

router.get("/daily", async (req, res, next) => {
	try {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const found = await BillModel.find({ date: { $gte: today } });

		const response = found.reduce(
			({ customersServed, profit }, bill) => ({
				customersServed: customersServed + bill.customerNumber,
				profit: profit + bill.dishes.reduce((sum, dish) => sum + dish.price, 0)
			}),
			{ customersServed: 0, profit: 0 }
		);

		res.json(response);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/user/:id", async (req, res, next) => {
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

module.exports = router;
