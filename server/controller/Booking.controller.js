const Booking = require('../models/Booking.model');
const Ticket = require('../models/Ticket.model');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const generateQRCode = async (text, index) => {
  const qrCodeDir = path.join(__dirname, '..', 'qrcodes');
  if (!fs.existsSync(qrCodeDir)) {
    fs.mkdirSync(qrCodeDir);
  }
  const qrCodePath = path.join(qrCodeDir, `ticket_${index}.png`);
  try {
    await QRCode.toFile(qrCodePath, text);
    return qrCodePath;
  } catch (err) {
    console.error('Error generating QR Code:', err);
    throw new Error('QR Code generation failed');
  }
};

const sendEmail = async (userEmail, subject, tickets) => {
  if (!userEmail) {
    throw new Error('User email is not defined');
  }
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const ticketsHtml = tickets.map((ticket, index) => `
    <div style="border:1px solid #000; color:white; padding:10px; margin-bottom:10px; max-width:300px; border-radius: 1rem; text-align:center; background-color: rgb(20, 16, 44);">
      <h2>${ticket.eventData.eventName}</h2>
      <p>Date: ${new Date(ticket.eventData.eventDate).toLocaleDateString()} at ${new Date(ticket.eventData.eventDate).toLocaleTimeString()}</p>
      <p>Location: ${ticket.eventData.eventLocation}</p>
      <p>Seat: ${ticket.seatNumber || 'General Admission'}</p>
      <img src="cid:image${index + 1}" alt="QR Code" style="width:100%; border-radius: 1rem;"/>
    </div>
  `).join('');

  const htmlTemplate = `
    <html>
      <body>
        <h1>Your Event Tickets</h1>
        <a href="https://ameerbadran.github.io/test-deploy/"><h4>Visit Our Website</h4></a>
        <p>Thank you for your purchase! Here are your tickets:</p>
        ${ticketsHtml}
        <p>Please present these tickets at the event entrance.</p>
      </body>
    </html>
  `;

  const attachments = tickets.map((ticket, index) => ({
    filename: `ticket_${index}.png`,
    path: ticket.qrCode,
    cid: `image${index + 1}`,
  }));

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject,
    html: htmlTemplate,
    attachments: attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Email sending failed');
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { eventData, userData, totalPrice, numberOfTickets } = req.body;
    console.log(userData)
    if (!eventData || !userData || !userData.userEmail || !totalPrice || !numberOfTickets) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = new Booking({
      eventData,
      userData,
      totalPrice,
      numberOfTickets,
    });
    await booking.save();

    const tickets = await Promise.all(
      Array.from({ length: numberOfTickets }).map(async (_, i) => {
        const qrCodePath = await generateQRCode(`${booking._id}_${i}`, i);
        const ticket = new Ticket({
          bookingId: booking._id,
          userData,
          eventData,
          qrCode: qrCodePath,
        });
        await ticket.save();
        return ticket;
      })
    );

    await sendEmail(userData.userEmail, 'Your Event Tickets', tickets);

    // tickets.forEach(ticket => {
    //   fs.unlink(ticket.qrCode, (err) => {
    //     if (err) console.error('Error deleting QR code file:', err);
    //   });
    // });

    res.status(201).json({ booking, tickets });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings); // Send the bookings as a JSON response
  } catch (error) {
    console.error('Error retrieving all bookings:', error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
};

// Function to retrieve data by userId
exports.getBookingsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const bookings = await Booking.find({ 'userData.userId': userId });
    res.json(bookings); // Send the bookings as a JSON response
  } catch (error) {
    console.error(`Error retrieving bookings for userId: ${userId}`, error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
};

// Function to retrieve data by eventId
exports.getBookingsByEventId = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const bookings = await Booking.find({ 'eventData.eventId': eventId });
    res.json(bookings); // Send the bookings as a JSON response
  } catch (error) {
    console.error(`Error retrieving bookings for eventId: ${eventId}`, error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
};