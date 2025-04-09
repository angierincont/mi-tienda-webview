document.addEventListener('DOMContentLoaded', async () => {
  const productos = await obtenerProductos();
  cargarProductos(productos);
  document.getElementById('buscador').addEventListener('input', buscarProductos);
  document.getElementById('filtroCategoria').addEventListener('change', () => cargarProductos(productos));
});
