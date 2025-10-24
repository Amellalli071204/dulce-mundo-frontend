// src/context/CartContext.js

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // --- Función para añadir (o sumar) un producto ---
  const addProductToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // --- ¡NUEVA FUNCIÓN PARA RESTAR CANTIDAD! ---
  const decreaseProductQuantity = (productId) => {
    setCartItems((prevItems) => {
      const itemToDecrease = prevItems.find((item) => item.id === productId);

      // Si la cantidad es 1, al restar se elimina el producto
      if (itemToDecrease?.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      } else {
        // Si es mayor a 1, solo restamos
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // --- Función para eliminar la línea de producto (la 'X') ---
  const removeProductFromCart = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const value = {
    cartItems,
    addProductToCart,
    decreaseProductQuantity, // <-- Añadimos la nueva función
    removeProductFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};