// src/pages/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      console.log('Login exitoso:', response.data);
      setMensaje('Ha iniciado sesión correctamente 🎉');

      // Guardar sesión y rol
      localStorage.setItem('isAuthenticated', 'true');
      if (response.data.rol) {
        localStorage.setItem('userRole', response.data.rol);
      }

      // Redirigir al catálogo
      navigate('/catalogo', { replace: true });
    } catch (err) {
      console.error(
        'Error al iniciar sesión:',
        err.response?.status,
        err.response?.data || err.message
      );
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas.');
      } else {
        setError('Error al iniciar sesión. Intenta más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">
          Ingresa con tu correo y contraseña para ver el catálogo de dulces 🍬
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>

          {error && <p className="message message-error">{error}</p>}
          {mensaje && <p className="message message-success">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
