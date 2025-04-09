function guardarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (!favoritos.includes(id)) favoritos.push(id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarFavoritos();
}

async function mostrarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const productos = await obtenerProductos();
  const contenedor = document.getElementById('favoritos');
  contenedor.innerHTML = '<h2>Favoritos</h2>';

  productos
    .filter(p => favoritos.includes(p.id))
    .forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <img src="${p.images[0]}" width="100">
        <p>$${p.price}</p>
        <button onclick="eliminarFavorito(${p.id})">❌ Quitar</button>
      `;
      contenedor.appendChild(card);
    });
}

function eliminarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(fav => fav !== id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarFavoritos();
}
