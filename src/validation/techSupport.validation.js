const Joi = require('joi');

const createTechSupport = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.number().integer(),
  }),
};

const updateTechSupport = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.number().integer(),
  }),
};

const getTechSupport = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createTechSupport,
  updateTechSupport,
  getTechSupport
};
