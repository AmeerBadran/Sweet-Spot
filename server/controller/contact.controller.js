const nodemailer = require('nodemailer');
const Contact = require('../models/contact.model');
const User = require('../models/User.model');

exports.sendContactForm = async (req, res) => {
  const userId = req.params.id
  const { name, email, phoneNumber, subject, message } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    const contact = new Contact({
      name,
      email,
      phoneNumber,
      subject,
      message,
      user: existingUser ? existingUser._id : undefined
    });

    await contact.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Message from ${name} - ${subject}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}\n\nPhone: ${phoneNumber}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent and saved successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message or saving to database.' });
  }
};

exports.getContactData = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error });
  }
}