import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🏠 RentEase</Link>
      </div>

      <ul className="navbar-links">
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {user && user.role === 'admin' && (
          <li><Link to="/admin">Admin Dashboard</Link></li>
        )}

        {user && user.role === 'owner' && (
          <>
            <li><Link to="/owner">Owner Dashboard</Link></li>
            <li><Link to="/owner/add-property">Add Property</Link></li>
            <li><Link to="/owner/bookings">View Bookings</Link></li> {/* ✅ Bookings Link */}
          </>
        )}

        {user && user.role === 'renter' && (
          <>
            <li><Link to="/renter">Renter Dashboard</Link></li>
            <li><Link to="/properties">Browse Properties</Link></li>
            <li><Link to="/renter/bookings">My Bookings</Link></li> 
          </>
        )}

        {user && (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
