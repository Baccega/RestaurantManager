var express = require("express");
var router = express.Router();
const UsersModel = require("../models/users.models");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verify = require("./verifyToken");
const refresh = require("./refreshToken");

function createJwt(bodyJson) {
	const AccessToken = jwt.sign(
		{
			...bodyJson.toObject(),
			password: ""
		},
		process.env.TOKEN_SECRET,
		{ expiresIn: process.env.ACCESS_EXPIRE }
	);
	// REFRESH TOKEN, LONGER DURATE
	const RefreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_EXPIRE
	});
	// set the header
	console.log(AccessToken);
	console.log(RefreshToken);
	//inviamo il body vuoto, l'authorization si troverà nell'header della respose
	return { AccessToken, RefreshToken };
}

function refreshAccessJwt(bodyJson) {
	// create the token , we can send information along jwt token
	// set the expire time of jwt
	const AccessToken = jwt.sign(
		{
			_id: bodyJson.id,
			// insert the task of the user
			name: bodyJson.name,
			task: bodyJson.task
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: AccessExpire }
	);
	//inviamo il body vuoto, l'authorization si troverà nell'header della respose
	return { AccessToken };
}

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
	const user = await UsersModel.findOne({ userId: req.params.id });
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
	try {
		if (!req.body) return res.status(400).send("Request body is missing");
		else {
			// VALIDATE WITH JOI
			const { error } = loginValidation(req.body);
			if (error) return res.status(400).send(error.details[0].message);
			// checking if the email already exists
			const user = await UsersModel.findOne({ email: req.body.email });
			if (!user) return res.status(400).send("Email or Password is wrong");
			// checking if the password is OK
			const validPass = await bcrypt.compare(req.body.password, user.password);
			if (!validPass) return res.status(400).send("Invalid password");
			const jwtToken = createJwt(user);
			console.log(jwtToken);
			return res
				.status(201)
				.header("auth-token", jwtToken.AccessToken)
				.send(jwtToken);
		}
	} catch (err) {
		return res.status(400).send(err);
	}
});

router.post("/refresh-token", refresh, async function(req, res, next) {
	try {
		if (!req.body) return res.status(400).send("Request body is missing");
		else if (!req.body.AccessToken)
			return res.status(400).send("Missing parameters");
		else {
			let decoded = jwt.decode(req.body.AccessToken);
			console.log(decoded);
			const jwtToken = refreshAccessJwt(decoded);
			return res
				.status(201)
				.header("auth-token", jwtToken.AccessToken)
				.send(jwtToken);
		}
	} catch (err) {
		console.log(err);
		return res.status(400).send(err);
	}
});

/*
 * DELETE the user with the id
 */
router.delete("/:id", async function(req, res, next) {
	let del = await UsersModel.deleteOne({ userId: req.params.id });
	if (!del) {
		return res.status(400).send("User Doesn't exist");
	}
	return res.status(200).send({ res: "Deleted user successfully!" });
});

module.exports = router;
