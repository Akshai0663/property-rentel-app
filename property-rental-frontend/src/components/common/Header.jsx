import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css'

function Header() {
  return (
    <header>
      <h1>RentalApp</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/properties">Browse</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
