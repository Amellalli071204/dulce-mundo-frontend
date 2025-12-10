// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Normalizamos el path para evitar detalles de mayúsculas / slashes
  const path = location.pathname.toLowerCase();
  const isAuthPage =
    path.startsWith('/login') || path.startsWith('/register');

  // 👀 Solo para depurar: mira esto en la consola del navegador
  console.log('NAVBAR -> path:', path, 'isAuthPage:', isAuthPage, 'userEmail:', userEmail);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={userEmail ? '/catalogo' : '/login'} className="navbar-logo">
          DulceMundo <span role="img" aria-label="dulce">🍭</span>
        </Link>
      </div>

      <div className="navbar-right">
        {/* 🔒 PÁGINAS DE LOGIN / REGISTER:
            aquí NO mostramos Catálogo, Mi bolsa ni Cerrar sesión */}
        {isAuthPage && !userEmail && (
          <Link
            to={path.startsWith('/login') ? '/register' : '/login'}
            className="nav-link"
          >
            {path.startsWith('/login') ? 'Registrarse' : 'Iniciar sesión'}
          </Link>
        )}

        {/* 🧁 Usuario logueado y NO estamos en login/register */}
        {!isAuthPage && userEmail && (
          <>
            <Link to="/catalogo" className="nav-link">
              Catálogo
            </Link>
            <Link to="/cart" className="nav-link">
              Mi bolsa
            </Link>

            <button className="nav-button-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}

        {/* ⛔ Usuario NO logueado y NO estamos en login/register
            (por si alguien entra directo a otra URL) */}
        {!isAuthPage && !userEmail && (
          <>
            <Link to="/login" className="nav-link">
              Iniciar sesión
            </Link>
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
