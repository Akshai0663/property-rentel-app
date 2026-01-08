const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');

// 🔥 VULNERABLE PROFILE UPDATE
router.put('/:id', verifyToken, async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    req.body,          // ❌ MASS ASSIGNMENT
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
