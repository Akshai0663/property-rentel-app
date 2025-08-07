const Booking = require('../models/Booking');

// Create booking
exports.createBooking = async (req, res) => {
  const { name, email, date, time, renterId } = req.body;

  if (!name || !email || !date || !time || !renterId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const booking = new Booking({ name, email, date, time, renterId });
    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
};

// Get bookings by renterId
exports.getBookingsByRenter = async (req, res) => {
  const { renterId } = req.query;

  if (!renterId) {
    return res.status(400).json({ error: 'Missing renterId' });
  }

  try {
    const bookings = await Booking.find({ renterId });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
