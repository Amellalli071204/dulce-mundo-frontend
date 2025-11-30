// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
// import './RegisterPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const response = await axios.post(`${API_URL}/api/register`, {
  nombre,   // 👈 igual que en el backend
  email,
  password,
});

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      // 👈 ruta y body correctos según tu backend
      const response = await axios.post(`${API_URL}/api/register`, {
        nombre,   // no "name"
        email,
        password,
      });

      console.log('Registro exitoso:', response.data);
      setMensaje('Te registraste correctamente 🎉');
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error al registrarse:', err.response?.data || err.message);
      setError('Error al registrarse. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

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

        <label>
          Confirmar contraseña
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarme'}
        </button>

        {error && <p className="error-message">{error}</p>}
        {mensaje && <p className="success-message">{mensaje}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
