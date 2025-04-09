const toggleModoBtn = document.getElementById("toggle-modo");

toggleModoBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleModoBtn.textContent = "☀️ Modo claro";
  } else {
    toggleModoBtn.textContent = "🌙 Modo oscuro";
  }
});
