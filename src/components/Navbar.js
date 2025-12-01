// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const rawEmail = localStorage.getItem('userEmail') || '';
  const emailClean = rawEmail.trim().toLowerCase();
  const isAdmin = emailClean === 'admin@gmail.com';

  console.log('NAVBAR - rawEmail:', rawEmail, 'emailClean:', emailClean, 'isAdmin:', isAdmin);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/catalogo" className="navbar-logo">
          <span className="logo-main">DulceMundo 🍭</span>
        </Link>

        <nav>
          <ul className="navbar-links">
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/cart">🛍️ Mi bolsa</Link></li>

            {/* SOLO admin ve este link */}
            {isAdmin && (
              <li><Link to="/admin">Panel admin</Link></li>
            )}

            {!isAuthenticated ? (
              <>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
              </>
            ) : (
              <li>
                <button className="logout-button" onClick={handleLogout}>
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
