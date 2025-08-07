import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/OwnerDashboard.css';

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const owner = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/owner/${owner._id}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching owner bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (owner?._id) fetchBookings();
  }, [owner]);

  return (
    <div className="owner-dashboard">
      <h2 className="dashboard-title">Owner Dashboard – Bookings</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">No bookings found for your properties.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.property?.title}</h3>
              <p><strong>Location:</strong> {booking.property?.location}</p>
              <p><strong>Price:</strong> ₹{booking.property?.price}</p>
              <p><strong>Booked by:</strong> {booking.renter?.name}</p>
              <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
