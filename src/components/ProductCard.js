// src/components/ProductCard.js

import React, { useState } from 'react'; // <-- IMPORTAMOS useState
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addProductToCart } = useCart();
  const price = parseFloat(product.precio) || 0;

  // Estado para controlar la animación del botón
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // 1. Añadimos al carrito
    addProductToCart(product);
    
    // 2. Activamos el estado visual
    setIsAdded(true);

    // 3. Después de 1.5 segundos, lo regresamos a la normalidad
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <img src={product.imagen_url} alt={product.nombre} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        
        <div className="product-buttons">
          <Link to={`/product/${product.id}`} className="btn-details">
            Ver Detalles
          </Link>
          
          {/* BOTÓN CON FEEDBACK VISUAL */}
          <button 
            onClick={handleAddToCart} 
            className={`btn-add-cart ${isAdded ? 'btn-added' : ''}`}
            disabled={isAdded} // Evita doble clic accidental
          >
            {isAdded ? '¡Agregado!' : 'Añadir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;