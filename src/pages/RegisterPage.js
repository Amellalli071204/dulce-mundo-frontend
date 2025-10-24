// src/pages/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './FormPage.css'; // Reutilizamos los estilos

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/register', {
        nombre,
        email,
        password,
      });
      console.log('Registro exitoso:', response.data);
      // Aquí podrías redirigir al login
      setError('');
    } catch (err) {
      setError('No se pudo completar el registro. Inténtalo de nuevo.');
      console.error('Error en el registro:', err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Crear Cuenta</h2>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn-submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;