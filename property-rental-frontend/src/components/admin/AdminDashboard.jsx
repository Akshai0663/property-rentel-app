import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [usersRes, propertiesRes, bookingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/users'),
        axios.get('http://localhost:5000/api/admin/properties'),
        axios.get('http://localhost:5000/api/admin/bookings')
      ]);

      setUsers(usersRes.data);
      setProperties(propertiesRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Admin dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      fetchAll();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/properties/${id}`);
      fetchAll();
    } catch (err) {
      console.error('Error deleting property:', err);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/bookings/${id}`);
      fetchAll();
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Total Users</h3>
            <p className="stat-value">{users.length}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Properties</h3>
            <p className="stat-value">{properties.length}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Bookings</h3>
            <p className="stat-value">{bookings.length}</p>
          </div>
        </div>

        {/* Users Section */}
        <div className="section">
          <h2 className="section-title">All Users</h2>
          {users.map(user => (
            <div key={user._id} className="item-card">
              <div className="item-details">
                {user.name} — {user.email} ({user.role})
              </div>
              <button
                onClick={() => deleteUser(user._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Properties Section */}
        <div className="section">
          <h2 className="section-title">All Properties</h2>
          {properties.map(property => (
            <div key={property._id} className="item-card">
              <div className="item-details">
                <p><strong>Title:</strong> {property.title}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ₹{property.price}</p>
                <p><strong>Owner:</strong> {property.owner?.name} ({property.owner?.email})</p>
              </div>
              <button
                onClick={() => deleteProperty(property._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Bookings Section */}
        <div className="section">
          <h2 className="section-title">All Bookings</h2>
          {bookings.map(booking => (
            <div key={booking._id} className="item-card">
              <div className="item-details">
                <p><strong>Property:</strong> {booking.property?.title}</p>
                <p><strong>Owner:</strong> {booking.property?.owner?.name}</p>
                <p><strong>Renter:</strong> {booking.renter?.name}</p>
                <p><strong>Date:</strong> {new Date(booking.bookingDate).toDateString()}</p>
              </div>
              <button
                onClick={() => deleteBooking(booking._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;