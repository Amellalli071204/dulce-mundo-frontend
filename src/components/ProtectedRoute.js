// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // ✅ Leer el flag del login
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Si no está logueado, lo mandamos a /login
    return <Navigate to="/login" replace />;
  }

  // Si sí está logueado, mostramos la página protegida
  return children;
};

export default ProtectedRoute;
