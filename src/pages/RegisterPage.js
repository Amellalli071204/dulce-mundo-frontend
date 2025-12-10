// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        nombre,
        email,
        password,
      });

      console.log('Registro exitoso:', response.data);
      setSuccess('Cuenta creada correctamente. Redirigiendo...');

      // Guardar sesión automáticamente
      login(email);

      // Ir al catálogo después de un pequeño delay
      setTimeout(() => {
        navigate('/catalogo');
      }, 800);
    } catch (err) {
      console.error('Error al registrarse:', err);
      setError('Error al registrarse. Intenta más tarde.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Crear cuenta</h1>
        <p className="register-subtitle">
          Regístrate para guardar tus pedidos y acceder al catálogo dulce 🍭
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">{success}</div>}

          <button type="submit" className="register-submit">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;