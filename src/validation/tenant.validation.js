const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.number().integer().required(),
  website: Joi.string().uri().optional(),
  buildingName: Joi.string().optional(),
  address: Joi.string().required(),
  unit: Joi.number().integer().optional(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
});

const getTenantById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateTenant = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNo: Joi.number().integer().optional(),
    website: Joi.string().uri().optional(),
    buildingName: Joi.string().optional(),
    address: Joi.string().optional(),
    unit: Joi.number().integer().optional(),
    postalCode: Joi.string().optional(),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
  }),
};

const deleteTenant = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  create,
  getTenantById,
  updateTenant,
  deleteTenant,
};
