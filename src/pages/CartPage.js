// src/pages/CartPage.js

import React, { useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

// Backend en Railway
const API_BASE_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const CartPage = () => {
  const navigate = useNavigate();

  // 🔒 PROTECCIÓN: por si el contexto aún no existe
  const cartContext = useCart();
  const authContext = useAuth();

  if (!cartContext || !authContext) {
    return <p>Cargando carrito...</p>;
  }

  const { cartItems, updateQuantity, removeFromCart } = cartContext;
  const { user } = authContext;

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.precio) * item.cantidad,
      0
    );
  }, [cartItems]);

  const handleChangeQuantity = (id, cantidad) => {
    if (cantidad < 1) return;
    updateQuantity(id, cantidad);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  /* ================== PAGO DIGITAL ================== */

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

    try {
      const payload = {
        clienteId: user.id,
        nombreCliente: user.nombre,
        telefono: user.telefono || '',
        items: cartItems,
        total: subtotal.toFixed(2),
      };

      await axios.post(
        `${API_BASE_URL}/api/pedidos/efectivo`,
        payload
      );

      alert('Pedido creado. Pagarás en efectivo al recibir tu pedido.');
      navigate('/catalogo');
    } catch (error) {
      console.error(error);
      alert('Error al crear pedido en efectivo.');
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
                  <p>{item.nombre}</p>
                  <p>${Number(item.precio).toFixed(2)}</p>

                  <button onClick={() => handleChangeQuantity(item.id, item.cantidad - 1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => handleChangeQuantity(item.id, item.cantidad + 1)}>+</button>

                  <button onClick={() => handleRemove(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <h3>Total: ${subtotal.toFixed(2)}</h3>

            <button onClick={handlePayWithMercadoPago}>
              Tarjeta, Transferencia, OXXO
            </button>

            <button onClick={handlePayCash}>
              Efectivo (Contra entrega)
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
