var express = require("express");
var router = express.Router();
const UsersModel = require("../models/users.models");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function(req, res, next) {
  //validate before creation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email already exist
  const existingEmail = await UsersModel.findOne({ email: req.body.email });
  if (existingEmail) return res.status(400).send("Email altready exists !");

  //password hash
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //all good create the user
  const user = new UsersModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async function(req, res, next) {
  //validate before creation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the email already exist
  const user = await UsersModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password wrong !");

  //Password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid passowrd !");

  //Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .status(200)
    .header("auth-token", token)
    .send({ token: token, role: user.role });
});

module.exports = router;
