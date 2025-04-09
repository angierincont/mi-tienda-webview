const filtroCategoria = document.getElementById("filtro-categoria");

filtroCategoria.addEventListener("change", async () => {
  const categoriaId = filtroCategoria.value;

  try {
    let url = "https://api.escuelajs.co/api/v1/products";

    if (categoriaId) {
      url = `https://api.escuelajs.co/api/v1/categories/${categoriaId}/products`;
    }

    const res = await fetch(url);
    const productos = await res.json();

    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al filtrar productos:", error);
  }
});
