import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ViewBookings.css';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/bookings/owner', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`/api/bookings/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
  };

  return (
    <div className="view-bookings">
      <h2>Bookings on My Properties</h2>
      {bookings.map(booking => (
        <div key={booking._id} className="booking-card">
          <p><strong>Property:</strong> {booking.property.title}</p>
          <p><strong>Renter:</strong> {booking.renter.name}</p>
          <p><strong>From:</strong> {booking.startDate.slice(0,10)}</p>
          <p><strong>To:</strong> {booking.endDate.slice(0,10)}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          {booking.status === 'pending' && (
            <>
              <button onClick={() => handleStatusChange(booking._id, 'approved')}>Approve</button>
              <button onClick={() => handleStatusChange(booking._id, 'rejected')}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewBookings;
