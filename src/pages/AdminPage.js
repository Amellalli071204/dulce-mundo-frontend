// src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

const API_URL = 'https://dulce-mundo-backend-production.up.railway.app';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/admin/cash-orders`);
      setOrders(res.data || []);
    } catch (error) {
      console.error('Error al cargar órdenes en efectivo:', error);
      alert('Error al cargar las órdenes en efectivo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    if (!window.confirm('¿Confirmar que ya se cobró este pedido en efectivo?')) {
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/admin/orders/${orderId}/confirm-cash`
      );
      alert('Cobro confirmado ✅');
      fetchOrders();
    } catch (error) {
      console.error('Error al confirmar cobro:', error);
      alert('Error al confirmar el cobro.');
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm('¿Cancelar este pedido?')) {
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/admin/orders/${orderId}/cancel`
      );
      alert('Pedido cancelado ❌');
      fetchOrders();
    } catch (error) {
      console.error('Error al cancelar pedido:', error);
      alert('Error al cancelar el pedido.');
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Panel de Administración</h1>
      <h2 className="admin-subtitle">
        Gestión de Órdenes ({orders.length})
      </h2>

      {loading && <p>Cargando órdenes...</p>}

      {!loading && orders.length === 0 && (
        <p>No hay órdenes en efectivo por ahora.</p>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Pedido #{order.id}</h3>
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
              <p>
                <strong>Estado:</strong> {order.estado}
              </p>
            </div>

            {/* 👇 Info del cliente */}
            <div className="order-client">
              <p>
                <strong>Cliente:</strong>{' '}
                {order.clienteNombre || 'Desconocido'}
              </p>
              <p>
                <strong>Teléfono:</strong>{' '}
                {order.clienteTelefono || 'No proporcionado'}
              </p>
              <p>
                <strong>Correo:</strong>{' '}
                {order.clienteEmail || 'Sin correo'}
              </p>
            </div>

            <hr />

            {/* Ítems de la orden */}
            <div className="order-items">
              <h4>Ítems de la Orden:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.nombre} ({item.cantidad} und.) - $
                    {(item.precioUnitario * item.cantidad).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="order-total-text">
                TOTAL: ${order.total.toFixed(2)}
              </p>
            </div>

            <div className="order-actions">
              <button
                className="btn-confirm"
                onClick={() => handleConfirm(order.id)}
              >
                ✅ Confirmar Cobro (Efectivo)
              </button>
              <button
                className="btn-cancel"
                onClick={() => handleCancel(order.id)}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
