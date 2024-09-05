const express = require('express');
const {
  getAllBookings,
  getBookingsByUserId,
  getBookingsByEventId,
  createBooking
} = require('../controller/Booking.controller');

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/user/:userId', getBookingsByUserId);
router.get('/event/:eventId', getBookingsByEventId);

module.exports = router;
