
const Joi = require('joi');

const createTechSupport = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.number().integer(),
  }),
};

module.exports = {
  createTechSupport,
};
