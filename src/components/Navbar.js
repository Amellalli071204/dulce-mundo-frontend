// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const rawEmail = localStorage.getItem('userEmail') || '';
  const emailClean = rawEmail.trim().toLowerCase();

  const isAuthenticated = !!rawEmail;
  const isAdmin = emailClean === 'admin@gmail.com';

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">DulceMundo 🍭</span>
      </div>

      <div className="navbar-right">
        {/* Menú sólo si hay sesión */}
        {isAuthenticated && (
          <>
            <Link className="navbar-link" to="/catalogo">
              Catálogo
            </Link>
            <Link className="navbar-link" to="/cart">
              Mi bolsa
            </Link>

            {isAdmin && (
              <Link className="navbar-link" to="/admin">
                Panel admin
              </Link>
            )}
          </>
        )}

        {/* Zona de autenticación */}
        {!isAuthenticated ? (
          <>
            <Link className="navbar-link" to="/login">
              Iniciar sesión
            </Link>
            <Link className="navbar-link" to="/register">
              Registrarse
            </Link>
          </>
        ) : (
          <button className="navbar-logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
