// --- FUNCIONALIDAD DEL CARRUSEL INFINITO ---
document.addEventListener("DOMContentLoaded", () => {
  const logoTrack = document.querySelector(".logo-track");
  
  if (logoTrack) {
    // Duplicamos los nodos de los logos para garantizar el efecto infinito sin cortes visuales
    const logos = Array.from(logoTrack.children);
    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      logoTrack.appendChild(clone);
    });

    // Pausar la animación al pasar el cursor para facilitar hacer clic en el enlace
    logoTrack.addEventListener("mouseenter", () => {
      logoTrack.style.animationPlayState = "paused";
    });

    logoTrack.addEventListener("mouseleave", () => {
      logoTrack.style.animationPlayState = "running";
    });
  }
});
