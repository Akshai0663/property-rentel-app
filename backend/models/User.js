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
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
