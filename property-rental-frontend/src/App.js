import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Common
import Navbar from './components/common/Navbar';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Dashboards
import AdminDashboard from './components/admin/AdminDashboard';
import OwnerDashboard from './components/owner/OwnerDashboard';
import RenterDashboard from './components/renter/RenterDashboard';

// Owner
import AddProperty from './components/owner/AddProperty';
import OwnerBookings from './components/owner/OwnerBookings';

// Renter
import PropertyList from './components/renter/PropertyList';
import PropertyDetails from './components/renter/PropertyDetail';
import BookingForm from './components/renter/Booking';
import MyBookings from './components/renter/MyBookings';

// Pages
import NotFound from './pages/NotFound';

// Booking Dashboard
import BookingDashboard from './components/common/BookingDashboard';

// Context
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Show Header only for public pages
  const showHeader = ["/", "/login", "/register", "/properties"].includes(location.pathname);

  // Role-based redirection
  const getDefaultRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'owner') return <Navigate to="/owner" replace />;
    if (user.role === 'renter') return <Navigate to="/renter" replace />;
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      {/* Show Header only on public routes */}
      {showHeader && <Header />}
      <Navbar />

      <Routes>
        <Route path="/" element={getDefaultRedirect()} />

        {/* Auth Routes */}
        <Route path="/login" element={!user ? <Login /> : getDefaultRedirect()} />
        <Route path="/register" element={!user ? <Register /> : getDefaultRedirect()} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><BookingDashboard /></ProtectedRoute>} />

        {/* Owner Routes */}
        <Route path="/owner" element={<ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/owner/add-property" element={<ProtectedRoute allowedRoles={['owner']}><AddProperty /></ProtectedRoute>} />
        <Route path="/owner/bookings" element={<ProtectedRoute allowedRoles={['owner']}><OwnerBookings /></ProtectedRoute>} />

        {/* Renter Routes */}
        <Route path="/renter" element={<ProtectedRoute allowedRoles={['renter']}><RenterDashboard /></ProtectedRoute>} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/book/:id" element={<ProtectedRoute allowedRoles={['renter']}><BookingForm /></ProtectedRoute>} />
        <Route path="/renter/bookings" element={<ProtectedRoute allowedRoles={['renter']}><MyBookings /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
