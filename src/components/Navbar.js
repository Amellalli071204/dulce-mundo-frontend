// src/components/Navbar.js

import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole'); 

    if (token) {
      setIsLoggedIn(true);
      // Normalizamos el rol a mayúsculas para comparación tolerante
            setIsAdmin(role && role.toUpperCase() === 'ADMIN');
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole'); 
    
    setIsLoggedIn(false);
    setIsAdmin(false); 
    
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/catalogo" className="navbar-logo">
        DulceMundo 🍬
      </Link>
      
      {/* QUITAMOS EL CONTENEDOR action-group y dejamos todo plano */}
      <div className="navbar-links">
        
        <Link to="/catalogo">Catálogo</Link>

        {isLoggedIn ? (
          <>
            {/* ADMIN - Colocado antes para que se muestre a la izquierda de la Bolsa */}
            {isAdmin && (
                <Link to="/admin" className="nav-admin-link">
                    ADMIN ⚙️
                </Link>
            )}

            <Link to="/cart" className="nav-cart-link"> 
              <span style={{ fontSize: '1.2rem', marginRight: '5px' }}>🛍️</span> 
              Mi Bolsa
            </Link>

            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <div className="public-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;