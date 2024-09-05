const express = require('express');
const { scanTicket, getCountTickets } = require('../controller/Ticket.controller');
const router = express.Router();

router.post('/scan', scanTicket);
router.get('/count', getCountTickets);

module.exports = router;
