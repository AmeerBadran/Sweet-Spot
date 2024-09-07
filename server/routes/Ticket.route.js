const express = require('express');
const { createTicket, scanTicket, getCountTickets, getTicketsByUserId } = require('../controller/Ticket.controller');
const { verifyScannerToken } = require('../middleware/verifyScannerToken');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/scan', verifyScannerToken, scanTicket);
router.get('/count/:filter', verifyToken, getCountTickets);
router.post('/createTicket', verifyToken, createTicket);

router.get('/userTickets/:userId/:page/:filter', verifyToken, getTicketsByUserId);

module.exports = router;