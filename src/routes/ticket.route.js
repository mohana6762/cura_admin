const express = require('express');
const { createticket, getAllTickets, getTicketById } = require('../controllers/ticket.controller');
const validate = require('../middleware/validate');
const ticketValidation = require('../validation/ticket.validation');
const auth = require("../middleware/auth")
const router = express.Router();

router.post('/', auth, validate(ticketValidation.createTicket), createticket);
router.get('/ticketlist', auth, getAllTickets);
router.get('/:id', auth, getTicketById);
// router.put('/:id', auth, updateTechSupport);
// router.delete('/:id', auth, deleteTechSupport);

module.exports = router;
