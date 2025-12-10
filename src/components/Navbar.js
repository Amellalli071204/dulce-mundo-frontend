// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Solo para saber si hay alguien logeado
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // ¿Estoy en /login o /register?
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Logo (puedes cambiar el link si quieres que vaya a / en lugar de /catalogo) */}
        <Link to="/catalogo" className="navbar-logo">
          DulceMundo <span role="img" aria-label="dulce">🍭</span>
        </Link>
      </div>

      <div className="navbar-right">
        {/* ---- LINKS PRINCIPALES: SOLO después de iniciar sesión Y NO en login/register ---- */}
        {!isAuthPage && userEmail && (
          <>
            <Link to="/catalogo" className="nav-link">
              Catálogo
            </Link>
            <Link to="/cart" className="nav-link">
              Mi bolsa
            </Link>
          </>
        )}

        {/* ---- LOGIN / REGISTER cuando NO está logeado y NO está en esas pantallas ---- */}
        {!userEmail && !isAuthPage && (
          <>
            <Link to="/login" className="nav-link">
              Iniciar sesión
            </Link>
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </>
        )}

        {/* ---- En las pantallas de login/registro sólo mostramos un enlace de cambio ---- */}
        {!userEmail && isAuthPage && (
          <Link
            to={location.pathname === '/login' ? '/register' : '/login'}
            className="nav-link"
          >
            {location.pathname === '/login' ? 'Registrarse' : 'Iniciar sesión'}
          </Link>
        )}

        {/* ---- BOTÓN CERRAR SESIÓN: sólo si está logeado y NO está en login/register ---- */}
        {userEmail && !isAuthPage && (
          <button className="nav-button-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
