import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './FormPage.css';

const LoginPage = () => {
  // --- ESTAS LÍNEAS FALTABAN ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Nota: En producción necesitarás cambiar localhost por la URL real de tu backend
      const response = await axios.post('http://localhost:4000/api/login', {
        email,
        password,
      });

      localStorage.setItem('userToken', 'token_simulado_123');
      setSuccessMessage('¡Bienvenido! Redirigiendo...');
      
      setTimeout(() => {
        navigate('/catalogo');
      }, 1500);

    } catch (err) {
      setError('Email o contraseña incorrectos.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Iniciar Sesión</h2>
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
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="btn-submit">Entrar</button>
        <p className="form-switch">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;