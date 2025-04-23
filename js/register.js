

import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const form = document.getElementById("form-registro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputs = form.querySelectorAll("input");

  try {
    await addDoc(collection(db, "usuarios"), {
      nombre: inputs[0].value,
      apellido: inputs[1].value,
      correo: inputs[2].value,
      usuario: inputs[3].value,
      contraseña: inputs[4].value,
      ciudad: inputs[5].value,
      telefono: inputs[6].value
    });

    alert("✅ Usuario registrado exitosamente.");
    form.reset();
  } catch (error) {
    console.error("❌ Error al registrar: ", error);
    alert("Error al registrar usuario. Revisa la consola.");
  }
});
