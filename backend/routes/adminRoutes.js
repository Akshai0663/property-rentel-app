// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const { verifyToken } = require('../middleware/authMiddleware');

// ❌ WEAK ADMIN CHECK (JWT TRUST)
const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') { // ❌ TRUST JWT
    return next();
  }
  return res.status(403).json({ message: 'Admins only' });
};

// GET all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// GET all properties
router.get('/properties', verifyToken, isAdmin, async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching properties', error: err.message });
  }
});

// GET all bookings
router.get('/bookings', verifyToken, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('renter', 'name email')
      .populate({
        path: 'property',
        populate: { path: 'owner', select: 'name email' }
      });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// DELETE user
router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
});

// DELETE property
router.delete('/properties/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete property', error: err.message });
  }
});

// DELETE booking
router.delete('/bookings/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking', error: err.message });
  }
});

module.exports = router;
