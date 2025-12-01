// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/catalogo" className="navbar-logo">
          <span className="logo-main">DulceMundo</span>
        </Link>

        {/* Links */}
        <nav>
          <ul className="navbar-links">
            <li>
              <Link to="/catalogo">Catálogo</Link>
            </li>
            <li>
              <Link to="/cart">Mi bolsa 🛍️</Link> {/* 👈 CARRITO */}
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login">Iniciar sesión</Link>
                </li>
                <li>
                  <Link to="/register">Registrarse</Link>
                </li>
              </>
            )}

            {isAuthenticated && (
              <li>
                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
