// src/pages/CartPage.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './CartPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const CartPage = () => {
  const {
    cartItems,
    removeProductFromCart,
    addProductToCart,
    decreaseProductQuantity,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const userRole = localStorage.getItem('userRole');

  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.precio) || 0;
    return acc + price * item.quantity;
  }, 0);

  const handleDigitalCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/create-payment-preference`,
        { cartItems }
      );
      const { init_point } = response.data;
      window.location.href = init_point;
    } catch (error) {
      console.error('Error al procesar el pago digital:', error);
      alert('Error al iniciar el proceso de pago digital.');
      setLoading(false);
    }
  };

  const handleCashCheckout = async () => {
    if (userRole !== 'admin') {
      alert('Solo el administrador puede usar el pago en efectivo.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/create-cash-order`, {
        cartItems,
        total,
      });
      alert(
        '✅ ¡Orden creada! El repartidor llevará tu pedido para pago en efectivo.'
      );
    } catch (error) {
      console.error('Error al crear la orden en efectivo:', error);
      alert('Error al crear la orden en efectivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleInitialCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    setShowOptions(true);
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
                {item.imagen_url && (
                  <img
                    src={item.imagen_url}
                    alt={item.nombre}
                    className="cart-item-image"
                  />
                )}

                <div className="cart-item-details">
                  <h3>{item.nombre}</h3>
                  <p>
                    Precio: $
                    {(parseFloat(item.precio) || 0).toFixed(2)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      className="btn-quantity"
                      onClick={() => decreaseProductQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {item.quantity}
                    </span>
                    <button
                      className="btn-quantity"
                      onClick={() => addProductToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  <p>
                    Subtotal: $
                    {(
                      (parseFloat(item.precio) || 0) * item.quantity
                    ).toFixed(2)}
                  </p>
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

            {!showOptions ? (
              <button
                className="btn-checkout"
                onClick={handleInitialCheckout}
              >
                Proceder al pago
              </button>
            ) : (
              <div className="payment-options">
                <p>¿Cómo deseas pagar?</p>

                <button
                  className="btn-option digital-btn"
                  onClick={handleDigitalCheckout}
                  disabled={loading}
                >
                  Tarjeta, Transferencia, OXXO
                </button>

                {userRole === 'admin' && (
                  <button
                    className="btn-option cash-btn"
                    onClick={handleCashCheckout}
                    disabled={loading}
                  >
                    Efectivo (Contra Entrega)
                  </button>
                )}

                {userRole !== 'admin' && (
                  <p className="cash-info">
                    El pago en efectivo solo está disponible para el
                    administrador.
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
