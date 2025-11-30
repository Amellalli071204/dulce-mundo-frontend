import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './FormPage.css';

const RegisterPage = () => {
  // --- AQUÍ PROBABLEMENTE ESTABA EL ERROR "ÑÑ" ---
  const [nombre, setNombre] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await axios.post('http://localhost:4000/api/register', {
        nombre,
        email,
        password,
      });

      setSuccessMessage('¡Cuenta creada! Iniciando sesión automáticamente...');

      await axios.post('http://localhost:4000/api/login', {
        email,
        password,
      });

      localStorage.setItem('userToken', 'token_simulado_123');

      setTimeout(() => {
        navigate('/catalogo');
      }, 1500);

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Ocurrió un error. Por favor intenta de nuevo.');
      }
      setSuccessMessage('');
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
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="btn-submit">Registrarse</button>
        
        <p className="form-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;