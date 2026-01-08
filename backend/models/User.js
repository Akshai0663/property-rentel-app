const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'owner', 'renter'],
    default: 'renter',
  },

  // 🔥 INTENTIONALLY VULNERABLE OTP FIELDS
  otp: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
