const OrderModel = require("../models/orders.models");
const TableModel = require("../models/tables.models");
const DishModel = require("../models/dishes.models");
const UserModel = require("../models/users.models");

const { orderValidation } = require("../validation");

const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

function filterOrderCategory(order, category) {
	order.dishes = order.dishes.filter(dish => dish.category != category);
	return order;
}
function filterOthersOrderCategory(order, category) {
	order.dishes = order.dishes.filter(dish => dish.category == category);
	return order;
}

/*
 * GET all orders
 */
router.get("/all", (req, res, next) => {
	OrderModel.find({})
		.then(doc => res.json(doc))
		.catch(err => res.status(500).json(err));
});

/*
 * POST Order at specified table table
 */
router.post("/", verify, async (req, res, next) => {
	if (!req.body) return res.status(400).send("Bad request, body missing");
	else {
		const table = await TableModel.findOne({ number: req.body.table });
		console.log(table);
		if (!table) {
			res.status(400).send("Table doesn't exist!");
		} else {
			let newOrder;
			//SE IL TAVOLO è VUOTO
			if (table.free) {
				table.free = false;
				await table.save();
			}
			//Creazione ordine
			newOrder = new OrderModel({
				table: table.number,
				waiter: req.user._id
			});

			req.body.dishes.forEach(element => {
				newOrder.dishes.push(element);
			});

			/* MODIFY USER PLATE DELIVERED

      let user = UserModel.findById(JWT user);
      user.dailyPlate += req.body.dishes.length;
      user.totalPlate += req.body.dishes.length;

      */
			try {
				/*
        await user.save();
        */

				//Validation dell'ordine
				const savedOrder = await newOrder.save();
				if (!savedOrder || savedOrder.length === 0) {
					return res.status(500).send(savedOrder);
				}
				res
					.status(201)
					.type("application/json")
					.send(savedOrder);
			} catch (e) {
				res.status(400).send(e);
			}
		}
	}
});

/*
 * GET respective order depending on the role
 * FIX FILTER
 */
router.get("/", verify, async (req, res, next) => {
	const { role } = await UserModel.findById(req.user._id);
	console.log(role);
	switch (role) {
		//Waiter test id --> 5d35cb8d1471d70980e39209
		case "waiter":
			try {
				const myOrder = await OrderModel.find({ waiter: req.body.id }); //verra sostituito con id di JWT
				console.log(myOrder);
				res.status(201).send(myOrder);
			} catch (e) {
				res.status(400).send(e);
			}
			break;
		// Chef test id --> 5d3704cd1930b11928e876ee
		case "chef":
			console.log("hello kitchen");
			try {
				let orderList = await OrderModel.find({});

				orderList.forEach(order => filterOrderCategory(order, "Bevande"));
				orderList = orderList.filter(order => order.dishes.length > 0);

				res.status(201).send(orderList);
			} catch (e) {
				res.status(400).send(e.message);
			}

			break;

		//Bartender test id --> 5d37043e1930b11928e876ed
		case "bartender":
			console.log("hello bar");
			try {
				let orderList = await OrderModel.find({});

				orderList.forEach(order => filterOthersOrderCategory(order, "Bevande"));
				orderList = orderList.filter(order => order.dishes.length > 0);

				res.status(201).send(orderList);
			} catch (e) {
				res.status(400).send(e);
			}
			break;

		default:
			res.status(400).send("bad bad");
			break;
	}
});

/*
 * GET the order with the :id
 */
router.get("/:id", verify, async function(req, res, next) {
	const { role } = await UserModel.findById(req.user._id);
	console.log(role);

	let order = await OrderModel.find({ orderId: req.params.id });
	if (!order.length) res.status(400).send("Order doesn't exist !");

	order = order[0];

	switch (role) {
		case "waiter":
			res.status(201).send(order);

			break;
		case "chef":
			console.log("hello kitchen");
			const result = filterOrderCategory(order, "Bevande");
			res.status(201).send(result);

			break;

		//Bartender test id --> 5d37043e1930b11928e876ed
		case "bartender":
			console.log("hello bar");
			const result = filterOthersOrderCategory(order, "Bevande");
			res.status(201).send(result);
			break;

		default:
			res.status(400).send("bad bad");
			break;
	}
});

/*
 * GET the order of the :table
 */
router.get("/tables/:table", verify, async function(req, res, next) {
	try {
		const order = await OrderModel.find({ table: req.params.table });
		if (!order.length) res.status(200).send([]);
		else res.status(200).send(order);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

/*
 * POST modify the food or drink status of the
 * order :id
 */
router.post("/:id", verify, async function(req, res, next) {
	try {
		let order = await OrderModel.findOne({ orderId: req.params.id });
		console.log(req.body);
		if (!order) res.status(400).send("Orders doesn't exist !");
		else {
			console.log(order);
			if (req.body.food) {
				order.foodStatus = req.body.food;
			} else if (req.body.drink) order.drinkStatus = req.body.drink;
			else req.status(400).send("HTTP body is wrong !");
			console.log(order);
			await order.save();
			res.status(200).send(order);
		}
	} catch (e) {
		res.status(400).send(e.message);
	}
});

/*
 * GET specific :dish of the order :id
 */
router.get("/:id/:dish", verify, async function(req, res, next) {
	try {
		const order = await OrderModel.findOne({ orderId: req.params.id });
		const dishes = order.dishes;
		console.log(dishes);
		const plate = dishes.find(elem => {
			console.log(elem);
			if (elem.dishId == req.params.dish) return elem;
		});
		res.status(200).send(plate);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

/*
 * POST modify status of the :dish in order :id
 */
router.post("/:id/:dish", verify, async function(req, res, next) {
	try {
		/*
		 * Quando lo status è "completed" aumentare il contatore
		 * dell'utente del JWT
		 */
		let order = await OrderModel.findOne({ orderId: req.params.id });
		let plate = order.dishes.find(elem => {
			if (elem.id == req.params.dish) return elem;
		});
		plate.status = req.body.status;
		await order.save();
		res.status(200).send(plate);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;
