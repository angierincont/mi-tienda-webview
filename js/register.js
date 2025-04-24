// Importa la referencia a la base de datos Firestore desde el archivo firebase.js
import { db } from './firebase.js';

// Importa las funciones collection y addDoc desde la librería de Firestore para manejar colecciones y agregar documentos
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Obtiene el elemento del DOM con id "form-registro" (el formulario de registro)
const form = document.getElementById("form-registro");

// Añade un event listener para cuando se envía el formulario (submit)
form.addEventListener("submit", async (e) => {
  // Evita que el formulario se envíe de forma tradicional y recargue la página
  e.preventDefault();

  // Obtiene todos los inputs dentro del formulario para extraer sus valores
  const inputs = form.querySelectorAll("input");

  try {
    // Agrega un nuevo documento a la colección "usuarios" en Firestore con los datos capturados del formulario
    await addDoc(collection(db, "usuarios"), {
      nombre: inputs[0].value,       // Valor del primer input (nombre)
      apellido: inputs[1].value,     // Valor del segundo input (apellido)
      correo: inputs[2].value,       // Valor del tercer input (correo)
      usuario: inputs[3].value,      // Valor del cuarto input (usuario)
      contraseña: inputs[4].value,   // Valor del quinto input (contraseña)
      ciudad: inputs[5].value,       // Valor del sexto input (ciudad)
      telefono: inputs[6].value      // Valor del séptimo input (teléfono)
    });

    // Muestra alerta indicando que el usuario fue registrado exitosamente
    alert("✅ Usuario registrado exitosamente.");
    // Limpia el formulario para permitir un nuevo registro
    form.reset();

  } catch (error) {
    // En caso de error, muestra el error en la consola para depuración
    console.error("❌ Error al registrar: ", error);
    // Muestra una alerta indicando que ocurrió un error al registrar el usuario
    alert("Error al registrar usuario. Revisa la consola.");
  }
});
