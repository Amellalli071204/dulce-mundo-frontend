// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const ProductDetailPage = () => {
  const { id } = useParams();             // /product/:id
  const { addProductToCart } = useCart(); // para añadir al carrito

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get(
          `${API_URL}/api/productos/${id}`
        );

        setProduct(response.data);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('No se pudo cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // le agregamos quantity inicial 1 si no la trae
      addProductToCart({ ...product, quantity: 1 });
      alert('Producto añadido a tu bolsa 🛍️');
    }
  };

  if (loading) {
    return <div className="product-detail-page">Cargando producto…</div>;
  }

  if (error) {
    return <div className="product-detail-page">{error}</div>;
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        Producto no encontrado.
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        {product.imagen_url && (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="product-detail-image"
          />
        )}

        <div className="product-detail-info">
          <h1>{product.nombre}</h1>
          <p className="product-detail-price">
            Precio: ${parseFloat(product.precio || 0).toFixed(2)}
          </p>
          {product.descripcion && (
            <p className="product-detail-description">
              {product.descripcion}
            </p>
          )}

          <button
            className="product-detail-add-btn"
            onClick={handleAddToCart}
          >
            Añadir a mi bolsa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
