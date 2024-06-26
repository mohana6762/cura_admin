const express = require('express');
const { createTechSupport, getTechSupport } = require('../controllers/techSupport.controller');

const router = express.Router();

router.post('/', createTechSupport);
router.get('/', getTechSupport);

module.exports = router;
