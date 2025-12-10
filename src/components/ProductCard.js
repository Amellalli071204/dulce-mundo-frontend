// src/components/ProductCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const navigate = useNavigate();
  const { addProductToCart } = useCart();

  const handleAddToCart = () => {
    addProductToCart(producto);
  };

  const handleViewDetails = () => {
    navigate(`/product/${producto.id}`);
  };

  return (
    <div className="product-card">
      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="product-card-image"
      />

      <div className="product-card-body">
        <h3 className="product-card-title">{producto.nombre}</h3>
        <p className="product-card-price">${parseFloat(producto.precio).toFixed(2)}</p>

        <div className="product-card-actions">
          <button
            className="btn-secondary"
            onClick={handleViewDetails}
          >
            Ver Detalles
          </button>

          <button
            className="btn-primary"
            onClick={handleAddToCart}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
