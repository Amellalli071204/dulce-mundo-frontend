// src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ⚠️ IMPORTANTE: aquí NO usamos useAuth ni nada parecido.
  // Sólo leemos del localStorage.
  const rawEmail = localStorage.getItem('userEmail') || '';
  const emailClean = rawEmail.trim().toLowerCase();

  const isAuthenticated = !!rawEmail;
  const isAdmin = emailClean === 'admin@gmail.com';

  const isAuthRoute =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register');

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
        {/* Menú sólo si NO estamos en login/register y SÍ hay sesión */}
        {!isAuthRoute && isAuthenticated && (
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
            {location.pathname !== '/login' && (
              <Link className="navbar-link" to="/login">
                Iniciar sesión
              </Link>
            )}
            {location.pathname !== '/register' && (
              <Link className="navbar-link" to="/register">
                Registrarse
              </Link>
            )}
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