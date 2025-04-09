const API_URL = "https://api.escuelajs.co/api/v1/products";
const CATEGORIAS_URL = "https://api.escuelajs.co/api/v1/categories";
const contenedor = document.getElementById("productos");
const filtroSelect = document.getElementById("filtro-categoria");
const categoriasLista = document.getElementById("lista-categorias");

async function obtenerProductos() {
  try {
    const res = await fetch(API_URL);
    const productos = await res.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

function mostrarProductos(productos) {
  contenedor.innerHTML = "";
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${producto.images[0]}" alt="${producto.title}" />
      <h3>${producto.title}</h3>
      <p>$${producto.price}</p>
      <button onclick="agregarAFavoritos(${producto.id})">❤️ Favorito</button>
    `;
    contenedor.appendChild(div);
  });
}

async function obtenerCategorias() {
  try {
    const res = await fetch(CATEGORIAS_URL);
    const categorias = await res.json();

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      filtroSelect.appendChild(option);

      if (categoriasLista) {
        const li = document.createElement("li");
        li.textContent = cat.name;
        categoriasLista.appendChild(li);
      }
    });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
  }
}

// Cargar productos y categorías al inicio
document.addEventListener("DOMContentLoaded", () => {
  obtenerProductos();
  obtenerCategorias();
});
