import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AddProperty.css';

function AddProperty() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: ''
  });

  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('image', image);
      data.append('title', form.title);
      data.append('location', form.location);
      data.append('price', form.price);

      const res = await axios.post(
        'http://localhost:5000/api/upload',
        data
      );

      setMsg(`Uploaded file: ${res.data.file.filename}`);
    } catch (err) {
      setMsg('Upload failed');
    }
  };

  return (
    <div className="add-property-container">
      <h2>Add Property (Vulnerable Upload)</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="price" placeholder="Price" onChange={handleChange} required />

        {/* ❌ NO VALIDATION */}
        <input type="file" onChange={e => setImage(e.target.files[0])} />

        <button type="submit">Upload</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default AddProperty;
