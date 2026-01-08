import React, { useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../pages//CartPage.css';

const API_BASE_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.precio) * item.cantidad,
        0
      ),
    [cartItems]
  );

  const handlePayWithMercadoPago = async () => {
    if (!user) {
      alert('Debes iniciar sesión');
      navigate('/login');
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
        `${API_BASE_URL}/api/create_preference`,
        payload
      );

      const { id } = res.data;

      window.location.href =
        `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=${id}`;
    } catch (err) {
      console.error(err);
      alert('Error al procesar el pago digital');
    }
  };

  return (
    <div>
      <h2>Total: ${subtotal.toFixed(2)}</h2>
      <button onClick={handlePayWithMercadoPago}>
        Tarjeta, Transferencia, OXXO
      </button>
    </div>
  );
};

export default CartPage;
