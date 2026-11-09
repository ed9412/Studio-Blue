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



  // 1. Filtramos solo los enlaces internos que empiezan por '#' (ignora enlaces externos como contacto.html)
  const internalLinks = Array.from(navLinks).filter(link => {
    const href = link.getAttribute('href');
    return href && (href.startsWith('#') || href === '#');
  });

  // 2. Buscamos las secciones correspondientes en el HTML
  const sections = internalLinks
    .map(link => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#home') return document.querySelector('#home') || document.querySelector('.hero');
      return document.querySelector(href);
    })
    .filter(section => section !== null);

  // 3. Configuramos el observador para detectar qué sección está en el centro de la pantalla
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Quitamos la clase 'active' de todos los enlaces
        navLinks.forEach(link => link.classList.remove('active'));

        const id = entry.target.getAttribute('id');
        let activeLink;

        // Identificamos el enlace correcto basado en el ID de la sección visible
        if (id === 'home' || entry.target.classList.contains('hero')) {
          activeLink = document.querySelector('.nav-menu a[href="#"]') || document.querySelector('.nav-menu a[href="#home"]');
        } else {
          activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
        }

        // Activamos el subrayado
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // 4. Iniciamos la observación
  sections.forEach(section => observer.observe(section));

// --- FUNCIONALIDAD DEL CARRUSEL INFINITO DE LOGOS ---
  const logoSlider = document.querySelector(".logo-slider");
  const logoTrack = document.querySelector(".logo-track");
  const logoBtnPrev = document.querySelector(".logo-prev-btn");
  const logoBtnNext = document.querySelector(".logo-next-btn");

  if (logoTrack && logoSlider) {
    // 1. Multiplicamos los logos por 6 para cubrir la pantalla
    const logosHTML = logoTrack.innerHTML;
    logoTrack.innerHTML = logosHTML.repeat(6);

    // VARIABLES DE INERCIA INDEPENDIENTES PARA LOGOS
    let currentScrollLogo = 0;
    let targetScrollLogo = 0;
    let isMobileLogo = window.innerWidth <= 900;
    
    // Usamos las mismas velocidades exactas del portafolio
    let baseSpeedLogo = isMobileLogo ? 0.60 : 0.398; 
    let jumpAmountLogo = isMobileLogo ? 300 : 600; 

    window.addEventListener('resize', () => {
      isMobileLogo = window.innerWidth <= 900;
      baseSpeedLogo = isMobileLogo ? 0.60 : 0.398;
      jumpAmountLogo = isMobileLogo ? 300 : 600;
    });

    let isPausedLogo = false;

    // 2. Motor matemático (idéntico al del portafolio)
    function autoScrollLogos() {
      if (!isPausedLogo) {
        targetScrollLogo += baseSpeedLogo;
      }

      currentScrollLogo += (targetScrollLogo - currentScrollLogo) * 0.04;

      const halfWidthLogo = logoTrack.scrollWidth / 2;

      if (currentScrollLogo >= halfWidthLogo) {
        currentScrollLogo -= halfWidthLogo;
        targetScrollLogo -= halfWidthLogo;
      } else if (currentScrollLogo <= 0 && targetScrollLogo <= 0) {
        currentScrollLogo += halfWidthLogo;
        targetScrollLogo += halfWidthLogo;
      }

      logoSlider.scrollLeft = currentScrollLogo;
      requestAnimationFrame(autoScrollLogos);
    }
    
    autoScrollLogos();

    // 3. Pausar al pasar el ratón
    logoSlider.addEventListener("mouseenter", () => {
      isPausedLogo = true;
      targetScrollLogo = currentScrollLogo; // Esto iguala las variables y mata el "derrape" al instante
    });
    
    logoSlider.addEventListener("mouseleave", () => {
      isPausedLogo = false;
    });

    // 4. Funcionalidad de las flechas
    if (logoBtnNext && logoBtnPrev) {
      logoBtnNext.addEventListener("click", () => {
        targetScrollLogo += jumpAmountLogo;
      });

      logoBtnPrev.addEventListener("click", () => {
        targetScrollLogo -= jumpAmountLogo;
      });
    }
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
    let baseSpeed = isMobile ? 0.60 : 0.398; 
    
    // Si es móvil salta 300px por clic, si es PC salta 600px
    let jumpAmount = isMobile ? 300  : 600; 

    // Recalcula automáticamente si el usuario gira el teléfono o redimensiona la ventana
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 900;
      baseSpeed = isMobile ? 0.60 : 0.398; // Ajuste fino para que la velocidad se sienta igual en ambos dispositivos
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