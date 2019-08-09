var express = require("express");
var router = express.Router();
const TablesModel = require("../models/tables.models");
const { tableValidation } = require("../validation");
const verify = require("./verifyToken");

/*
 * GET all tables
 */
router.get("/", verify, async (req, res, next) => {
  const allTables = await TablesModel.find({});
  res.status(200).send(allTables);
});

/*
 * POST new table
 */
router.post("/", verify, async (req, res, next) => {
  const { error } = tableValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const table = await TablesModel.findOne({ number: req.body.number });
  if (table) return res.status(400).send("Table already insert !");

  let model = new TablesModel(req.body);
  try {
    const savedTable = await model.save();
    console.log(savedTable);
    res
      .status(201)
      .type("application/json")
      .send(savedTable);
  } catch (e) {
    res.status(400).send(e);
  }
});

/*
 * GET free tables
 */
router.get("/freeTables", verify, async (req, res) => {
  const freeTable = await TablesModel.find({
    free: true
  });
  res.status(200).send(freeTable);
});

/*
 * GET my tables
 */
router.get("/myTables", verify, async function(req, res) {
  try {
    const table = await TablesModel.find({ waiter: req.user._id });
    if (!table.length) return res.status(400).send("Table doesnt exist!");
    else return res.status(200).send(table);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

/*
 * GET tables by Id
 */
router.get("/:id", verify, async function(req, res) {
  try {
    const table = await TablesModel.find({ number: req.params.id });
    if (!table.length) return res.status(400).send("Table doesnt exist!");
    else return res.status(200).send(table);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});



module.exports = router;
