function obtenerFavoritos() {
  const favoritos = localStorage.getItem("favoritos-tab");
  return favoritos ? JSON.parse(favoritos) : [];
}

function guardarFavoritos(favoritos) {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function agregarAFavoritos(id) {
  const favoritos = obtenerFavoritos();
  if (!favoritos.includes(id)) {
    favoritos.push(id);
    guardarFavoritos(favoritos);
    alert("Producto agregado a favoritos.");
    mostrarFavoritos();
  } else {
    alert("Este producto ya está en favoritos.");
  }
}

async function mostrarFavoritos() {
  const favoritos = obtenerFavoritos();
  const contenedor = document.getElementById("lista-favoritos");
  contenedor.innerHTML = "";

  for (const id of favoritos) {
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const producto = await res.json();

      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <img src="${producto.images[0]}" alt="${producto.title}" />
        <h3>${producto.title}</h3>
        <p>$${producto.price}</p>
        <button onclick="eliminarFavorito(${producto.id})">🗑️ Quitar</button>
      `;
      contenedor.appendChild(div);
    } catch (error) {
      console.error("Error al mostrar favorito:", error);
    }
  }
}

function eliminarFavorito(id) {
  let favoritos = obtenerFavoritos();
  favoritos = favoritos.filter(fav => fav !== id);
  guardarFavoritos(favoritos);
  mostrarFavoritos();
}

// Mostrar favoritos al entrar en la pestaña
document.addEventListener("DOMContentLoaded", mostrarFavoritos);
