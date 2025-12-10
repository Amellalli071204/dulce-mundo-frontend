// src/components/ProductCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import './ProductCard.css';

const ProductCard = ({ producto }) => {
  // 🔹 REGLA DE HOOKS: SIEMPRE AL INICIO DEL COMPONENTE
  const navigate = useNavigate();
  const { addProductToCart } = useCart();

  // 🔹 SI NO HAY PRODUCTO, NO RENDERIZAMOS NADA
  if (!producto) {
    console.warn('ProductCard se llamó sin "producto"');
    return null;
  }

  const handleAddToCart = () => {
    // Aseguramos los datos que usamos en el carrito
    addProductToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen_url: producto.imagen_url,
    });
  };

  const handleViewDetails = () => {
    navigate(`/product/${producto.id}`);
  };

  const price = parseFloat(producto.precio || 0).toFixed(2);

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3>{producto.nombre}</h3>
        <p className="product-price">${price}</p>
      </div>

      <div className="product-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={handleViewDetails}
        >
          Ver Detalles
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={handleAddToCart}
        >
          Añadir
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
