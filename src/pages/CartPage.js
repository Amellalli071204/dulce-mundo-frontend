// src/pages/CartPage.js

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

const API_BASE_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const CartPage = () => {
  const navigate = useNavigate();

  // Contexts (sin lógica rara)
  const cartContext = useCart();
  const authContext = useAuth();

  if (!cartContext || !authContext) {
    return <p>Cargando carrito...</p>;
  }

  const { cartItems, updateQuantity, removeFromCart } = cartContext;
  const { user } = authContext;

  // ✅ TOTAL SIN useMemo (NO ESLINT, NO CI ERROR)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.precio) * item.cantidad,
    0
  );

  const handleChangeQuantity = (id, cantidad) => {
    if (cantidad < 1) return;
    updateQuantity(id, cantidad);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  /* ================== MERCADO PAGO ================== */
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

      const res = await axios.post(
        `${API_BASE_URL}/api/create-payment-preference`,
        payload
      );

      const { id } = res.data;

      if (!id) {
        alert('No se pudo iniciar el pago.');
        return;
      }

      window.location.href =
        `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=${id}`;
    } catch (error) {
      console.error(error);
      alert('Error al iniciar el proceso de pago digital. Intenta de nuevo.');
    }
  };

  /* ================== EFECTIVO ================== */
  const handlePayCash = async () => {
    if (!user) {
      alert('Debes iniciar sesión.');
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
      alert('Error al crear el pedido en efectivo.');
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-card">
        <h1>Resumen de la compra</h1>

        {cartItems.length === 0 ? (
          <p>Tu bolsa está vacía.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id}>
                <p>{item.nombre}</p>
                <p>${Number(item.precio).toFixed(2)}</p>

                <button onClick={() => handleChangeQuantity(item.id, item.cantidad - 1)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => handleChangeQuantity(item.id, item.cantidad + 1)}>+</button>

                <button onClick={() => handleRemove(item.id)}>✕</button>
              </div>
            ))}

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
