// src/auth/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;