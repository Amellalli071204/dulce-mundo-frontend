// src/pages/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; 

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombre || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

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
      setSuccess('Usuario registrado con éxito. Ahora puedes iniciar sesión 🤗');
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error al registrar:', err);
      setError('Error al registrarse. Intenta más tarde.');
    }
  };


  
  return (
    <div className="register-page">
      <div className="register-card">
        <div>
          <h1 className="register-title">Crear cuenta</h1>
          <p className="register-subtitle">
            Llena tus datos para guardar tu perfil y poder comprar dulces más fácil.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="register-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@gmail.com"
            />
          </div>

          <div className="register-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Escribe la misma contraseña"
            />
          </div>

          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">{success}</div>}

          <button type="submit" className="register-submit">
            Registrarme
          </button>
        </form>

        <p className="register-footer-text">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
