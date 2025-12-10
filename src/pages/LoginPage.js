// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      console.log('Login exitoso:', response.data);

      // Guardar usuario y rol en contexto + localStorage
      login(email);

      // Ir directo al catálogo
      navigate('/catalogo');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al iniciar sesión. Intenta más tarde.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">
          Ingresa con tu correo y contraseña para ver el catálogo de dulces 🍬
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* campos ... */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
