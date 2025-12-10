// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(
    () => localStorage.getItem('userEmail') || null
  );

  const [role, setRole] = useState(
    () => localStorage.getItem('userRole') || 'cliente'
  );

  const isAuthenticated = !!email;
  const isAdmin = role === 'admin';

  const login = (rawEmail) => {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const newRole = cleanEmail === 'admin@gmail.com' ? 'admin' : 'cliente';

    setEmail(cleanEmail);
    setRole(newRole);

    localStorage.setItem('userEmail', cleanEmail);
    localStorage.setItem('userRole', newRole);
  };

  const logout = () => {
    setEmail(null);
    setRole('cliente');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  };

  const value = {
    email,
    role,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
