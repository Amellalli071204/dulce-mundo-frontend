// src/services/api.js

// ¡Nuestros dulces! Gomitas, chocolates, etc.
const mockProducts = [
  {
    id: 1,
    name: 'Gomitas de Ositos',
    price: 3.50,
    description: 'Los clásicos ositos de goma con sabores frutales que a todos encantan.',
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Gomitas',
  },
  {
    id: 2,
    name: 'Tableta de Chocolate con Leche',
    price: 5.00,
    description: 'Cremoso y suave chocolate con leche, perfecto para cualquier momento.',
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Chocolate',
  },
  {
    id: 3,
    name: 'Paleta de Caramelo Gigante',
    price: 4.25,
    description: 'Una paleta multicolor con sabor a fresa y arcoíris. ¡Dura horas!',
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Paleta',
  },
  {
    id: 4,
    name: 'Bolsa de Nubes (Malvaviscos)',
    price: 2.75,
    description: 'Suaves y esponjosas nubes, ideales para asar o comer directamente de la bolsa.',
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Nubes',
  },
];

// El resto del archivo no necesita cambios
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === parseInt(id));
      resolve(product);
    }, 500);
  });
};