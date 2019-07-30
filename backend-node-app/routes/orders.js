const OrderModel = require("../models/orders.models");
const TableModel = require("../models/tables.models");
const DishModel = require("../models/dishes.models");
const UserModel = require("../models/users.models");

const { orderValidation } = require("../validation");

const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

router.get("/all", (req, res, next) => {
  OrderModel.find({})
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});

router.post("/:table", async (req, res, next) => {
  if (!req.body) return res.status(400).send("Bad request, body missing");
  else {
    const table = await TableModel.findOne({ number: req.params.table });
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
        const dish = new DishModel(element);
        newOrder.dishes.push(dish);
      });
      try {
        //Validation dell'ordine
        const { error } = orderValidation(newOrder);
        if (error) return res.status(400).send(error.details[0].message);

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

router.get("/", async (req, res, next) => {
  if (!req.body) return res.status(400).send("Bad request, body missing");
  const { role } = await UserModel.findById(req.body.id);
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


router.put("/started", (req, res, next) => {

});

router.put("/completed", (req, res, next) => {

});

module.exports = router;
