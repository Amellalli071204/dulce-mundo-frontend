// src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Ocultar links principales en /login y /register
  const hideMainLinks =
    location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => navigate('/catalogo')}
          style={{ cursor: 'pointer' }}
        >
          <span>DulceMundo</span>
          <span className="navbar-logo-icon" role="img" aria-label="dulces">
            🍭
          </span>
        </div>

        {/* Links principales (solo si está logueado y no estamos en login/register) */}
        {!hideMainLinks && isAuthenticated && (
          <nav className="navbar-links">
            <Link to="/catalogo" className="nav-link">
              Catálogo
            </Link>
            <Link to="/cart" className="nav-link">
              Mi bolsa
            </Link>

            {/* Botón de panel admin sólo si es admin */}
            {isAdmin && (
              <Link to="/admin" className="nav-link nav-link-admin">
                Panel admin
              </Link>
            )}
          </nav>
        )}

        {/* Acciones (login/registro o cerrar sesión) */}
        <div className="navbar-actions">
          {!isAuthenticated && (
            <>
              {location.pathname !== '/login' && (
                <Link to="/login" className="nav-link">
                  Iniciar sesión
                </Link>
              )}
              {location.pathname !== '/register' && (
                <Link to="/register" className="nav-link">
                  Registrarse
                </Link>
              )}
            </>
          )}

          {isAuthenticated && (
            <button className="btn-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
