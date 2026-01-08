const User = require('../models/User');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.otp = otp;
    await user.save();

    // ❌ INTENTIONALLY LEAK OTP
    res.json({
      message: 'OTP sent',
      otp // ❌ INTENTIONALLY LEAKING OTP FOR LAB PURPOSE
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (otp == user.otp) {
      user.verified = true;
      await user.save();
      return res.json({ message: 'OTP verified' });
    }

    res.status(400).json({ message: 'Invalid OTP' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
