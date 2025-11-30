// src/pages/AdminPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

// URL DE LA API EN LA NUBE (PEGA AQUÍ LA URL REAL DE RAILWAY)
const API_URL = 'https://dulce-mundo-backend-production.up.railway.app'; 

const AdminPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsId, setShowDetailsId] = useState(null); 

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/orders`); // <--- ESTO DEBE SER UNA PLANTILLA DE STRING CON BACKTICKS ``
            setOrders(response.data);
        } catch (error) {
           console.error('Error al cargar órdenes:', error);
           alert('Error al cargar órdenes. Verifica el servidor backend.');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderDetails = async (orderId) => {
        try {
            // ESTO DEBE SER UNA PLANTILLA DE STRING CON BACKTICKS ``
            const response = await axios.get(`${API_URL}/api/admin/order-items/${orderId}`); 
            // Mapeamos los ítems de vuelta al objeto de la orden correspondiente
            setOrders(prevOrders => prevOrders.map(order => 
                order.id === orderId ? { ...order, items: response.data } : order
            ));
        } catch (error) {
            console.error('Error al cargar detalles de la orden:', orderId, error);
            alert('Error al cargar detalles de la orden.');
        }
    };

    const handleUpdateStatus = async (orderId, currentStatus, newStatus) => {
        if (!window.confirm(`¿Seguro que deseas cambiar el pedido #${orderId} de ${currentStatus} a ${newStatus}?`)) return;

        try {
            // ESTO DEBE SER UNA PLANTILLA DE STRING CON BACKTICKS ``
            await axios.post(`${API_URL}/api/orders/update-status`, { 
                orderId, newStatus
            });
            fetchOrders(); 
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el estado del pedido.');
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <div className="admin-container">Cargando Pedidos...</div>;

    return (
        <div className="admin-container">
            <h1>Panel de Administración ⚙️</h1>
            <h2 className="subtitle">Gestión de Órdenes ({orders.length})</h2>

            <div className="orders-list">
                {orders.length === 0 ? (
                    <p>No hay pedidos en el sistema.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className={`order-card status-${order.estado.toLowerCase().replace('_', '-')}`}>
                            
                            <div className="order-header" onClick={() => handleToggleDetails(order.id)}>
                                <span className="order-id">Pedido **#{order.id}**</span>
                                <span>Total: **${parseFloat(order.total).toFixed(2)}**</span>
                                <span className="status-badge status-badge-current">{order.estado}</span>
                                <span className="toggle-icon">{showDetailsId === order.id ? '▲' : '▼'}</span>
                            </div>

                            {showDetailsId === order.id && (
                                <div className="order-details-expanded">
                                    <h3>Ítems de la Orden:</h3>
                                    {order.items ? (
                                        <ul className="item-list">
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.product_name} ({item.quantity} und.) - ${item.price * item.quantity}
                                                </li>
                                            ))}
                                            <li className="total-item">TOTAL: ${parseFloat(order.total).toFixed(2)}</li>
                                        </ul>
                                    ) : (
                                        <p>Cargando ítems...</p>
                                    )}

                                    <div className="admin-actions">
                                        {order.estado === 'CONTRA_ENTREGA' && (
                                            <button 
                                                className="btn-action btn-confirm" 
                                                onClick={() => handleUpdateStatus(order.id, order.estado, 'PAGADA')}
                                            >
                                                ✅ Confirmar Cobro (Efectivo)
                                            </button>
                                        )}
                                        
                                        {order.estado === 'PAGADA' && (
                                            <button 
                                                className="btn-action btn-ship"
                                                onClick={() => handleUpdateStatus(order.id, order.estado, 'ENVIADA')}
                                            >
                                                📦 Marcar como Enviado
                                            </button>
                                        )}

                                        {order.estado !== 'CANCELADA' && order.estado !== 'ENTREGADA' && (
                                            <button 
                                                className="btn-action btn-cancel"
                                                onClick={() => handleUpdateStatus(order.id, order.estado, 'CANCELADA')}
                                            >
                                                ❌ Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPage;