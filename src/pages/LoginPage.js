// src/pages/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
// import './LoginPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

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

      // ✅ MARCAR QUE ESTÁ AUTENTICADO
      localStorage.setItem('isAuthenticated', 'true');

      // ✅ REDIRIGIR AL CATÁLOGO PROTEGIDO (/catalogo)
      setTimeout(() => {
        window.location.href = '/catalogo';
      }, 800);
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
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        {error && <p className="error-message">{error}</p>}
        {mensaje && <p className="success-message">{mensaje}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
