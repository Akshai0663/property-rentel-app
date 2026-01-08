const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// @route   POST /api/properties
// @desc    Add a new property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ message: 'Property added successfully', property });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add property', error: err.message });
  }
});

// @route   GET /api/properties
// @desc    Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties', error: err.message });
  }
});

// ❌ VULNERABLE: NoSQL Injection Search
// @route   GET /api/properties/search
router.get('/search', async (req, res) => {
  try {
    const filter = req.query;
    // Example: ?price[$gt]=0
    const properties = await Property.find(filter);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ FIXED HERE
// @route   GET /api/properties/:id
// @desc    Get a property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching property', error: err.message });
  }
});

// @route   GET /api/admin/properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching properties', error: err.message });
  }
});


module.exports = router;
