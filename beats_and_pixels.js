document.addEventListener('DOMContentLoaded', function() {
  var btn = document.querySelector('.btn');
  var navMenu = document.querySelector('.nav-menu');

  // Función para alternar la opacidad y el color de fondo del menú
  function toggleMenuAppearance() {
    var links = navMenu.querySelectorAll('li a');

    links.forEach(function(link) {
      if (window.getComputedStyle(link).opacity === '0') {
        link.style.opacity = '1';
        navMenu.style.backgroundColor = 'rgba(14, 0, 30, 0.9)'; // Color de fondo deseado
      } else {
        link.style.opacity = '0';
        navMenu.style.backgroundColor = 'transparent'; // Color de fondo transparente
      }
    });
  }

  btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      this.classList.add('not-active');
      // Ocultar el menú con una pequeña demora después de la animación de opacidad
      setTimeout(function() {
        navMenu.classList.remove('show-menu');
      }, 1000); // Ajusta el tiempo según tus preferencias
    } else {
      this.classList.add('active');
      this.classList.remove('not-active');
      // Mostrar el menú con una pequeña demora antes de la animación de opacidad
      setTimeout(function() {
        navMenu.classList.add('show-menu');
      }, 50); // Ajusta el tiempo según tus preferencias
    }

    // Agregar una pequeña demora para la animación de opacidad y color de fondo
    setTimeout(function() {
      toggleMenuAppearance();
    }, 50);
  });

  // Añade un evento de clic adicional para ocultar el menú cuando se hace clic en cualquier enlace dentro del menú
  var navLinks = document.querySelectorAll('.nav-menu li a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      btn.classList.remove('active');
      btn.classList.add('not-active');

      // Ocultar el menú con una pequeña demora después de la animación de opacidad
      setTimeout(function() {
        navMenu.classList.remove('show-menu');
      }, 300); // Ajusta el tiempo según tus preferencias

      // Agregar una pequeña demora para la animación de opacidad y color de fondo
      setTimeout(function() {
        toggleMenuAppearance();
      }, 50);
    });
  });

  // Efecto de desplazamiento suave al hacer clic en el logo
  document.querySelector('.logo a').addEventListener('click', function(event) {
    event.preventDefault();

    const target = document.querySelector('#top');

    scrollToTarget(target);
  });

  function scrollToTarget(target) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const duration = 800; // Duración en milisegundos
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1);

      const easedProgress = easeInOutQuad(progress);

      const newY = start + (end - start) * easedProgress;
      window.scrollTo(0, newY);

      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }
});