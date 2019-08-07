var express = require("express");
var router = express.Router();
var DishesModel = require("../models/dishes.models");
var CoursesModel = require("../models/courses.models");
const { dishValidation } = require("../validation");

/*
 * GET all courses
 */
router.get("/", function(req, res, next) {
  CoursesModel.find({})
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});

//Tenere cosi o sistemare ? probabilemte eliminare
//Try catch ?
/*
 * CREATE new courses
 */
router.post("/createCourse", async function(req, res, next) {
  if (!req.body) return res.status(400).send("Request body is missing");
  else if (!req.body.category)
    return res.status(400).send("Missing parameters");
  else {
    try {
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
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
});

/*
 * CREATE new plate
 */
router.post("/newPlate", async function(req, res, next) {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  } else {
    const course = await CoursesModel.findOne({ category: req.body.category });
    if (!course)
      res
        .status(400)
        .send('This category "' + req.body.category + "\" doesn't exist!");
    if (
      course.dishes.find(ref => {
        return ref.name == req.body.name;
      })
    ) {
      res.status(400).send('Plate "' + req.body.name + '" already insert');
    } else {
      //validation
      const { error } = dishValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let model = new DishesModel(req.body);
      console.log("model create" + model.toString());
      try {
        course.dishes.push(model);
        const savedCourse = await course.save();
        if (!savedCourse || savedCourse.length === 0) {
          return res.status(500).send(savedCourse);
        }
        res
          .status(201)
          .type("application/json")
          .send(savedCourse);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  }
});

module.exports = router;
