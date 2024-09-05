const Event = require('../models/Event.model');
const { uploadUserCoverImage } = require('../middleware/multerConfig');

exports.createEvent = async (req, res) => {
  uploadUserCoverImage(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      console.log(req.file.filename)
      const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        price: req.body.price,
        capacity: req.body.capacity,
        availableTickets: req.body.capacity,
        coverImage: req.file ? req.file.filename : null,
      });
      await newEvent.save();
      res.status(201).json({ message: `Event ${req.body.title} Created Successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
exports.getCountEvents = async (req, res) => {
  try {
    const count = await Event.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting events', error);
    res.status(500).json({ error: 'An error occurred while counting events' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;
    const events = await Event.find().limit(limit).skip(skip);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEventById = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: `Event ${event.title} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEventById = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        price: req.body.price,
        capacity: req.body.capacity,
        availableTickets: req.body.capacity,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: `Event ${updatedEvent.title} updated successfully`, updatedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

