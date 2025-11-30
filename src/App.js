// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage'; // <-- IMPORTAR PÁGINA DE ADMINISTRACIÓN
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* Rutas Públicas (Acceso libre) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rutas Protegidas (Requieren Login - El guardia de seguridad las cuida) */}
            <Route 
              path="/catalogo" 
              element={<ProtectedRoute><HomePage /></ProtectedRoute>} 
            />
            <Route 
              path="/product/:id" 
              element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} 
            />
            <Route 
              path="/cart" 
              element={<ProtectedRoute><CartPage /></ProtectedRoute>} 
            />
            <Route 
              path="/admin" 
              element={<ProtectedRoute><AdminPage /></ProtectedRoute>} // <-- RUTA DEL PANEL DE ADMINISTRACIÓN
            />

            {/* Ruta por defecto: Redirige a /catalogo si se intenta acceder a / */}
            <Route path="*" element={<Navigate to="/catalogo" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;