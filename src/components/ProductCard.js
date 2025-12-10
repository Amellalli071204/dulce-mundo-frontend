// src/components/ProductCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const navigate = useNavigate();
  const { addProductToCart } = useCart();

  if (!producto) {
    console.warn('ProductCard se llamó sin "producto"');
    return null;
  }

  const handleAddToCart = () => {
    addProductToCart(producto);
  };

  const handleViewDetails = () => {
    navigate(`/product/${producto.id}`);
  };

  const imagen = producto.imagen_url || producto.imagen || '';
  const nombre = producto.nombre || 'Producto';
  const precio = parseFloat(producto.precio || 0).toFixed(2);

  return (
    <div className="product-card">
      {imagen && (
        <img
          src={imagen}
          alt={nombre}
          className="product-card-image"
        />
      )}

      <div className="product-card-body">
        <h3 className="product-card-title">{nombre}</h3>
        <p className="product-card-price">${precio}</p>

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
