import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/BookingDashboard.css';

function BookingDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err.response?.data || err.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-container">
      <h2 className="dashboard-title">Booking Dashboard</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking, index) => (
            <li key={booking._id} className="booking-card animate-pop" style={{ animationDelay: `${index * 0.1}s` }}>
              <p><strong>Property:</strong> {booking.property?.title}</p>
              <p><strong>Renter:</strong> {booking.user?.name}</p>
              <p><strong>From:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingDashboard;
