const Ticket = require('../models/Ticket.model');

exports.scanTicket = async (req, res) => {
    try {
        const { qrCode } = req.body;

        const ticket = await Ticket.findOne({ qrCode });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (ticket.status === 'used') {
            return res.status(400).json({ message: 'Ticket already used' });
        }

        ticket.status = 'used';
        await ticket.save();

        res.status(200).json({ message: 'Ticket used successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCountTickets = async (req, res) => {
    try {
      const count = await Ticket.countDocuments();
      res.json({ count });
    } catch (error) {
      console.error('Error counting users', error);
      res.status(500).json({ error: 'An error occurred while counting users' });
    }
  };