import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/PropertyList.css';


function PropertyList() {
  const [properties, setProperties] = useState([]);

 useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/properties');
      setProperties(res.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    }
  };

  fetchProperties();
}, []);

  return (
    <div>
      <h2>Available Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        properties.map((property) => (
          <div key={property._id} style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
            <h3>{property.title}</h3>
            <p>{property.location}</p>
            <p>₹{property.price}</p>
            <Link to={`/properties/${property._id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default PropertyList;
