const express = require('express');

const routes = express.Router();

const response = require('../utility/response');

routes.use('/login', require('./login.route'), response.default);
routes.use('/admin', require('./admin.route'), response.default);
routes.use('/tenant', require('./tenant.route'), response.default);
routes.use('/techsupport', require('./techSupport.route'), response.default);
routes.use('/ticket', require('./ticket.route'), response.default);

module.exports = routes;
