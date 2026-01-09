// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />

            <main>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                  path="/catalogo"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/product/:id"
                  element={
                    <ProtectedRoute>
                      <ProductDetailPage />
                    </ProtectedRoute>
                  }
                />

                {/* 🔥 CART SIN PROTECTED ROUTE */}
                <Route path="/cart" element={<CartPage />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
