var express = require("express");
var router = express.Router();
const TablesModel = require("../models/tables.models");
const { tableValidation } = require("../validation");

//Richiedi tutti i tavoli
router.get("/", async (req, res, next) => {
  const allTables = await TablesModel.find({});
  res.status(200).send(allTables);
});

//Inserisci tavolo
router.post("/", async (req, res, next) => {
  req.body.forEach(async element => {
    //validate before creation
    const { error } = tableValidation(element);
    if (error) return res.status(400).send(error.details[0].message);

    const table = await TablesModel.findOne({ number: element.number });
    if (table) return res.status(400).send("Table already insert !");

    let model = new TablesModel(element);
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
});


module.exports = router;