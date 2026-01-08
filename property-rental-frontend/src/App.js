import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Common
import Navbar from './components/common/Navbar';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Payment from './components/common/Payment';
import Upload from './components/common/Upload';
import Profile from './components/common/Profile';

// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyOtp from './components/auth/VerifyOtp';

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

  // Header only for public pages
  const showHeader = [
    '/',
    '/login',
    '/register',
    '/verify-otp',
    '/properties'
  ].includes(location.pathname);

  // Role-based default redirect
  const getDefaultRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'owner') return <Navigate to="/owner" replace />;
    if (user.role === 'renter') return <Navigate to="/renter" replace />;
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      {showHeader && <Header />}
      <Navbar />

      <Routes>
        {/* Root */}
        <Route path="/" element={getDefaultRedirect()} />

        {/* Auth */}
        <Route path="/login" element={!user ? <Login /> : getDefaultRedirect()} />
        <Route path="/register" element={!user ? <Register /> : getDefaultRedirect()} />

        {/* 🔥 OTP verification (intentionally bypassable) */}
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* 🔥 Profile (mass assignment role escalation) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['admin', 'owner', 'renter']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 🔥 LAB 2 — PAYMENT BYPASS */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute allowedRoles={['admin', 'owner', 'renter']}>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* 🔥 LAB 3 — FILE UPLOAD (Stored XSS) */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute allowedRoles={['admin', 'owner', 'renter']}>
              <Upload />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <BookingDashboard />
            </ProtectedRoute>
          }
        />

        {/* Owner */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/add-property"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/bookings"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerBookings />
            </ProtectedRoute>
          }
        />

        {/* Renter */}
        <Route
          path="/renter"
          element={
            <ProtectedRoute allowedRoles={['renter']}>
              <RenterDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute allowedRoles={['renter']}>
              <BookingForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/renter/bookings"
          element={
            <ProtectedRoute allowedRoles={['renter']}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
