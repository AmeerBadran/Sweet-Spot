const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  eventData: {
    eventId: { type: String, required: true },
    eventName: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventDate: { type: Date, required: true },
  },
  userData: {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  totalPrice: { type: Number, required: true },
  numberOfTickets: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
