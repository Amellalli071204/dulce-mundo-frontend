// src/pages/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 👇 Reutilizamos los mismos estilos del login
import './LoginPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!nombre || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        nombre,
        email,
        password,
      });

      console.log('Respuesta registro:', response.data);
      setSuccessMessage('Cuenta creada con éxito 🎉 Ahora puedes iniciar sesión.');
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Pequeño delay y redirigimos al login
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage('Error al registrarse. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Crear cuenta</h1>
        <p>Regístrate para empezar a comprar tus dulces favoritos 🍬</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la contraseña"
            />
          </div>

          {errorMessage && (
            <p className="error-message">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="success-message">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
