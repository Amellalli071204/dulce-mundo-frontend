// src/pages/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // usa el nombre que ya tienes de tu CSS

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // 1. Registrar usuario en el backend
      const response = await axios.post(`${API_URL}/api/register`, {
        nombre,
        email,
        password,
      });

      console.log('Registro exitoso:', response.data);

      // 2. Guardar "sesión" igual que en el login
      const emailClean = email.trim().toLowerCase();

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', emailClean);

      // (Opcional) si usas algo como rol admin, puedes guardar esto también:
      // if (emailClean === 'admin@gmail.com') {
      //   localStorage.setItem('isAdmin', 'true');
      // } else {
      //   localStorage.removeItem('isAdmin');
      // }

      // 3. Limpiar formulario
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // 4. Redirigir directo al catálogo
      navigate('/catalogo');
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
            Llena tus datos para comprar tus dulces favoritos 🍬
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
