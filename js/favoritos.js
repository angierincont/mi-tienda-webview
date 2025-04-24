// js/favoritos.js

const contenedorProductos = document.getElementById("productos");
const listaFavoritos = document.getElementById("lista-favoritos");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function renderFavoritos() {
  listaFavoritos.innerHTML = "";
  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = "<p>No tienes productos favoritos aún.</p>";
    return;
  }
  favoritos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.title}" loading="lazy" />
      <h3>${prod.title}</h3>
      <p>$${prod.price.toFixed(2)}</p>
      <button data-id="${prod.id}" class="eliminar-favorito">Eliminar</button>
    `;
    listaFavoritos.appendChild(div);
  });
}

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

contenedorProductos.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
    const id = Number(e.target.dataset.id);

    if (favoritos.some(fav => fav.id === id)) {
      alert("Producto ya está en favoritos.");
      return;
    }

    // Obtener info del producto desde el DOM
    const card = e.target.closest(".card");
    const img = card.querySelector("img").src;
    const title = card.querySelector("h3").textContent;
    const price = Number(card.querySelector("p").textContent.replace("$", ""));

    favoritos.push({ id, image: img, title, price });
    guardarFavoritos();
    renderFavoritos();
  }
});

listaFavoritos.addEventListener("click", e => {
  if (e.target.classList.contains("eliminar-favorito")) {
    const id = Number(e.target.dataset.id);
    favoritos = favoritos.filter(fav => fav.id !== id);
    guardarFavoritos();
    renderFavoritos();
  }
});

renderFavoritos();
