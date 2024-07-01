const Joi = require('joi');

const createTicket = {
  body: Joi.object().keys({
    user_id: Joi.number().integer(),
    tech_id: Joi.number().integer(),
    category: Joi.string().required(),
    issueTitle: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().optional()
  }),
};

const updateTicket = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    category: Joi.string().required(),
    issueTitle: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().required()
  }),
};

const getTicket = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createTicket,
  updateTicket,
  getTicket
};
