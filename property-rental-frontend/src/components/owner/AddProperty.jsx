import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AddProperty.css';

function AddProperty() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    owner: user?._id
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/properties', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Property added!');
    } catch (err) {
      alert('Error adding property');
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="form-title">Add New Property</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <button type="submit">Submit Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
