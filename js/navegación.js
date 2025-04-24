// Función que muestra una pestaña específica dada su id
function mostrarPestaña(id) {
  // Selecciona todos los elementos del DOM con la clase "pestaña"
  const secciones = document.querySelectorAll(".pestaña");

  // Recorre cada sección y le quita la clase "activa" para ocultarla
  secciones.forEach((sec) => sec.classList.remove("activa"));

  // Busca en el DOM el elemento con el id recibido como parámetro
  const seleccionada = document.getElementById(id);

  // Si el elemento existe, le agrega la clase "activa" para mostrarla
  if (seleccionada) {
    seleccionada.classList.add("activa");
  }
}