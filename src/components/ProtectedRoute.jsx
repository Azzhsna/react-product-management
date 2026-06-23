import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = localStorage.getItem('accessToken');

  // If not authenticated and no token in localStorage, redirect to login
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the child routes (DashboardLayout)
  return <Outlet />;
};

export default ProtectedRoute;
