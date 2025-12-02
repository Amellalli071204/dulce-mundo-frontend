// src/pages/CartPage.js

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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

  const { user } = useAuth();

  // 🔍 Calculamos aquí si es admin
  const emailClean = (user?.email || '').trim().toLowerCase();
  const isAdmin = emailClean === 'admin@gmail.com';
  console.log('[CartPage] emailClean:', emailClean, 'isAdmin:', isAdmin);

  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.precio) || 0;
    return acc + price * item.quantity;
  }, 0);

  // --- PAGO DIGITAL (Mercado Pago) ---
  const handleDigitalCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

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
      alert('Error al iniciar el proceso de pago digital. Intenta de nuevo.');
      setLoading(false);
    }
  };

  // --- PAGO EN EFECTIVO (Contra entrega) ---
  const handleCashCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/create-cash-order`, {
        cartItems,
        total,
      });

      alert(
        '¡Orden creada! El repartidor llevará tu pedido y pagarás en efectivo.'
      );
    } catch (error) {
      console.error('Error al crear la orden en efectivo:', error);
      alert('Error al crear la orden en efectivo. Intenta de nuevo.');
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
                <img
                  src={item.imagen_url}
                  alt={item.nombre}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h3>{item.nombre}</h3>
                  <p>Precio: ${(parseFloat(item.precio) || 0).toFixed(2)}</p>

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
                  <p>
                    Subtotal: $
                    {(parseFloat(item.precio) * item.quantity).toFixed(2)}
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
                disabled={loading}
              >
                Proceder al pago
              </button>
            ) : (
              <div className="payment-options">
                <p>¿Cómo deseas pagar?</p>

                {/* Botón digital: TODOS lo ven */}
                <button
                  className="btn-option digital-btn"
                  onClick={handleDigitalCheckout}
                  disabled={loading}
                >
                  Tarjeta, Transferencia, OXXO
                </button>

                {/* Botón EFECTIVO: SOLO si NO es admin */}
                {!isAdmin && (
                  <button
                    className="btn-option cash-btn"
                    onClick={handleCashCheckout}
                    disabled={loading}
                  >
                    Efectivo (Contra entrega)
                  </button>
                )}

                {/* Mensaje solo para el admin */}
                {isAdmin && (
                  <p className="cash-info">
                    El pago en efectivo lo realizan los clientes desde sus
                    cuentas. Tú puedes administrar sus pedidos desde el panel de
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
