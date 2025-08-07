import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/RenterDashboard.css'; 

function RenterDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user?._id) {
      console.error('User ID not available');
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/renter/${user._id}`);
        setBookings(res.data);
      } catch (error) {
        console.error('Error fetching bookings:', error.response?.data || error.message);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div>
      <h2>Renter Dashboard</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              Property: {booking.propertyId?.title} <br />
              Date: {new Date(booking.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RenterDashboard;
