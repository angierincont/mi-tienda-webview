function mostrarPestaña(id) {
  const secciones = document.querySelectorAll(".pestaña");
  secciones.forEach((sec) => sec.classList.remove("activa"));

  const seleccionada = document.getElementById(id);
  if (seleccionada) {
    seleccionada.classList.add("activa");
  }
}
