const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
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
  qrCode: { type: String, required: true },
  status: { type: String, default: 'unused' },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
