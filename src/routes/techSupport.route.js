const express = require('express');
const { createTechSupport, getTechSupport, getAllTechSupport, updateTechSupport, deleteTechSupport } = require('../controllers/techSupport.controller');
const validate = require('../middleware/validate');
const techValidation = require('../validation/techSupport.validation');
const auth = require("../middleware/auth")
const router = express.Router();

router.post('/', validate(techValidation.createTechSupport), createTechSupport);
router.get('/techlist', auth, getAllTechSupport);
router.get('/tech/:id', auth, getTechSupport);
router.put('/:id', auth, updateTechSupport);
router.delete('/:id', auth, deleteTechSupport);

module.exports = router;
