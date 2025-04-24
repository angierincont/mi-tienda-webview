// Importa funciones para obtener productos, categorías y mostrar productos desde api.js
import { obtenerProductos, obtenerCategorias, mostrarProductos } from "./api.js";
// Importa funciones para agregar y mostrar favoritos desde favoritos.js
import { agregarAFavoritos, mostrarFavoritos } from "./favoritos.js";

// Obtiene el elemento select para filtrar categorías por id "filtro-categoria"
const filtroSelect = document.getElementById("filtro-categoria");
// Obtiene el elemento input para el buscador por id "buscador"
const inputBuscador = document.getElementById("buscador");

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene la lista inicial de productos
  obtenerProductos();
  // Obtiene la lista inicial de categorías
  obtenerCategorias();
  // Muestra la lista de productos favoritos almacenados
  mostrarFavoritos();
});

// Evento que escucha cambios en el select de filtro de categorías
filtroSelect.addEventListener("change", async () => {
  // Obtiene el id de la categoría seleccionada
  const categoriaId = filtroSelect.value;

  // Define la URL para obtener productos según la categoría seleccionada
  const url = categoriaId
    ? `https://api.escuelajs.co/api/v1/categories/${categoriaId}/products` // Productos de la categoría
    : "https://api.escuelajs.co/api/v1/products"; // Todos los productos si no hay categoría

  // Llama a obtenerProductos con la URL definida para actualizar la lista mostrada
  await obtenerProductos(url);
});

// Evento que escucha entrada de texto en el buscador
inputBuscador.addEventListener("input", async () => {
  // Obtiene el texto ingresado y lo convierte a minúsculas para búsqueda case-insensitive
  const texto = inputBuscador.value.toLowerCase();

  // Si el campo de búsqueda está vacío, vuelve a cargar todos los productos
  if (!texto) {
    obtenerProductos();
    return;
  }

  try {
    // Realiza una petición fetch para obtener todos los productos
    const res = await fetch("https://api.escuelajs.co/api/v1/products");

    // Si la respuesta no es exitosa, lanza un error
    if (!res.ok) throw new Error("Error al obtener productos para buscar");

    // Convierte la respuesta a JSON (arreglo de productos)
    const productos = await res.json();

    // Filtra los productos cuyo título incluya el texto ingresado
    const filtrados = productos.filter(p =>
      p.title.toLowerCase().includes(texto)
    );

    // Muestra los productos filtrados usando la función importada mostrarProductos
    mostrarProductos(filtrados);

  } catch (error) {
    // Captura e imprime cualquier error ocurrido durante la búsqueda
    console.error(error);
  }
});
