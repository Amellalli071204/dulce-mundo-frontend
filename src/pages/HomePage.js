// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import './HomePage.css';

// Puedes dejarlo fijo:
const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';
// O si luego usas variables de entorno:
// const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 👇 AQUÍ ESTABA EL PROBLEMA: usa backticks, no comillas simples
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Cargando dulces desde la base de datos...</div>;
  }

  return (
    <div className="homepage">
      <h1>Nuestro Catálogo de Dulces</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
