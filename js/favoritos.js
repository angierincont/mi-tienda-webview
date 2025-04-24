// Obtiene el contenedor de productos del DOM con id "productos"
const contenedorProductos = document.getElementById("productos");

// Obtiene el contenedor de la lista de favoritos del DOM con id "lista-favoritos"
const listaFavoritos = document.getElementById("lista-favoritos");

// Carga la lista de favoritos desde localStorage, si no existe, inicia con arreglo vacío
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Función que renderiza la lista de productos favoritos en el contenedor correspondiente
function renderFavoritos() {
  // Limpia el contenido HTML del contenedor de favoritos
  listaFavoritos.innerHTML = "";

  // Si no hay favoritos, muestra un mensaje indicándolo
  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = "<p>No tienes productos favoritos aún.</p>";
    return;
  }

  // Recorre cada producto favorito para crear su tarjeta visual
  favoritos.forEach(prod => {
    // Crea un nuevo div para contener la tarjeta del producto
    const div = document.createElement("div");
    div.classList.add("card"); // Añade la clase 'card' para estilos

    // Inserta el contenido HTML dentro de la tarjeta: imagen, título, precio y botón eliminar
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.title}" loading="lazy" />
      <h3>${prod.title}</h3>
      <p>$${prod.price.toFixed(2)}</p>
      <button data-id="${prod.id}" class="eliminar-favorito">Eliminar</button>
    `;

    // Agrega la tarjeta creada al contenedor de favoritos en el DOM
    listaFavoritos.appendChild(div);
  });
}

// Función que guarda el arreglo favoritos en localStorage como JSON
function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Evento que escucha clicks dentro del contenedor de productos para agregar favoritos
contenedorProductos.addEventListener("click", e => {
  // Verifica que el click sea sobre un botón que tenga un atributo data-id
  if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
    // Obtiene el id del producto como número
    const id = Number(e.target.dataset.id);

    // Si el producto ya está en favoritos, muestra alerta y no lo agrega
    if (favoritos.some(fav => fav.id === id)) {
      alert("Producto ya está en favoritos.");
      return;
    }

    // Obtiene la tarjeta del producto (elemento padre más cercano con clase 'card')
    const card = e.target.closest(".card");

    // Obtiene la imagen, título y precio desde la tarjeta
    const img = card.querySelector("img").src;
    const title = card.querySelector("h3").textContent;
    const price = Number(card.querySelector("p").textContent.replace("$", ""));

    // Agrega el producto a la lista de favoritos
    favoritos.push({ id, image: img, title, price });

    // Guarda la lista actualizada en localStorage
    guardarFavoritos();

    // Vuelve a renderizar la lista de favoritos en pantalla
    renderFavoritos();
  }
});

// Evento que escucha clicks en la lista de favoritos para eliminar productos
listaFavoritos.addEventListener("click", e => {
  // Verifica si el elemento clickeado tiene la clase 'eliminar-favorito'
  if (e.target.classList.contains("eliminar-favorito")) {
    // Obtiene el id del producto a eliminar como número
    const id = Number(e.target.dataset.id);

    // Filtra la lista de favoritos para remover el producto con ese id
    favoritos = favoritos.filter(fav => fav.id !== id);

    // Guarda la lista actualizada en localStorage
    guardarFavoritos();

    // Vuelve a renderizar la lista de favoritos en pantalla
    renderFavoritos();
  }
});

// Renderiza la lista de favoritos al cargar el script para mostrar datos guardados
renderFavoritos();
