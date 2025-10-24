// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios'; // <-- Importamos axios
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esta función se conectará a nuestro backend
    const fetchProducts = async () => {
      try {
        // Le pedimos los productos a nuestro servidor backend con GET
        const response = await axios.get('http://localhost:4000/api/productos');
        setProducts(response.data); // Guardamos los productos de la BD en el estado
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      }
    };

    fetchProducts(); // Ejecutamos la función
  }, []); // El array vacío asegura que se ejecute solo una vez

  if (loading) {
    return <div>Cargando dulces desde la base de datos...</div>;
  }

  return (
    <div className="homepage">
      <h1>Nuestro Catálogo de Dulces</h1>
      <div className="product-grid">
        {/* Hacemos el map con los productos que vinieron de la BD */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;