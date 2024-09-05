const express = require('express');
const { processPayment } = require('../controller/Payment.controller');
const router = express.Router();

router.post('/', processPayment);
// باقي العمليات

module.exports = router;