// =====================================================
// SYTEC - JavaScript para interactividad moderna
// =====================================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // ===== INICIALIZAR INTERSECTION OBSERVER PARA ANIMACIONES =====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".fade-in-up, .animate-on-scroll")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Obtener el delay del atributo data-delay o usar 0
            const delay = entry.target.getAttribute("data-delay") || 0
            setTimeout(() => {
              entry.target.classList.add("visible")
            }, Number.parseInt(delay))
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    elements.forEach((el) => observer.observe(el))
  }

  // Inicializar animaciones
  animateOnScroll()

  // ===== NAVEGACIÓN STICKY CON EFECTO AL SCROLL =====
  const navbar = document.getElementById("mainNav")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    // Agregar clase 'scrolled' cuando se hace scroll
    if (currentScroll > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  })

  // ===== SMOOTH SCROLL PARA ENLACES DE NAVEGACIÓN =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Ignorar enlaces que no apuntan a secciones
      if (href === "#" || href === "") return

      e.preventDefault()

      const target = document.querySelector(href)
      if (target) {
        const navHeight = navbar.offsetHeight
        const targetPosition = target.offsetTop - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Cerrar menú móvil si está abierto
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const navbarToggler = document.querySelector(".navbar-toggler")
          navbarToggler.click()
        }
      }
    })
  })

  // ===== MARCAR LINK ACTIVO EN NAVEGACIÓN =====
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  function highlightNavigation() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 150
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavigation)

  // ===== MANEJO DEL FORMULARIO DE CONTACTO =====
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value
      const email = document.getElementById("email").value
      const telefono = document.getElementById("telefono").value
      const mensaje = document.getElementById("mensaje").value

      // Validación básica
      if (!nombre || !email || !telefono) {
        alert("Por favor, rellena todos los campos obligatorios.")
        return
      }

      // Simulación de envío (en producción conectar con backend)
      console.log("Datos del formulario:", {
        nombre,
        email,
        telefono,
        mensaje,
      })

      // Mostrar mensaje de éxito
      formSuccess.classList.remove("d-none")

      // Limpiar formulario
      contactForm.reset()

      // Scroll al mensaje de éxito
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" })

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        formSuccess.classList.add("d-none")
      }, 5000)

      // En producción, aquí enviarías los datos al servidor:
      /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, email, telefono, mensaje })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                formSuccess.classList.remove('d-none');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            });
            */
    })
  }

  // ===== LAZY LOADING PARA IMÁGENES =====
  // Crear un observer para las imágenes
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.add("loaded")
          observer.unobserve(img)
        }
      }
    })
  })

  // Observar todas las imágenes con data-src
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })

  // ===== BOTÓN FLOTANTE CON EFECTO DE APARICIÓN =====
  const floatBtn = document.getElementById("floatBtn")

  if (floatBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        floatBtn.style.opacity = "1"
        floatBtn.style.pointerEvents = "all"
      } else {
        floatBtn.style.opacity = "0"
        floatBtn.style.pointerEvents = "none"
      }
    })

    // Estado inicial
    floatBtn.style.transition = "opacity 0.3s ease"
    if (window.pageYOffset <= 500) {
      floatBtn.style.opacity = "0"
      floatBtn.style.pointerEvents = "none"
    }
  }

  // ===== PREVENCIÓN DE FLASH DE CONTENIDO SIN ESTILO =====
  document.body.style.opacity = "1"

  // ===== MANEJO DE LINKS EXTERNOS =====
  // Agregar target="_blank" y rel="noopener noreferrer" a links externos
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute("target", "_blank")
      link.setAttribute("rel", "noopener noreferrer")
    }
  })

  // ===== EFECTO PARALLAX SUTIL EN HERO =====
  const heroBg = document.querySelector(".hero-bg")
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxSpeed = 0.5
      heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    })
  }

  // ===== LOG DE INICIALIZACIÓN =====
  console.log("🔒 SYTEC Website initialized successfully!")
  console.log("📱 Mobile-first design active")
  console.log("✨ All animations loaded with native Intersection Observer")
})

// ===== MANEJO DE ERRORES GLOBAL =====
window.addEventListener("error", (e) => {
  console.error("Error capturado:", e.message)
})

// ===== PERFORMANCE MONITORING (opcional) =====
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      console.log(`⚡ Página cargada en ${pageLoadTime}ms`)
    }, 0)
  })
}
