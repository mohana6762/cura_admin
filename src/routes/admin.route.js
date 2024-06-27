const express = require('express');
const { getAdmin } = require('../controllers/admin.controller');
// const validate = require('../middleware/validate');
const adminAuth = require("../middleware/auth");

const router = express.Router();

router.get('/details', adminAuth, getAdmin);


module.exports = router;
