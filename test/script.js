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


  // --- FUNCIONALIDAD DEL CARRUSEL DE PORTAFOLIO ---
  const portSlider = document.querySelector(".portfolio-slider");
  const portTrack = document.querySelector(".portfolio-track");
  const btnPrev = document.querySelector(".prev-btn");
  const btnNext = document.querySelector(".next-btn");

  if (portTrack && portSlider) {
    // 1. Multiplicamos las fotos por 6 para el efecto infinito
    const portHTML = portTrack.innerHTML;
    portTrack.innerHTML = portHTML.repeat(6);
    
    // VARIABLES DE INERCIA (SMOOTH SCROLL)
    let currentScroll = 0; // Dónde está la pantalla visualmente
    let targetScroll = 0;  // Hacia dónde queremos ir

    // VARIABLES DINÁMICAS (PC vs MÓVIL)
    let isMobile = window.innerWidth <= 900;
    
    // Si es móvil va a 0.3, si es PC va a 0.5
    let baseSpeed = isMobile ? 0.36 : 0.398; 
    
    // Si es móvil salta 300px por clic, si es PC salta 600px
    let jumpAmount = isMobile ? 300  : 600; 

    // Recalcula automáticamente si el usuario gira el teléfono o redimensiona la ventana
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 900;
      baseSpeed = isMobile ? 0.36 : 0.398; // Ajuste fino para que la velocidad se sienta igual en ambos dispositivos
      jumpAmount = isMobile ? 300 : 600;
    });


    let isPaused = false;
    let animationId;

    // 2. Motor matemático de inercia
    function autoScrollPortfolio() {
      // El "objetivo" siempre avanza poco a poco si no está pausado
      if (!isPaused) {
        targetScroll += baseSpeed;
      }

      // MAGIA DE SUAVIDAD (Línea de Easing): 
      // La pantalla "persigue" al objetivo cerrando un 6% de la distancia por cada fotograma.
      // Si quieres que sea MÁS suave y patine más, bájalo a 0.04. Si lo quieres más rápido, súbelo a 0.1
      currentScroll += (targetScroll - currentScroll) * 0.04;

      // 3. Reinicio infinito a prueba de fallos (calcula la mitad exacta de la pista)
      const halfWidth = portTrack.scrollWidth / 2;

      // Si nos pasamos hacia adelante, retrocedemos ambas variables a la vez sin que se note
      if (currentScroll >= halfWidth) {
        currentScroll -= halfWidth;
        targetScroll -= halfWidth;
      } 
      // Si nos pasamos hacia atrás (al dar clics a la flecha izquierda), saltamos hacia adelante
      else if (currentScroll <= 0 && targetScroll <= 0) {
        currentScroll += halfWidth;
        targetScroll += halfWidth;
      }

      // Aplicamos el movimiento final suavizado
      portSlider.scrollLeft = currentScroll;
      animationId = requestAnimationFrame(autoScrollPortfolio);
    }
    
    autoScrollPortfolio(); // Iniciamos el motor

    // 4. Pausar al pasar el ratón
    portSlider.addEventListener("mouseenter", () => isPaused = true);
    portSlider.addEventListener("mouseleave", () => isPaused = false);

    // 5. Botones de Navegación Suavizada


    btnNext.addEventListener("click", () => {
      targetScroll += jumpAmount; // Solo empujamos el objetivo, el motor se encarga de alcanzarlo suavemente
    });

    btnPrev.addEventListener("click", () => {
      targetScroll -= jumpAmount;
    });
  }

// --- FUNCIONALIDAD DEL ACORDEÓN DE SERVICIOS ---
  const accordionItems = document.querySelectorAll('.service-item'); // Busca la clase correcta

  accordionItems.forEach(item => {
    // Detectamos el clic en toda la zona del título + botón
    const header = item.querySelector('.service-header');
    
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // OPCIONAL: Cierra todos los demás ítems antes de abrir el nuevo
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.service-toggle-btn').setAttribute('aria-expanded', 'false');
      });

      // Si no estaba abierto, lo abrimos
      if (!isOpen) {
        item.classList.add('active');
        item.querySelector('.service-toggle-btn').setAttribute('aria-expanded', 'true');
      } 
    });
  });
  
});