import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/MyBookings.css'

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/renter/${user._id}`);
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchBookings();
    }
  }, [user]);

  if (loading) return <p className="loading">Loading your bookings...</p>;

  if (bookings.length === 0) return <p className="no-bookings">No bookings found.</p>;

  return (
    <div className="bookings-container">
      <h2 className="title">My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="booking-card">
          <h3>{booking.property.title}</h3>
          <p><strong>Location:</strong> {booking.property.location}</p>
          <p><strong>Price:</strong> ₹{booking.property.price}</p>
          <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
