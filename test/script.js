document.addEventListener("DOMContentLoaded", () => {
  
  // --- NAVEGACIÓN: EFECTO LIQUID GLASS AL HACER SCROLL ---
  const navbar = document.querySelector(".navbar");
  
  window.addEventListener("scroll", () => {
    // Si bajamos más de 50px, se añade la clase 'scrolled'
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- NAVEGACIÓN: MENÚ HAMBURGUESA PARA MÓVILES ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu ul li a");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      // Activa/desactiva la animación de la "X" y desliza el menú
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Cierra el menú automáticamente si el usuario hace clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

// --- FUNCIONALIDAD DEL CARRUSEL INFINITO DE LOGOS ---
  const logoTrack = document.querySelector(".logo-track");
  
  if (logoTrack) {
    // 1. Tomamos los 5 logos y los multiplicamos por 6 para cubrir cualquier pantalla
    const logosHTML = logoTrack.innerHTML;
    logoTrack.innerHTML = logosHTML.repeat(6);

    // 2. Solo mantenemos la pausa cuando el usuario pone el cursor encima
    logoTrack.addEventListener("mouseenter", () => {
      logoTrack.style.animationPlayState = "paused";
    });

    logoTrack.addEventListener("mouseleave", () => {
      logoTrack.style.animationPlayState = "running";
    });
    
    // (Hemos eliminado el bloque visibilitychange)
  }
});