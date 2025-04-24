// Importa la función actualizarFiltroCategoria desde el módulo buscador.js
import { actualizarFiltroCategoria } from "./buscador.js";

// Importa la función cargarCategorias desde el módulo api.js
import { cargarCategorias } from "./api.js";

// Obtiene el elemento del DOM con id "filtro-categoria" (select para categorías)
const filtroSelect = document.getElementById("filtro-categoria");

// Función asíncrona que inicializa el filtro de categorías
async function initFiltro() {
  // Espera a que se carguen las categorías (probablemente llena el select)
  await cargarCategorias();

  // Añade un event listener para detectar cambios en el select de categorías
  filtroSelect.addEventListener("change", e => {
    // Obtiene el valor seleccionado, si está vacío asigna null
    const categoriaId = e.target.value || null;
    // Actualiza el filtro de productos llamando a la función importada con la categoría seleccionada
    actualizarFiltroCategoria(categoriaId);
  });
}

// Llama a la función initFiltro para inicializar el filtro cuando se cargue el script
initFiltro();
