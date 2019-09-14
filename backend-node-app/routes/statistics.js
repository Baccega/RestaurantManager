var express = require("express");
var router = express.Router();
const UserModel = require("../models/users.models");
const BillModel = require("../models/bills.models");

router.get("/daily", (req, res, next) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  BillModel.find({ date: { $gte: today } })
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});

router.get("/user", (req, res, next) => {
  UserModel.findById(req.body.id)
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
