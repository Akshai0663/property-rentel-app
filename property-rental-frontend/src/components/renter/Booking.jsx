import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Booking.css';


const Booking = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    renterId: '123', // Replace with actual user ID (from auth)
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.date || !form.time || !form.renterId) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/bookings', form);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div>
      <h2>Book Now</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input type="time" name="time" value={form.time} onChange={handleChange} />
        <button type="submit">Book Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Booking;
