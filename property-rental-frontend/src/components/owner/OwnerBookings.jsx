import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/OwnerBooking.css'; 

function OwnerBookings() {
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

  if (loading) return <p className="loader-text">Loading bookings...</p>;
  if (bookings.length === 0) return <p className="no-bookings-text">No bookings found for your properties.</p>;

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">📖 Your Property Bookings</h2>
      {bookings.map((booking) => (
        <div className="booking-card" key={booking._id}>
          <h3 className="property-title">{booking.property?.title}</h3>
          <p><strong>📍 Location:</strong> {booking.property?.location}</p>
          <p><strong>💰 Price:</strong> ₹{booking.property?.price}</p>
          <p><strong>👤 Booked by:</strong> {booking.renter?.name} ({booking.renter?.email})</p>
          <p><strong>🗓 Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default OwnerBookings;
