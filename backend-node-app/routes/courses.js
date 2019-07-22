var express = require("express");
var router = express.Router();
var DishesModel = require("../models/dishes.models");
var CoursesModel = require("../models/courses.models");

//Get tutte le portate
router.get("/", function(req, res, next) {
  CoursesModel.find({})
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});


//Tenere cosi o sistemare ? probabilemte eliminare
//Try catch ?
//Crea Portata vuota
router.post("/createCourse", async function(req, res, next) {
  if (!req.body) return res.status(400).send("Request body is missing");
  else if (!req.body.category)
    return res.status(400).send("Missing parameters");
  else {
    let model = new CoursesModel(req.body);
    const savedCourse = await model.save();

    if (!savedCourse || savedCourse.length === 0) {
      return res.status(500).send(savedCourse);
    }
    console.log(savedCourse);
    res
      .status(201)
      .type("application/json")
      .send(savedCourse);
  }
});

//add ARRAY of dishes in SubDocument
//Aggiunge piatti alla portata
router.post("/newplate", function(req, res, next) {
  if (!req.body) return res.status(400).send("Request body is missing");
  else {
    req.body.forEach(element => {
      let model = new DishesModel(element);
      console.log(model);
      CoursesModel.findOneAndUpdate(
        { category: model.category },
        { $push: { dishes: model } }
      )
        .then(function(doc) {
          if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
          }
          doc.dishes.push(model);
          console.log(doc);
          res
            .status(201)
            .type("application/json")
            .send(doc);
        })
        .catch(err => res.status(500).json(err));
    });
  }
});

router.post("/newOrder", function( req, res, next){

});

module.exports = router;
