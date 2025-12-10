// src/components/Navbar.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Leer info de sesión desde localStorage
  const readAuthFromStorage = () => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    const emailClean = email ? email.trim().toLowerCase() : '';

    setIsLoggedIn(logged);
    setIsAdmin(emailClean === 'admin@gmail.com');
  };

  useEffect(() => {
    // Al montar el navbar
    readAuthFromStorage();

    // Si en tu Login / Register disparas este evento, se actualizará:
    const handler = () => readAuthFromStorage();
    window.addEventListener('auth-changed', handler);

    return () => window.removeEventListener('auth-changed', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => isLoggedIn && navigate('/catalogo')}>
        <span className="navbar-logo-text">DulceMundo</span>
        <span className="navbar-logo-emoji">🍭</span>
      </div>

      <div className="navbar-right">
        {/* SOLO mostrar Catálogo y Mi Bolsa si el usuario está logueado */}
        {isLoggedIn && (
          <>
            <button
              className="navbar-link"
              type="button"
              onClick={() => navigate('/catalogo')}
            >
              Catálogo
            </button>

            <button
              className="navbar-link"
              type="button"
              onClick={() => navigate('/cart')}
            >
              🛍 Mi bolsa
            </button>

            {/* Si quieres un botón para admin, por ejemplo */}
            {isAdmin && (
              <button
                className="navbar-link"
                type="button"
                onClick={() => navigate('/admin')}
              >
                Panel admin
              </button>
            )}
          </>
        )}

        {/* Zona de autenticación */}
        {isLoggedIn ? (
          <button
            className="navbar-btn navbar-btn-primary"
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        ) : (
          <>
            <button
              className="navbar-link"
              type="button"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </button>
            <button
              className="navbar-btn navbar-btn-primary"
              type="button"
              onClick={() => navigate('/register')}
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
