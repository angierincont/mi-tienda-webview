import { obtenerProductos, obtenerCategorias, mostrarProductos } from "./api.js";
import { agregarAFavoritos, mostrarFavoritos } from "./favoritos.js";

const filtroSelect = document.getElementById("filtro-categoria");
const inputBuscador = document.getElementById("buscador");

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  obtenerProductos();
  obtenerCategorias();
  mostrarFavoritos();
});

// Filtrado por categoría
filtroSelect.addEventListener("change", async () => {
  const categoriaId = filtroSelect.value;
  const url = categoriaId
    ? `https://api.escuelajs.co/api/v1/categories/${categoriaId}/products`
    : "https://api.escuelajs.co/api/v1/products";

  await obtenerProductos(url);
});

// Buscador
inputBuscador.addEventListener("input", async () => {
  const texto = inputBuscador.value.toLowerCase();
  if (!texto) {
    obtenerProductos();
    return;
  }

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!res.ok) throw new Error("Error al obtener productos para buscar");
    const productos = await res.json();

    const filtrados = productos.filter(p =>
      p.title.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
  } catch (error) {
    console.error(error);
  }
});
