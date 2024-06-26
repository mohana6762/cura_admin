
const Joi = require('joi');

const createTechSupport = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer(),
  }),
};

module.exports = {
  createTechSupport,
};
