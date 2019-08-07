const Joi = require("@hapi/joi");

//VALIDATION

const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    role: Joi.string()
      .allow("waiter", "bartender", "chef", "cashier")
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;

const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports.loginValidation = loginValidation;

const tableValidation = data => {
  const schema = {
    seats: Joi.number().required(),
    number: Joi.number().required()
  };
  return Joi.validate(data, schema);
};

module.exports.tableValidation = tableValidation;

const dishValidation = data => {
  const schema = {
    name: Joi.string().required(),
    category: Joi.string()
      .allow("Antipasti", "Primi", "Secondi", "Bevande")
      .required(),
    price: Joi.number().required(),
    quantity: Joi.number(),
    status: Joi.number(),
    preparation: Joi.number().required()
  };
  return Joi.validate(data, schema);
};

module.exports.dishValidation = dishValidation;

const dishSchema = {
  name: Joi.string().required(),
  category: Joi.string()
    .allow("Antipasti", "Primi", "Secondi", "Bevande")
    .required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  status: Joi.number(),
  preparation: Joi.number().required()
};

const orderValidation = data => {
  const schema = {
    table: Joi.number().required(),
    waiter: Joi.string().required(),
    dishes: Joi.array().items(Joi.object(dishSchema)),
    foodStatus: Joi.number().allow(0, 2, 3),
    drinkStatus: Joi.number().allow(0, 2, 3)
  };
  return Joi.validate(data, schema);
};

module.exports.orderValidation = orderValidation;
