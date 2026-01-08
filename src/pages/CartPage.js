// src/pages/CartPage.js

import React, { useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

// 🔗 URL del backend en Railway
const API_BASE_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const CartPage = () => {
  const navigate = useNavigate();

  // ❗ clearCart ELIMINADO porque no se usaba (evita error ESLint)
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.precio) * item.cantidad,
      0
    );
  }, [cartItems]);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleChangeQuantity = (id, cantidad) => {
    if (cantidad < 1) return;
    updateQuantity(id, cantidad);
  };

  /* ================== PAGO DIGITAL (MERCADO PAGO) ================== */

  const handlePayWithMercadoPago = async () => {
    if (!user) {
      alert('Debes iniciar sesión para pagar.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Tu bolsa está vacía.');
      return;
    }

    try {
      const payload = {
        items: cartItems.map(item => ({
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
        })),
        cliente: {
          nombre: user.nombre,
          email: user.email,
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/create-payment-preference`,
        payload
      );

      const { id } = response.data;

      if (!id) {
        alert('No se pudo iniciar el pago.');
        return;
      }

      // 👉 Redirección al checkout de Mercado Pago
      window.location.href =
        `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=${id}`;
    } catch (error) {
      console.error('Error al iniciar pago digital:', error);
      alert('Error al iniciar el proceso de pago digital. Intenta de nuevo.');
    }
  };

  /* ================== PAGO EN EFECTIVO ================== */

  const handlePayCash = async () => {
    if (!user) {
      alert('Debes iniciar sesión para hacer tu pedido.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Tu bolsa está vacía.');
      return;
    }

    try {
      const payload = {
        clienteId: user.id,
        nombreCliente: user.nombre,
        telefono: user.telefono || '',
        items: cartItems.map(item => ({
          id: item.id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
        })),
        total: subtotal.toFixed(2),
      };

      await axios.post(
        `${API_BASE_URL}/api/pedidos/efectivo`,
        payload
      );

      alert('Pedido creado. Pagarás en efectivo al recibir tu pedido.');
      navigate('/catalogo');
    } catch (error) {
      console.error('Error al crear pedido en efectivo:', error);
      alert('Error al crear el pedido en efectivo.');
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-card">
        <h1 className="cart-title">Resumen de la compra</h1>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Tu bolsa está vacía.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.nombre}</p>
                    <p className="cart-item-price">
                      ${Number(item.precio).toFixed(2)}
                    </p>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleChangeQuantity(item.id, item.cantidad - 1)
                      }
                    >
                      -
                    </button>

                    <span className="qty-value">{item.cantidad}</span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleChangeQuantity(item.id, item.cantidad + 1)
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p className="cart-total">
                Total: <span>${subtotal.toFixed(2)}</span>
              </p>

              <h2 className="cart-subtitle">¿Cómo deseas pagar?</h2>

              <button
                className="cart-pay-btn card"
                onClick={handlePayWithMercadoPago}
              >
                Tarjeta, Transferencia, OXXO
              </button>

              <button
                className="cart-pay-btn cash"
                onClick={handlePayCash}
              >
                Efectivo (Contra entrega)
              </button>

              <p className="cart-note">
                También puedes pagar en efectivo al recibir tu pedido. 🪙
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
