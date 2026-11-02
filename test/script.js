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

  // --- FUNCIONALIDAD DEL CARRUSEL INFINITO DE LOGOS (Existente) ---
  const logoTrack = document.querySelector(".logo-track");
  if (logoTrack) {
    const logos = Array.from(logoTrack.children);
    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      logoTrack.appendChild(clone);
    });

    logoTrack.addEventListener("mouseenter", () => {
      logoTrack.style.animationPlayState = "paused";
    });

    logoTrack.addEventListener("mouseleave", () => {
      logoTrack.style.animationPlayState = "running";
    });
  }
});