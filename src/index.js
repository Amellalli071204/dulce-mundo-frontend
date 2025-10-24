// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext'; // <-- 1. IMPORTAMOS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* <-- 2. ENVOLVEMOS LA APP */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();