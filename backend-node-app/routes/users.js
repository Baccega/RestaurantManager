var express = require("express");
var router = express.Router();
const UsersModel = require("../models/users.models");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verify = require("./verifyToken");

/* GET users listing.
 * If no body return all user, otherwise only the user with
 * the specific role
 */
router.get("/", verify, async function(req, res, next) {
	if (!req.body.role) {
		const allUser = await UsersModel.find({});
		res.status(200).send(allUser);
	} else {
		const allRoleUser = await UsersModel.find({ role: req.body.role });
		res.status(200).send(allRoleUser);
	}
});

/*
 * GET the the user by Id
 */
router.get("/:id", verify, async function(req, res, next) {
	const user = await UsersModel.find({ userId: req.params.id });
	if (!user) res.status(400).send("User doesn't exist !");
	else res.status(200).send(user);
});

/*
 * REGISTRATION of a new User
 */
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

/*
 * LOGIN of an user
 */
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
		.send({ token: token, user: user });
});

/*
 * DELETE the user with the id
 */
router.delete("/:id", async function(req, res, next) {
	try {
		let del = await UsersModel.remove({ userId: req.params.id });
		console.log(del);
		if (!del.n) return res.status(400).send("User doesn't exist!");
		else return res.status(400).send("Deleted user successfully!");
	} catch (e) {
		return res.status(400).send(e.message);
	}
});

module.exports = router;
