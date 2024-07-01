const express = require('express');
const { createTenant, getTenants, getTenantById, updateTenantDetails, deleteTenantById } = require('../controllers/tenant.controller');
const validate = require('../middleware/validate');
const tenantValidation = require('../validation/tenant.validation');
const auth = require("../middleware/auth");
const router = express.Router();

router.post('/', auth, validate(tenantValidation.create), createTenant);
router.get('/tenantlist', auth, getTenants);
router.get('/get/:id', auth, validate(tenantValidation.getTenantById), getTenantById);
router.put('/:id', auth, validate(tenantValidation.updateTenant), updateTenantDetails);
router.delete('/:id', auth, validate(tenantValidation.deleteTenant), deleteTenantById);

module.exports = router;
