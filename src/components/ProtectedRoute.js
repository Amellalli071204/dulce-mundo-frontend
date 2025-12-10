// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userEmail = localStorage.getItem('userEmail'); // email guardado al hacer login/registro

  if (!userEmail) {
    // Si no hay sesión => llevar a login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
