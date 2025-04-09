const API_URL = 'https://api.escuelajs.co/api/v1/products';

async function obtenerProductos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}
