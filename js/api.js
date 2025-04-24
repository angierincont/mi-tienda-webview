// js/api.js

// Definimos las constantes para las URL de la API de productos y categorías.
export const API_URL = "https://api.escuelajs.co/api/v1/products"; // URL de los productos
export const CATEGORIAS_URL = "https://api.escuelajs.co/api/v1/categories"; // URL de las categorías

// Selección del contenedor donde se mostrarán los productos.
const contenedor = document.getElementById("productos");

// Selección del elemento de filtro de categorías en el DOM.
const filtroSelect = document.getElementById("filtro-categoria");

// Función asíncrona para obtener los productos de la API.
export async function obtenerProductos() {
  try {
    // Realizamos una solicitud fetch a la API para obtener los productos.
    const res = await fetch(API_URL);

    // Verificamos si la respuesta es exitosa (código 2xx).
    if (!res.ok) throw new Error("Error en la respuesta");

    // Convertimos la respuesta a formato JSON.
    const productos = await res.json();

    // Llamamos a la función para mostrar los productos obtenidos.
    mostrarProductos(productos);

    // Devolvemos la lista de productos obtenidos.
    return productos;
  } catch (error) {
    // Si ocurre un error, mostramos el mensaje en la consola y en el contenedor de productos.
    console.error("Error al obtener productos:", error);

    // Mensaje de error en caso de fallo.
    contenedor.innerHTML = "<p>Error al cargar productos.</p>";

    // Retornamos un arreglo vacío en caso de error.
    return [];
  }
}

// Función para mostrar los productos en el contenedor.
export function mostrarProductos(productos) {
  // Limpiamos el contenido actual del contenedor de productos.
  contenedor.innerHTML = "";

  // Si no se encuentran productos, mostramos un mensaje en el contenedor.
  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  // Iteramos sobre los productos para crear los elementos HTML y mostrarlos.
  productos.forEach(producto => {
    // Creamos un nuevo elemento div para cada producto.
    const div = document.createElement("div");

    // Añadimos la clase 'card' al div para darle estilo.
    div.classList.add("card");

    // Establecemos el contenido HTML del div, incluyendo imagen, título, precio y un botón.
    div.innerHTML = `
      <img src="${producto.images[0]}" alt="${producto.title}" loading="lazy" />
      <h3>${producto.title}</h3>
      <p>$${producto.price.toFixed(2)}</p>
      <button data-id="${producto.id}">Agregar a favoritos</button>
    `;

    // Añadimos el div al contenedor de productos.
    contenedor.appendChild(div);
  });
}

// Función asíncrona para cargar las categorías desde la API.
export async function cargarCategorias() {
  try {
    // Realizamos una solicitud fetch a la API para obtener las categorías.
    const res = await fetch(CATEGORIAS_URL);

    // Verificamos si la respuesta es exitosa (código 2xx).
    if (!res.ok) throw new Error("Error en la respuesta de categorías");

    // Convertimos la respuesta a formato JSON.
    const categorias = await res.json();

    // Llamamos a la función para cargar las opciones de categorías en el filtro.
    cargarOpcionesCategorias(categorias);
  } catch (error) {
    // Si ocurre un error, mostramos el mensaje en la consola.
    console.error("Error al cargar categorías:", error);
  }
}

// Función para cargar las opciones de categorías en el filtro de selección.
function cargarOpcionesCategorias(categorias) {
  // Iteramos sobre las categorías y creamos una opción por cada categoría.
  categorias.forEach(categoria => {
    // Creamos un nuevo elemento <option> para cada categoría.
    const option = document.createElement("option");

    // Establecemos el valor de la opción como el ID de la categoría.
    option.value = categoria.id;

    // Establecemos el texto de la opción como el nombre de la categoría.
    option.textContent = categoria.name;

    // Añadimos la opción al filtro de categorías.
    filtroSelect.appendChild(option);
  });
}
