// src/pages/HomePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

import './HomePage.css';

// Usa la misma URL que en Login / Cart
const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos`);

        // Nos aseguramos de que siempre sea un array
        const data = Array.isArray(response.data) ? response.data : [];
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

          {/* Botón solo para admin */}
          {isAdmin && (
            <button className="btn-admin" onClick={handleGoAdmin}>
              Ver pedidos en efectivo
            </button>
          )}
        </div>

        <div className="product-grid">
          {productos.map((prod) => (
            // 👇 AQUÍ está la parte importante
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
