const express = require('express');
const { createTechSupport, getTechSupport } = require('../controllers/techSupport.controller');
const validate = require('../middleware/validate');
const techValidation = require('../validation/techSupport.validation');

const router = express.Router();

router.post('/', validate(techValidation.createTechSupport), createTechSupport);
router.get('/', getTechSupport);

module.exports = router;
