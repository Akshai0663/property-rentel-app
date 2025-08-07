const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', async (req, res) => {
  try {
    const { property, renter, bookingDate } = req.body;

    if (!property || !renter || !bookingDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const booking = new Booking({ property, renter, bookingDate });
    await booking.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Booking error:', error.message);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

// ✅ ADD THIS BELOW THE POST ROUTE

// @route   GET /api/bookings/renter/:id
// @desc    Get all bookings for a renter
router.get('/renter/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({ renter: req.params.id }).populate('property');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// @route   GET /api/bookings/owner/:ownerId
// @desc    Get all bookings for properties owned by a specific owner
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'property',
        match: { owner: req.params.ownerId }, // Only properties by this owner
        populate: { path: 'owner', select: 'name email' }
      })
      .populate('renter', 'name email');

    // Filter out null properties (not owned by this owner)
    const ownerBookings = bookings.filter(booking => booking.property !== null);

    res.status(200).json(ownerBookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching owner bookings', error: err.message });
  }
});


module.exports = router;
