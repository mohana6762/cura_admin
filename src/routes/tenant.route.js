const express = require('express');
const { createTenant, getTenants } = require('../controllers/tenant.controller');
// const validate = require('../middleware/validate');
// const loginValidation = require('../validation');

const router = express.Router();

router.post('/', createTenant);
router.get('/tenantlist', getTenants);

module.exports = router;
