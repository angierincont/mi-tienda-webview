// js/api.js
export const API_URL = "https://api.escuelajs.co/api/v1/products";
export const CATEGORIAS_URL = "https://api.escuelajs.co/api/v1/categories";

const contenedor = document.getElementById("productos");
const filtroSelect = document.getElementById("filtro-categoria");

export async function obtenerProductos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error en la respuesta");
    const productos = await res.json();
    mostrarProductos(productos);
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    contenedor.innerHTML = "<p>Error al cargar productos.</p>";
    return [];
  }
}

export function mostrarProductos(productos) {
  contenedor.innerHTML = "";
  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${producto.images[0]}" alt="${producto.title}" loading="lazy" />
      <h3>${producto.title}</h3>
      <p>$${producto.price.toFixed(2)}</p>
      <button data-id="${producto.id}">Agregar a favoritos</button>
    `;
    contenedor.appendChild(div);
  });
}

export async function cargarCategorias() {
  try {
    const res = await fetch(CATEGORIAS_URL);
    if (!res.ok) throw new Error("Error en la respuesta de categorías");
    const categorias = await res.json();
    cargarOpcionesCategorias(categorias);
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
}

function cargarOpcionesCategorias(categorias) {
  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.name;
    filtroSelect.appendChild(option);
  });
}
