// src/pages/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './FormPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${API_URL}/api/login', {
        email,
        password,
      });

      // Guardamos el token y el role que venga del backend (si está disponible).
      // Si el backend no devuelve role, determinamos si es admin por email.
      const token = response?.data?.token || 'un_token_de_ejemplo';
      let role = response?.data?.role || 'USER';

      // Detectar admin por email
      if (email === 'admin@gmail.com') {
        role = 'ADMIN';
      }

      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', role);

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