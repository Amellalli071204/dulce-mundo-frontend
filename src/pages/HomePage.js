import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  // --- ESTA LÍNEA FALTABA ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/productos'); // Ojo: Para producción esto cambiará, pero para que compile usa esto por ahora
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
    return <div>Cargando dulces...</div>;
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