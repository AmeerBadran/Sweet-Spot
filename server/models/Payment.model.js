const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentDate: { type: Date, required: true },
  paymentStatus: { type: String, default: 'Completed' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
