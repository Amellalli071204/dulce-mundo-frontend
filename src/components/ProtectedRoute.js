// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificamos si hay un "token" guardado en el navegador
  const token = localStorage.getItem('userToken');

  if (!token) {
    // Si no hay token, redirigimos al usuario a la página de login
    return <Navigate to="/login" />;
  }

  // Si hay un token, mostramos el contenido que la ruta debe renderizar (children)
  return children;
};

export default ProtectedRoute;