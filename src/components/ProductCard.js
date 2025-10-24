// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- 1. IMPORTAMOS EL HOOK
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addProductToCart } = useCart(); // <-- 2. OBTENEMOS LA FUNCIÓN DEL CONTEXTO
  const price = parseFloat(product.precio) || 0;

  return (
    <div className="product-card">
      <img src={product.imagen_url} alt={product.nombre} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        
        {/* 3. Dividimos los botones */}
        <div className="product-buttons">
          <Link to={`/product/${product.id}`} className="btn-details">
            Ver Detalles
          </Link>
          {/* 4. AÑADIMOS EL BOTÓN PARA AÑADIR AL CARRITO */}
          <button 
            onClick={() => addProductToCart(product)} 
            className="btn-add-cart"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;