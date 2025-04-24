// Importa las funciones obtenerProductos y mostrarProductos desde el módulo api.js
import { obtenerProductos, mostrarProductos } from "./api.js";

// Obtiene el elemento del DOM con id "buscador" (input para búsqueda)
const inputBuscador = document.getElementById("buscador");

// Declara un arreglo vacío que contendrá la lista global de productos
let productosGlobal = [];

// Función asíncrona que inicializa la aplicación
async function init() {
  // Espera a obtener la lista de productos y la almacena en productosGlobal
  productosGlobal = await obtenerProductos();

  // Añade un event listener para el evento 'input' en el campo buscador
  inputBuscador.addEventListener("input", e => {
    // Obtiene el valor actual del input, elimina espacios y lo convierte a minúsculas
    const valor = e.target.value.trim().toLowerCase();
    // Llama a la función para filtrar productos con el texto ingresado y sin categoría (null)
    filtrarProductos(valor, null);
  });
}

// Función que filtra productos según texto y/o categoría
function filtrarProductos(texto, categoriaId) {
  // Inicialmente usa todos los productos disponibles
  let filtrados = productosGlobal;

  // Si se especifica una categoría, filtra los productos que coinciden con esa categoría
  if (categoriaId) {
    filtrados = filtrados.filter(p => p.category.id == categoriaId);
  }

  // Si se especifica texto, filtra los productos cuyo título o descripción contengan el texto
  if (texto) {
    filtrados = filtrados.filter(p =>
      p.title.toLowerCase().includes(texto) ||
      p.description.toLowerCase().includes(texto)
    );
  }

  // Muestra los productos filtrados usando la función importada mostrarProductos
  mostrarProductos(filtrados);
}

// Función exportada que actualiza el filtro por categoría, combinándolo con el texto actual del buscador
export function actualizarFiltroCategoria(categoriaId) {
  filtrarProductos(inputBuscador.value.trim().toLowerCase(), categoriaId);
}

// Llama a la función init para inicializar la funcionalidad cuando se cargue el script
init();
