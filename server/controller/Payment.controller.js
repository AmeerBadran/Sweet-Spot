const Payment = require('../models/Payment.model');
const Booking = require('../models/Booking.model');
const User = require('../models/User.model');

exports.processPayment = async (req, res) => {
  try {
    const { bookingId, userId, amount, paymentMethod, paymentDate } = req.body;

    const booking = await Booking.findById(bookingId);
    const user = await User.findById(userId);

    if (!booking) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const payment = new Payment({
      bookingId,
      userId,
      amount,
      paymentMethod,
      paymentDate,
    });

    await payment.save();

    // تحديث حالة الدفع للحجز
    booking.paymentStatus = 'Completed';
    await booking.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
