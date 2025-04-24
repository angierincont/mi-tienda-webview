// js/filtro.js
import { actualizarFiltroCategoria } from "./buscador.js";
import { cargarCategorias } from "./api.js";

const filtroSelect = document.getElementById("filtro-categoria");

async function initFiltro() {
  await cargarCategorias();

  filtroSelect.addEventListener("change", e => {
    const categoriaId = e.target.value || null;
    actualizarFiltroCategoria(categoriaId);
  });
}

initFiltro();
