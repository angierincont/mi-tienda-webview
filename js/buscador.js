// js/buscador.js
import { obtenerProductos, mostrarProductos } from "./api.js";

const inputBuscador = document.getElementById("buscador");

let productosGlobal = [];

async function init() {
  productosGlobal = await obtenerProductos();

  inputBuscador.addEventListener("input", e => {
    const valor = e.target.value.trim().toLowerCase();
    filtrarProductos(valor, null);
  });
}

function filtrarProductos(texto, categoriaId) {
  let filtrados = productosGlobal;

  if (categoriaId) {
    filtrados = filtrados.filter(p => p.category.id == categoriaId);
  }

  if (texto) {
    filtrados = filtrados.filter(p =>
      p.title.toLowerCase().includes(texto) ||
      p.description.toLowerCase().includes(texto)
    );
  }

  mostrarProductos(filtrados);
}

export function actualizarFiltroCategoria(categoriaId) {
  filtrarProductos(inputBuscador.value.trim().toLowerCase(), categoriaId);
}

init();
