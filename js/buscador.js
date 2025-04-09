const inputBuscador = document.getElementById("buscador");

inputBuscador.addEventListener("input", async () => {
  const texto = inputBuscador.value.toLowerCase();

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    const productos = await res.json();

    const filtrados = productos.filter(p =>
      p.title.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
  } catch (error) {
    console.error("Error al buscar productos:", error);
  }
});
