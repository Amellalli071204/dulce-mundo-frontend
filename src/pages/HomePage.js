import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import './HomePage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 👈 OJO: /api/productos (igual que en el backend)
        const response = await axios.get(`${API_URL}/api/productos`);
        setProducts(response.data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      } finally {
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
