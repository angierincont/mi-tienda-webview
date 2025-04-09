const formRegistro = document.getElementById("form-registro");

formRegistro.addEventListener("submit", function (e) {
  e.preventDefault();

  const datos = {
    nombre: formRegistro.elements[0].value,
    apellido: formRegistro.elements[1].value,
    correo: formRegistro.elements[2].value,
    usuario: formRegistro.elements[3].value,
    contraseña: formRegistro.elements[4].value,
    ciudad: formRegistro.elements[5].value,
    telefono: formRegistro.elements[6].value,
  };

  console.log("Usuario registrado:", datos);
  alert("¡Registro exitoso!");

  formRegistro.reset();
});
