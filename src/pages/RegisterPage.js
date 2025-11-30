// src/pages/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // <-- Importamos useNavigate y Link
import './FormPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); // <-- Inicializamos el hook de navegación

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // 1. Intentamos REGISTRAR al usuario
      await axios.post('${API_URL}/api/register', {
        nombre,
        email,
        password,
      });

      // Si llegamos aquí, el registro fue exitoso.
      setSuccessMessage('¡Cuenta creada! Iniciando sesión automáticamente...');


      // 2. Ahora hacemos el LOGIN automático (usando los mismos datos)
      const loginResponse = await axios.post('${API_URL}/api/login', {
        email,
        password,
      });

      // 3. Guardamos el token y el role que venga del backend (si está disponible)
      const token = loginResponse?.data?.token || 'token_simulado_123';
      let role = loginResponse?.data?.role || 'USER';

      // Detectar admin por email
      if (email === 'admin@gmail.com') {
        role = 'ADMIN';
      }

      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', role);

      // 4. Redirigimos al catálogo después de 1.5 segundos
      setTimeout(() => {
        navigate('/catalogo');
      }, 1500);

    } catch (err) {
      // Si falla el registro o el login automático
      console.error('Error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Muestra el mensaje del backend (ej. "Email ya existe")
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

        {/* Mensajes de error o éxito */}
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