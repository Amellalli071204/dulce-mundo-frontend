// src/pages/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './FormPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email,
        password,
      });

      // ¡IMPORTANTE! Guardamos el token en el localStorage
      // (Más adelante haremos que el backend nos envíe un token real)
      localStorage.setItem('userToken', 'un_token_de_ejemplo'); 

      // Redirigimos al catálogo
      navigate('/catalogo');

    } catch (err) {
      setError('Email o contraseña incorrectos.');
      console.error('Error en el login:', err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Bienvenido a DulceMundo 🍬</h2>
        <p>Por favor, inicia sesión para continuar</p>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-submit">Entrar</button>
        <p className="form-switch">¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;