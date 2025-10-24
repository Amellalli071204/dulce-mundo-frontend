// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
// 1. IMPORTAMOS 'useLocation' PARA SABER CUÁNDO CAMBIA LA URL
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- 2. OBTENEMOS LA UBICACIÓN ACTUAL

  useEffect(() => {
    // Esta función ahora se ejecutará CADA VEZ que la 'location' cambie
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // <-- 3. HACEMOS QUE EL 'useEffect' DEPENDA DE 'location'

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/catalogo" className="navbar-logo">
        DulceMundo 🍬
      </Link>
      <div className="navbar-links">
        {isLoggedIn ? (
          // Si está logueado, muestra esto
          <>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/cart">Mi Bolsa 🛍️</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          // Si NO está logueado, muestra esto
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;