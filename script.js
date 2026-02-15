document.addEventListener('DOMContentLoaded', function() {
    // Top announcement bar now lives in HTML for easy enable/disable
    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevButton = document.querySelector('.slide-nav-arrow.prev');
    const nextButton = document.querySelector('.slide-nav-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        // Guard: only update dots if they exist
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
        }
        
        slides[index].classList.add('active');
        if (dots.length > 0 && dots[index]) {
            dots[index].classList.add('active');
        }
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Add click events to dots (only if present)
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });
    }

    // Add click events to arrows
    if (prevButton && nextButton && slides.length > 1) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    function resetInterval() {
        if (slides.length > 1) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // Start slideshow if there are slides
    if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('メッセージありがとうございます！');
            this.reset();
        });
    }

    // Header scroll behavior
    let lastScroll = 0;
    const mainHeader = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            mainHeader?.classList.remove('scrolled');
            mainHeader?.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !mainHeader?.classList.contains('scrolled')) {
            // Scrolling down
            mainHeader?.classList.add('scrolled');
            mainHeader?.classList.remove('scroll-up');
        } else if (currentScroll < lastScroll && mainHeader?.classList.contains('scrolled')) {
            // Scrolling up
            mainHeader?.classList.remove('scrolled');
            mainHeader?.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle the answer
            answer.classList.toggle('active');
            
            // Rotate the icon
            icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });

    // Mobile dropdown menu handling
    const dropdowns = document.querySelectorAll('.dropdown');
    let currentDropdown = null;
    
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        dropbtn.addEventListener('click', function(e) {
            // Only handle click on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const wasActive = dropdown.classList.contains('active');
                
                // Close all dropdowns first
                dropdowns.forEach(d => d.classList.remove('active'));
                
                // Toggle the clicked dropdown if it wasn't already active
                if (!wasActive) {
                    dropdown.classList.add('active');
                    currentDropdown = dropdown;
                } else {
                    currentDropdown = null;
                }
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            currentDropdown = null;
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                currentDropdown = null;
            }
        }, 250);
    });

    // Mobile main menu (hamburger) handling
    const headerBottom = document.querySelector('.header-bottom');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    if (headerBottom && mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = headerBottom.classList.toggle('nav-open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close when clicking outside header on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && headerBottom.classList.contains('nav-open')) {
                if (!e.target.closest('.header-bottom')) {
                    headerBottom.classList.remove('nav-open');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Close menu after clicking a non-toggle nav link on mobile
        headerBottom.querySelectorAll('nav a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    // Do not close when the click is on a dropdown toggle
                    if (link.classList.contains('dropbtn')) {
                        return;
                    }
                    headerBottom.classList.remove('nav-open');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Ensure menu resets on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                headerBottom.classList.remove('nav-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}); 