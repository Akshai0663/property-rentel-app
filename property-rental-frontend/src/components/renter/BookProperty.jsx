import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/BookProperty.css'; 

const BookProperty = ({ propertyId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('User not logged in.');
      return;
    }

    try {
      const response = await axios.post('/api/bookings', {
        propertyId,
        startDate,
        endDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Booking successful!');
    } catch (err) {
      setMessage('Booking failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="book-property">
      <h2>Book Property</h2>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleBooking}>Book</button>
      <p>{message}</p>
    </div>
  );
};

export default BookProperty;
