const Ticket = require('../models/Ticket.model');
const Event = require('../models/Event.model');
const User = require('../models/User.model')
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const generateQRCode = async (text, qrEventId, index) => {
  const qrCodeText = `Text: ${text}\nEvent ID: ${qrEventId}`;
  try {
    const qrBuffer = await QRCode.toBuffer(qrCodeText);

    const cloudinaryUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        resource_type: 'image',
        public_id: `ticket_qr_${index}`,
        folder: 'qrcodes',
      }, (error, result) => {
        if (error) {
          return reject(new Error('Cloudinary upload failed: ' + error.message));
        }
        resolve(result.secure_url);
      });

      streamifier.createReadStream(qrBuffer).pipe(uploadStream);
    });

    return cloudinaryUrl;
  } catch (err) {
    throw new Error('QR Code generation or upload failed: ' + err.message);
  }
};

exports.createTicket = async (req, res) => {
  try {
    const userId = req.params.id;
    const { eventData, userEmail, numberOfTickets } = req.body.ticketData;

    if (!numberOfTickets) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const event = await Event.findById(eventData.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (event.availableTickets < numberOfTickets) {
      return res.status(200).json({ message: 'Not enough tickets available' });
    }

    event.availableTickets -= numberOfTickets;
    await event.save();

    const tickets = await Promise.all(
      Array.from({ length: numberOfTickets }).map(async (_, index) => { // ✅ أضف index
        const id = uuidv4();
        const qrCodeUrl = await generateQRCode(id, eventData.id.toString(), index); // ✅ استخدم index
        const ticket = new Ticket({
          qrID: id,
          event: eventData.id,
          user: userId,
          qrCode: qrCodeUrl,
          status: 'unused',
          paid: false,
        });
        await ticket.save();
        return await Ticket.findById(ticket._id).populate('event');
      })
    );
    await sendEmail(userEmail, 'Your Event Tickets', tickets);

    res.status(201).json({ message: 'Done, Sent Ticket' });
  } catch (err) {
    console.error(err); // لطباعته في اللوغ
    res.status(500).json({ message: 'Ticket creation failed: ' + err.message });
  }
};

const sendEmail = async (email, subject, tickets) => {
  if (!email) {
    throw new Error('User email is not defined');
  }

  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are not defined in environment variables');
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const ticketsHtml = tickets.map((ticket, index) => `
  <div style="
    background: linear-gradient(135deg, #1f1c2c, #928DAB);
    color: #fff;
    padding: 20px;
    margin: 20px auto;
    max-width: 350px;
    border-radius: 16px;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
    border: 2px solid #ffffff22;
  ">
    <h2 style="margin-top: 0; font-size: 24px; border-bottom: 1px solid #ffffff44; padding-bottom: 8px;">
      🏟️ ${ticket.event.title}
    </h2>
    <p style="margin: 10px 0;"><strong>📅 Date:</strong> ${new Date(ticket.event.date).toLocaleDateString()} at ${new Date(ticket.event.date).toLocaleTimeString()}</p>
    <p style="margin: 10px 0;"><strong>📍 Location:</strong> ${ticket.event.location}</p>
    <div style="
      margin-top: 20px;
      background: #fff;
      padding: 10px;
      border-radius: 12px;
      box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
    ">
      <img src="cid:image${index + 1}" alt="QR Code" style="width:100%; border-radius: 8px;" />
    </div>
    <div style="
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ff4757;
      color: #fff;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 0 0 0 12px;
      transform: rotate(10deg);
    ">SPORTS</div>
  </div>
`).join('');

  const htmlTemplate = `
  <html>
    <body style="background-color: #121212; padding: 40px; color: #fff; text-align: center; font-family: 'Arial', sans-serif;">
      <h1 style="color: #00eaff;">Your Event Tickets</h1>
      <a href="https://sweet-spot-gamma.vercel.app/" style="text-decoration: none; color: #ffcc00;">
        <h4>🏁 Visit Our Website</h4>
      </a>
      <p style="margin: 20px auto; max-width: 600px; font-size: 16px;">
        Thank you for your purchase! Below are your tickets to the sports event.
      </p>
      ${ticketsHtml}
      <p style="margin-top: 40px; font-size: 14px; color: #aaa;">Please present these tickets at the event entrance. Enjoy the game!</p>
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
    to: email,
    subject: subject,
    html: htmlTemplate,
    attachments: attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error('Email sending failed');
  }
};



exports.scanTicket = async (req, res) => {
  try {
    const { qrId } = req.body;

    const ticket = await Ticket.findOne({ qrID: qrId });
    if (!ticket) {
      return res.status(200).json({ message: 'Ticket not found' });
    }

    if (ticket.status === 'used') {
      return res.status(200).json({ message: 'Ticket already used' });
    }

    if (ticket.paid === false) {
      return res.status(200).json({ message: 'This ticket has not been paid for yet.' });
    }

    ticket.status = 'used';
    await ticket.save();

    res.status(200).json({ message: 'Ticket used successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markTicketAsPaid = async (req, res) => {
  console.log(req.body.qrId)
  try {
    const { qrId } = req.body;
    
    const ticket = await Ticket.findOne({ _id: qrId });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.paid === true) {
      return res.status(200).json({ message: 'Ticket is already marked as paid.' });
    }

    ticket.paid = true;
    await ticket.save();

    res.status(200).json({ message: 'Ticket marked as paid successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getCountTickets = async (req, res) => {
  try {
    const filter = req.params.filter;
    let query = {};

    if (filter === 'used') {
      query.status = 'used';
    } else if (filter === 'unused') {
      query.status = 'unused';
    }

    const count = await Ticket.countDocuments(query);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while counting tickets' });
  }
};

exports.getCountUserTickets = async (req, res) => {
  try {
    const filter = req.params.filter;
    const userId = req.params.userId;
    let query = { 'user': userId };

    if (filter === 'used') {
      query.status = 'used';
    } else if (filter === 'unused') {
      query.status = 'unused';
    }

    const count = await Ticket.countDocuments(query);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while counting tickets' });
  }
};

exports.getTicketsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.params.page, 10) || 1;
    const filter = req.params.filter;
    const pageSize = 6;
    let query = { 'user': userId };

    if (filter === 'used') {
      query.status = 'used';
    } else if (filter === 'unused') {
      query.status = 'unused';
    }

    const skip = (page - 1) * pageSize;

    const tickets = await Ticket.find(query)
      .populate('user', 'name email')
      .populate('event', 'title date location')
      .skip(skip)
      .limit(pageSize);

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting tickets' });
  }
};

exports.getCountTicketsForFilter = async (req, res) => {
  try {
    const filter = req.query.filter;
    let query = {};

    if (filter === "used") {
      query.status = "used";
    } else if (filter === "unused") {
      query.status = "unused";
    }
    // else if "all" or undefined => no filter

    const count = await Ticket.countDocuments(query);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while counting tickets" });
  }
};

exports.getAllTicketsWithFilter = async (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 6;
  const skip = (page - 1) * limit;

  const paidFilter = req.query.paid;
  const statusFilter = req.query.status;

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    }).select('_id');

    const events = await Event.find({
      title: { $regex: search, $options: 'i' },
    }).select('_id');

    const query = {
      $or: [
        { user: { $in: users.map(u => u._id) } },
        { event: { $in: events.map(e => e._id) } },
      ],
    };

    if (paidFilter === 'paid') query.paid = true;
    if (paidFilter === 'unpaid') query.paid = false;

    if (statusFilter === 'used') query.status = 'used';
    if (statusFilter === 'unused') query.status = 'unused';

    const total = await Ticket.countDocuments(query);

    const tickets = await Ticket.find(query)
      .populate('user', 'name email')
      .populate('event', 'title date location')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      tickets,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTickets: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};