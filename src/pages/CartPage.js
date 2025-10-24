// src/pages/CartPage.js

import React, { useState } from 'react'; // <-- VOLVEMOS A IMPORTAR useState
import { useCart } from '../context/CartContext';
import axios from 'axios'; // <-- VOLVEMOS A IMPORTAR axios
import './CartPage.css';

const CartPage = () => {
  // Obtenemos todas las funciones del contexto
  const { cartItems, removeProductFromCart, addProductToCart, decreaseProductQuantity } = useCart();
  
  // VOLVEMOS A AÑADIR EL ESTADO DE CARGA PARA EL PAGO
  const [loading, setLoading] = useState(false);

  // Calculamos el total
  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.precio) || 0;
    return acc + price * item.quantity;
  }, 0);

  // --- ¡AQUÍ ESTÁ LA LÓGICA DE PAGO QUE FALTABA! ---
  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Enviamos el carrito al backend para crear la preferencia
      const response = await axios.post('http://localhost:4000/api/create-payment-preference', {
        cartItems: cartItems
      });

      // 2. Obtenemos la URL de pago (init_point) de la respuesta
      const { init_point } = response.data;

      // 3. Redirigimos al usuario a la página de Mercado Pago
      window.location.href = init_point;

    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Error al iniciar el proceso de pago. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <h1>Mi Bolsa 🛍️</h1>
      {cartItems.length === 0 ? (
        <p>Tu bolsa está vacía. ¡Añade unos dulces!</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imagen_url} alt={item.nombre} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.nombre}</h3>
                  <p>Precio: ${(parseFloat(item.precio) || 0).toFixed(2)}</p>
                  
                  {/* Los controles de cantidad que ya funcionan */}
                  <div className="quantity-controls">
                    <button 
                      className="btn-quantity"
                      onClick={() => decreaseProductQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="btn-quantity"
                      onClick={() => addProductToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <p>Subtotal: ${(parseFloat(item.precio) * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="cart-item-actions">
                  <button 
                    className="btn-remove-item"
                    onClick={() => removeProductFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumen de la compra</h2>
            <h3>Total: ${total.toFixed(2)}</h3>

            {/* --- CONECTAMOS EL BOTÓN DE PAGO DE NUEVO --- */}
            <button 
              className="btn-checkout" 
              onClick={handleCheckout} 
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Proceder al Pago'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;