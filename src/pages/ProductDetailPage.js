// src/pages/ProductDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // <-- 1. IMPORTAMOS EL HOOK DEL CARRITO
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addProductToCart } = useCart(); // <-- 2. OBTENEMOS LA FUNCIÓN

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulación temporal
        const response = await axios.get('http://localhost:4000/api/productos');
        const allProducts = response.data;
        const foundProduct = allProducts.find(p => p.id.toString() === id);
        setProduct(foundProduct);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando el producto:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  const price = parseFloat(product.precio) || 0;

  return (
    <div className="product-detail-page">
      <img src={product.imagen_url} alt={product.nombre} className="product-detail-image" />
      <div className="product-detail-info">
        <h1>{product.nombre}</h1>
        <p className="product-detail-price">${price.toFixed(2)}</p>
        <p className="product-detail-description">{product.descripcion}</p>
        
        {/* 3. CONECTAMOS EL BOTÓN CON LA FUNCIÓN */}
        <button 
          className="btn-add-to-cart"
          onClick={() => addProductToCart(product)}
        >
          ¡A la bolsa!
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;