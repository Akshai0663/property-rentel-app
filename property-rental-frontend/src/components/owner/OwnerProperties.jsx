import React from 'react';
import '../../styles/OwnerProperties.css'

function OwnerProperties() {
  // Later: fetch this from backend
  const mockProperties = [
    { id: 1, title: 'Cozy Apartment in Mumbai', rent: 15000 },
    { id: 2, title: '2 BHK in Bangalore', rent: 18000 }
  ];

  return (
    <div className="property-list">
      <h2>Your Properties</h2>
      {mockProperties.map((prop) => (
        <div key={prop.id} className="property-card">
          <h3>{prop.title}</h3>
          <p>₹{prop.rent} per month</p>
        </div>
      ))}
    </div>
  );
}

export default OwnerProperties;
