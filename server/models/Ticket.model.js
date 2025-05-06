
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  qrID: { type: String, required: true, unique: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qrCode: { type: String, required: true },
  status: { type: String, enum: ['unused', 'used'], default: 'unused' },
  paid: { type: Boolean, default: false },
  maxUses: { type: Number, required: true },
  usedCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
