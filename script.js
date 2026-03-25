document.addEventListener('DOMContentLoaded', () => {

    // Loader logic
    const loader = document.getElementById('loader');
    
    // Hide loader after smooth animation
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    }, 2000);

    // Navbar Scroll & Sticky Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Menu Trigger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Active Section Scroll Highlight
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Animations (Intersection Observer for Fade-ins)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));

    // Global Modal System Logic
    const modalTriggers = document.querySelectorAll('.trigger-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    // Open precise modal on trigger click
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if(targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background jump scroll
            }
        });
    });

    // Close on specific 'X' button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    });

    // Backdrop click close wrapper handler
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Esc Keypress logic for modal safety exit
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if(activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    // EmailJS Contact Form Handling
    // SETUP INSTRUCTIONS:
    // 1. Go to https://www.emailjs.com/ and create a free account
    // 2. Create an email service (Gmail, Outlook, etc.)
    // 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}, {{to_email}}
    // 4. Replace the placeholders below with your actual EmailJS credentials
    (function() {
        // Initialize EmailJS with your public key
        emailjs.init('kCaNXdADA_YXV_lzo'); // Your EmailJS public key
        
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Prepare template parameters
                const templateParams = {
                    from_name: contactForm.from_name.value,
                    from_email: contactForm.from_email.value,
                    message: contactForm.message.value,
                    to_email: 'shayanakhtar405@gmail.com' // Your email address
                };
                
                // Send email using EmailJS
                emailjs.send('service_bscsxgb', 'template_trd7opx', templateParams) // Your service and template IDs
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message
                        contactForm.innerHTML = `
                            <div style="text-align: center; padding: 2rem;">
                                <i class="fas fa-check-circle" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Thank You!</h3>
                                <p style="color: var(--text-secondary);">Your message has been sent successfully. I'll get back to you soon!</p>
                            </div>
                        `;
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        
                        alert('Sorry, there was an error sending your message. Please try again or contact me directly at shayanakhtar405@gmail.com');
                    });
            });
        }
    })();

});
