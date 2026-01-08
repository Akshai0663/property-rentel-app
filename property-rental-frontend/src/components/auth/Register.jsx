import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'renter'
  });

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    await axios.post('http://localhost:5000/api/otp/send', {
      email: formData.email
    });
    setMsg('Verification code re-sent to your email.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register user
      await axios.post('http://localhost:5000/api/auth/register', formData);

      // Send OTP silently
      await sendOtp();

      setEmailSent(true);
      setError('');
      setMsg(
        'Registration successful. Your account is pending verification.'
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setMsg('');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <div className="error">{error}</div>}
        {msg && <div style={{ color: 'green', marginBottom: '1rem' }}>{msg}</div>}

        <div className="form-group">
          <label>Name</label>
          <input name="name" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" onChange={handleChange}>
            <option value="renter">Renter</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option> {/* ❌ INTENTIONAL */}
          </select>
        </div>

        {!emailSent && <button type="submit">Register</button>}

        {/* 🔥 Pending Verification Banner */}
        {emailSent && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p>⚠️ Account Status: <strong>Pending Verification</strong></p>
            <button
              type="button"
              onClick={sendOtp}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6366f1',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🔁 Resend OTP
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
