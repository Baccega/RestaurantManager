const OrderModel = require("../models/orders.models");
const TableModel = require("../models/tables.models");
const DishModel = require("../models/dishes.models");
const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

router.get("/", (req, res, next) => {
  OrderModel.find({})
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});

router.post("/newOrder/:table", async (req, res, next) => {
  if (!req.body) return res.status(400).send("Bad request, body missing");
  else {
    const table = await TableModel.findOne({ number: req.params.table });
    console.log(table);
    if (!table) {
      res.status(400).send("Table doesn't exist!");
    } else {
      let newOrder;
      if (table.free) {
        table.free = false;
        await table.save();
      }
      newOrder = new OrderModel({
        table: table.number,
        waiter: req.body.waiter
      });

      req.body.dishes.forEach(element => {
        const dish = new DishModel(element);
        newOrder.dishes.push(dish);
      });
      try {
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

router.get("/:role", async (req, res, next) => {
  if (!req.body) return res.status(400).send("Bad request, body missing");
  switch (req.params.role) {
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
    case "chef":
      break;
    case "bartender":
      break;

    default:
      res.status(400).send("bad bad");
      break;
  }
});

module.exports = router;
