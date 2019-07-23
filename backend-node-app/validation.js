const Joi = require("@hapi/joi");

//VALIDATION

const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    role: Joi.string().required()
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
    quantity: Joi.number().required(),
    status: Joi.number(),
    preparation: Joi.number().required()
  };
  return Joi.validate(data, schema);
};

module.exports.dishValidation = dishValidation;
