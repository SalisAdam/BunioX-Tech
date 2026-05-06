/* ============================================
   BunioX Tech Solutions - Main JavaScript
   Handles: Navbar, Animations, Forms, Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==================== STICKY NAVBAR ====================
    const navbar = document.getElementById('mainNavbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    // ==================== ACTIVE NAV LINK ====================
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` ||
                        link.getAttribute('href') === `${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // ==================== COUNTER ANIMATION ====================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            if (counter.dataset.animated) return;

            const rect = counter.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                counter.dataset.animated = 'true';
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ==================== SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            observer.observe(el);
        });
    }

    initScrollAnimations();

    // Handle CSS animation class
    const style = document.createElement('style');
    style.textContent = `
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ==================== BACK TO TOP BUTTON ====================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== CONTACT FORM VALIDATION ====================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Name validation
            const nameInput = document.getElementById('contactName');
            if (nameInput && !nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else if (nameInput) {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }

            // Email validation
            const emailInput = document.getElementById('contactEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else if (emailInput) {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            // Message validation
            const messageInput = document.getElementById('contactMessage');
            if (messageInput && !messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else if (messageInput) {
                messageInput.classList.remove('is-invalid');
                messageInput.classList.add('is-valid');
            }

            // Show success message if valid
            if (isValid) {
                const successMsg = document.getElementById('formSuccess');
                if (successMsg) {
                    successMsg.classList.remove('d-none');
                }
                contactForm.reset();

                // Remove validation classes after reset
                setTimeout(() => {
                    document.querySelectorAll('.is-valid').forEach(el => {
                        el.classList.remove('is-valid');
                    });
                    successMsg.classList.add('d-none');
                }, 5000);
            }
        });

        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }

    // ==================== PRELOADER (if exists) ====================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // ==================== TYPING EFFECT (optional) ====================
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = typingElement.dataset.words.split(',');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

});

// ==================== PAGE LOADER ANIMATION ====================
document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        window.addEventListener('load', function () {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
});
