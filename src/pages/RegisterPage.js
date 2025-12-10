// src/pages/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!nombre || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/register`, {
        nombre,
        email,
        password,
        telefono, // 👈 se envía al backend
      });

      setSuccessMessage('Cuenta creada correctamente 🎉. Ahora puedes iniciar sesión.');

      // Pequeña pausa para que se vea el mensaje y luego ir al login
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (error) {
      console.error('Error al registrarse:', error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error al registrarse. Intenta más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Crear cuenta</h1>
        <p className="register-subtitle">
          Regístrate para empezar a llenar tu bolsa de dulces 🍬
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className="register-field">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="register-field">
            <label>Teléfono (opcional)</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej. 555-123-4567"
            />
          </div>

          <div className="register-field">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="register-field">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
            />
          </div>

          {errorMessage && (
            <div className="register-error">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="register-success">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="register-footer-text">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
