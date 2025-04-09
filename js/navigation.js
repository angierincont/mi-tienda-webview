function mostrarPestaña(indice) {
    const pestañas = document.querySelectorAll('.pestaña');
    pestañas.forEach(p => p.classList.remove('activa'));
    pestañas[indice].classList.add('activa');
  
    if (indice === 1) mostrarFavoritos(); // si abre "Favoritos", actualiza la vista
  }
  