var express = require("express");
var router = express.Router();
const BillModel = require("../models/bills.models");
const TableModel = require("../models/tables.models");
const OrderModel = require("../models/orders.models");
const StatisticModel = require("../models/statistics.models");
const verify = require("./verifyToken");

/*
 * GET all bill
 */
router.get("/", verify, async (req, res, next) => {
	const allBills = await BillModel.find({});
	res.status(200).send(allBills);
});

router.post("/", verify, async (req, res, next) => {
	try {
		if (!req.body) res.status(400).send("Body is missing!");

		let table = await TableModel.findOne({ number: req.body.table });
		table.waiter = req.user._id;
		table.free = false;
		await table.save();

		const model = new BillModel({
			table: req.body.table,
			customerNumber: req.body.customer,
			waiter: req.user._id
		});

		const savedBill = await model.save();
		res.io.emit("new-table", table);
		res.status(200).send(savedBill);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

router.get("/:id", verify, async (req, res, next) => {
	try {
		const bill = await BillModel.findOne({ billId: req.params.id });
		if (!bill) res.status(400).send("Bill doesn't exist!");

		res.status(200).send(bill);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

router.post("/:tableId", verify, async (req, res, next) => {
	try {
		if (!req.body) res.status(400).send("Body is missing!");

		let bill = await BillModel.findOne({ table: req.params.tableId, total: 0 });
		bill.total = req.body.total;
		bill.dishes = req.body.dishes;

		await bill.save();

		await StatisticModel.updateOne(
			{ name: "todaysCustomers" },
			{ $inc: { statistic: bill.customerNumber } }
		);
		await StatisticModel.updateOne(
			{ name: "todaysProfit" },
			{ $inc: { statistic: req.body.total } }
		);

		let table = await TableModel.findOne({ number: req.params.tableId });
		table.free = true;
		table.waiter = "";
		await table.save();

		await OrderModel.deleteMany({ table: req.params.tableId });

		res.io.emit("new-bill", table);

		res.status(200).send(bill);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;
