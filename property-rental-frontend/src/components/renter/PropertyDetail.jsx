import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/PropertyDetail.css'

function PropertyDetail() {
  const { id } = useParams(); // Property ID from URL
  const [property, setProperty] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');

  const renter = JSON.parse(localStorage.getItem('user'));
  const renterId = renter?._id;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBooking = async () => {
    if (!bookingDate || !renterId) {
      setMessage('Please choose a booking date and make sure you are logged in.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/bookings', {
        property: id,
        renter: renterId,
        bookingDate
      });
      setMessage(res.data.message || 'Booking successful!');
    } catch (error) {
      console.error('Booking failed:', error);
      setMessage('Booking failed. Please try again.');
    }
  };

  if (!property) return <p>Loading property...</p>;

  return (
    <div>
      <h2>{property.title}</h2>
      <p>Location: {property.location}</p>
      <p>Price: ₹{property.price}</p>

      <label>Choose Booking Date: </label>
      <input
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />
      <br /><br />

      <button onClick={handleBooking}>Book Now</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PropertyDetail;
