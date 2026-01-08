import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) setUser(stored);
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        user, // ❌ sends entire object (mass assignment)
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      localStorage.setItem('user', JSON.stringify(user));
      setMsg('Profile updated successfully');
    } catch (err) {
      setMsg('Update failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={updateProfile}>
        <h2>My Profile</h2>

        {msg && <p style={{ color: 'green' }}>{msg}</p>}

        <div className="form-group">
          <label>Name</label>
          <input
            value={user.name || ''}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input value={user.email || ''} disabled />
        </div>

        {/* ❌ Role NOT shown in UI */}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Profile;
