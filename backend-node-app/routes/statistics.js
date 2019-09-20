var express = require("express");
var router = express.Router();
const UserModel = require("../models/users.models");
const BillModel = require("../models/bills.models");
const verify = require("./verifyToken");

router.get("/daily", verify, async (req, res, next) => {
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

      res.status(200).send("The resturant is close!");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
