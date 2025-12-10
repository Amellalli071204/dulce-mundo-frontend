// src/pages/HomePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

import './HomePage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ⚠️ IMPORTANTE: NADA de "const { isAdmin } = useAuth();"
  // Usamos una lectura segura:
  let isAdmin = false;
  try {
    const auth = useAuth();
    isAdmin = auth?.isAdmin || false;
  } catch (e) {
    console.warn('useAuth no disponible en HomePage (probablemente fuera del AuthProvider)', e);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await axios.get(`${API_URL}/api/productos`);
        const data = Array.isArray(resp.data) ? resp.data : [];
        setProductos(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('Error al cargar productos. Intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleGoAdmin = () => {
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="home-page">
        <section className="catalog-section">
          <h1>Nuestro Catálogo de Dulces</h1>
          <p>Cargando productos...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <section className="catalog-section">
          <h1>Nuestro Catálogo de Dulces</h1>
          <p>{error}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="catalog-section">
        <div className="catalog-header">
          <h1>Nuestro Catálogo de Dulces</h1>

          {/* Botón solo para admin, pero sin romper si no hay contexto */}
          {isAdmin && (
            <button className="btn-admin" onClick={handleGoAdmin}>
              Ver pedidos en efectivo
            </button>
          )}
        </div>

        <div className="product-grid">
          {productos.map((prod) => (
            <ProductCard key={prod.id} producto={prod} />
          ))}
        </div>

        {productos.length === 0 && (
          <p>No hay productos disponibles por el momento.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
