document.addEventListener('DOMContentLoaded', function() {
    // Animación de carga del circuito
    const circuitAnimation = lottie.loadAnimation({
        container: document.getElementById('circuit-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/circuit-animation.json'
    });

    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Animación de números contadores
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000; // Duración en milisegundos
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            // Iniciar animación cuando el elemento es visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateNumber();
                    observer.unobserve(stat);
                }
            });
            
            observer.observe(stat);
        });
    }

    // Botón de volver arriba
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría el código para enviar el formulario
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }

    // Slider de innovaciones
    const innovationSlider = document.querySelector('.innovation-slider');
    let currentSlide = 0;
    
    if (innovationSlider) {
        const slides = document.querySelectorAll('.innovation-slide');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'flex' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Mostrar primer slide
        showSlide(currentSlide);
        
        // Cambiar slide cada 5 segundos
        setInterval(nextSlide, 5000);
    }

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// script.js - Añade esto para la funcionalidad
$(document).ready(function() {
    // Animación de aparición de items
    function animateTimelineItems() {
        $('.timeline-item').each(function() {
            var itemPosition = $(this).offset().top;
            var scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;
            
            if (scrollPosition > itemPosition) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Filtrado de categorías
    $('.timeline-filter').click(function() {
        $('.timeline-filter').removeClass('active');
        $(this).addClass('active');
        
        var filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.timeline-item').fadeIn(300);
        } else {
            $('.timeline-item').each(function() {
                if ($(this).data('category').includes(filter)) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    });
    
    // Efecto hover para imágenes
    $('.timeline-content').hover(
        function() {
            $(this).find('.timeline-image-hover img').removeClass('hidden');
        },
        function() {
            $(this).find('.timeline-image-hover img').addClass('hidden');
        }
    );
    
    // Inicialización y eventos
    animateTimelineItems();
    $(window).scroll(animateTimelineItems);
});



// script.js mejorado
$(document).ready(function() {
    // Sistema de pestañas
    $('.tab-btn').click(function() {
        // Remover activos
        $('.tab-btn').removeClass('active');
        $('.tab-content').removeClass('active');
        
        // Activar el seleccionado
        $(this).addClass('active');
        const tabId = $(this).data('tab');
        $('#' + tabId).addClass('active').hide().fadeIn(300);
    });
    
    // Acordeón de especificaciones
    $('.accordion-header').click(function() {
        const $item = $(this).parent();
        const isActive = $item.hasClass('active');
        
        // Cerrar todos primero
        $('.accordion-item').removeClass('active');
        
        // Abrir este si no estaba activo
        if (!isActive) {
            $item.addClass('active');
        }
    });
    
    
    // Efecto parallax en imágenes
    $(window).mousemove(function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        $('.tab-content.active .component-img').each(function() {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            $(this).css('transform', `translate(${moveX}px, ${moveY}px) scale(1.05)`);
        });
    });
});

// Script para la sección de impacto ambiental
document.addEventListener('DOMContentLoaded', function() {
    // Animación de números
    const animateNumbers = () => {
        const numberElements = document.querySelectorAll('.animate-number');
        
        const animate = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = target === 1900 ? Math.floor(current) : current.toFixed(1);
            }, 16);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numberElements.forEach(el => observer.observe(el));
    };
    
    // Sistema de pestañas para soluciones
    const solutionTabs = document.querySelectorAll('.eco-solution-tab');
    const solutionPanes = document.querySelectorAll('.eco-solution-pane');
    
    solutionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover activos
            solutionTabs.forEach(t => t.classList.remove('active'));
            solutionPanes.forEach(p => p.classList.remove('active'));
            
            // Activar el seleccionado
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animación de barras de huella de carbono
    const footprintBars = document.querySelectorAll('.eco-footprint-bar');
    
    if (footprintBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.getAttribute('data-value');
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        footprintBars.forEach(bar => observer.observe(bar));
    }
    
    // Inicializar animaciones
    animateNumbers();
});


// Actualiza tu JavaScript con este código:
document.addEventListener('DOMContentLoaded', function() {
    // Hotspots interactivos mejorados
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        const marker = hotspot.querySelector('.hotspot-marker');
        const info = hotspot.querySelector('.hotspot-info');
        
        // Mostrar al entrar al hotspot (marker o info)
        hotspot.addEventListener('mouseenter', () => {
            marker.style.transform = 'scale(1.2)';
            info.style.opacity = '1';
            info.style.pointerEvents = 'auto';
            info.style.transform = 'translateY(0)';
        });
        
        // Ocultar al salir del hotspot (marker e info)
        hotspot.addEventListener('mouseleave', () => {
            marker.style.transform = 'scale(1)';
            info.style.opacity = '0';
            info.style.pointerEvents = 'none';
            info.style.transform = 'translateY(10px)';
        });
        
        // Posicionamiento inteligente
        const rect = hotspot.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        if (rect.left > viewportWidth / 2) {
            info.style.left = 'auto';
            info.style.right = '100%';
            info.style.transformOrigin = 'right center';
        } else {
            info.style.left = '100%';
            info.style.right = 'auto';
            info.style.transformOrigin = 'left center';
        }
    });
});