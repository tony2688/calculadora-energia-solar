/*!
* UV Energía Solar - Scripts
*/

// Navegación
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la navegación
    const mainNav = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Función para cambiar estilo de navegación al hacer scroll
    function checkScroll() {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-shrink');
        } else {
            mainNav.classList.remove('navbar-shrink');
        }
    }
    
    // Verificar el scroll al cargar la página
    checkScroll();
    
    // Escuchar eventos de scroll
    window.addEventListener('scroll', checkScroll);
    
    // Menú móvil
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevenir comportamiento predeterminado
            e.preventDefault();
            
            // Cerrar el menú móvil
            navbarCollapse.classList.remove('show');
            
            // Obtener el destino del enlace
            const targetId = this.getAttribute('href');
            
            // Verificar si es un enlace interno
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcular la posición de desplazamiento considerando la altura de la barra de navegación
                    const navHeight = mainNav.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    // Desplazamiento suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.log(`Element with ID ${targetId} not found`);
                }
            } else {
                // Si no es un enlace interno, navegar normalmente
                window.location.href = targetId;
            }
        });
    });
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
    // Inicializar swiper para el masthead
    initMastheadSwiper();
    
    // Inicializar otros swipers si existen
    if (document.querySelector('.swiper:not(.masthead-carousel .swiper)')) {
        initSwiper();
    }
});

// Animaciones al hacer scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animated-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize Swiper carousel for masthead
function initMastheadSwiper() {
    const mastheadSwiperElement = document.querySelector('.masthead-carousel .swiper');
    
    if (mastheadSwiperElement) {
        const mastheadSwiper = new Swiper(mastheadSwiperElement, {
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 1500,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}

// Función para inicializar otros swipers
function initSwiper() {
    // Código para inicializar otros swipers si es necesario
}