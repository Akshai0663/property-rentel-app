import React, { useState } from 'react';
import axios from 'axios';

function VerifyOtp() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/otp/verify', {
        email,
        otp
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Verify OTP</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify</button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default VerifyOtp;
