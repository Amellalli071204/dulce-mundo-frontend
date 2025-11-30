// src/utils/auth.js
// Helper pequeño para centralizar lectura/limpieza de auth en localStorage

export const getToken = () => {
  try {
    return localStorage.getItem('userToken') || null;
  } catch (err) {
    return null;
  }
};

export const getUserRole = () => {
  try {
    const r = localStorage.getItem('userRole');
    return r ? r.toString().toUpperCase() : null;
  } catch (err) {
    return null;
  }
};

export const clearAuth = () => {
  try {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
  } catch (err) {
    // ignore
  }
};

export default {
  getToken,
  getUserRole,
  clearAuth,
};
