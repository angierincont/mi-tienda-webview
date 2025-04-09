function cargarProductos(productos) {
    const categoria = document.getElementById('filtroCategoria').value;
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
  
    const filtrados = categoria
      ? productos.filter(p => p.category?.name === categoria)
      : productos;
  
    filtrados.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <img src="${p.images[0]}" width="100">
        <p>$${p.price}</p>
        <button onclick="guardarFavorito(${p.id})">⭐ Favorito</button>
      `;
      contenedor.appendChild(card);
    });
  
    cargarCategorias(productos);
  }
  
  function buscarProductos(e) {
    const query = e.target.value.toLowerCase();
    [...document.querySelectorAll('#productos .card')].forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  }
  
  function cargarCategorias(productos) {
    const categorias = [...new Set(productos.map(p => p.category?.name))];
    const select = document.getElementById('filtroCategoria');
    select.innerHTML = '<option value="">Todas las categorías</option>';
    categorias.forEach(c => {
      const option = document.createElement('option');
      option.value = c;
      option.textContent = c;
      select.appendChild(option);
    });
  }
  