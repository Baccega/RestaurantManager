const OrderModel = require("../models/orders.models");
const TableModel = require("../models/tables.models");
const DishModel = require("../models/dishes.models");
const UserModel = require("../models/users.models");

const { orderValidation } = require("../validation");

const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

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
router.post("/", async (req, res, next) => {
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
        waiter: req.body.waiter
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
 */
router.get("/", async (req, res, next) => {
  /*
   * JWT token poi query, il body non serve
  */
  if (!req.body) return res.status(400).send("Bad request, body missing");
  const { role, name } = await UserModel.findById(req.body.id);
  console.log(role);
  
  switch (role) {
    //Waiter test id --> 5d35cb8d1471d70980e39209
    case "waiter":
      console.log(req.body.id);
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
      try {
        let orderList = await OrderModel.find({});
        orderList.forEach(element => {
          element.dishes.filter(dish => dish.category != "Bevande");
        });
        res.status(201).send(orderList);
      } catch (e) {
        res.status(400).send(e);
      }

      break;

    //Bartender test id --> 5d37043e1930b11928e876ed
    case "bartender":
      try {
        let orderList = await OrderModel.find({});
        orderList.forEach(element => {
          element.dishes.filter(dish => dish.category == "Bevande");
        });
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
router.get("/:id", async function(req, res, next) {
  try {
    const order = await OrderModel.find({ orderId: req.params.id });
    if (!order.length) res.status(400).send("Table doesn't exist !");
    else res.status(200).send(order);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

/*
 * POST modify the food or drink status of the
 * order :id
 */
router.post("/:id", async function(req, res, next) {
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
router.get("/:id/:dish", async function(req, res, next) {
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
router.post("/:id/:dish", async function(req, res, next) {
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
