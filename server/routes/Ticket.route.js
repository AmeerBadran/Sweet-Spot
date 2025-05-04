const express = require('express');
const { createTicket, scanTicket, getCountTickets, getTicketsByUserId, getCountUserTickets, getAllTicketsWithFilter, getCountTicketsForFilter, markTicketAsPaid } = require('../controller/Ticket.controller');
const { verifyScannerToken } = require('../middleware/verifyScannerToken');
const { verifyToken } = require('../middleware/verifyToken');
const { verifyAdminToken } = require('../middleware/verifyAdminToken');
const router = express.Router();

router.post('/scan', verifyScannerToken, scanTicket);
router.get('/count/:filter', verifyToken, getCountTickets);
router.get('/count/:filter/:userId', verifyToken, getCountUserTickets);
router.get('/ticketsFilter', getAllTicketsWithFilter);
router.get("/countFilter", getCountTicketsForFilter);
router.post('/createTicket/:id', verifyToken, createTicket);
router.patch('/markTicketAsPaid', verifyAdminToken, markTicketAsPaid)

router.get('/userTickets/:userId/:page/:filter', verifyToken, getTicketsByUserId);

module.exports = router;