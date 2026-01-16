// ============================================
// EmailJS Configuration
// ============================================
// Note: Replace these with your actual EmailJS credentials
// Get them from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Initialize EmailJS (only if credentials are configured)
let emailjsConfigured = false;
if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && 
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        emailjsConfigured = true;
    } catch (error) {
        console.warn('EmailJS initialization failed:', error);
    }
}

// ============================================
// DOM Elements
// ============================================

const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.skill-progress');

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('light-mode', currentTheme === 'light');
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    const theme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ============================================
// Mobile Menu Toggle
// ============================================

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// Smooth Scrolling
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll for "Get a Quote" button
const getQuoteBtn = document.querySelector('.btn-primary[href="#contact"]');
if (getQuoteBtn) {
    getQuoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// Active Navigation Link on Scroll
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Initial check

// ============================================
// Project Filtering
// ============================================

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get filter value
        const filterValue = button.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ============================================
// Skill Bar Animation on Scroll
// ============================================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const width = skillBar.getAttribute('data-width');
            skillBar.style.width = `${width}%`;
            skillObserver.unobserve(skillBar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// Contact Form with EmailJS
// ============================================

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    formMessage.style.display = 'none';

    try {
        // Check if EmailJS is configured
        if (!emailjsConfigured) {
            throw new Error('EmailJS not configured. Please set up your EmailJS credentials in script.js');
        }

        // Send email using EmailJS
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData
        );

        // Show success message
        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';

        // Reset form
        contactForm.reset();

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error('EmailJS Error:', error);
        
        // Show error message
        let errorMsg = 'Failed to send message. ';
        if (!emailjsConfigured) {
            errorMsg += 'EmailJS is not configured. Please set up your credentials in script.js or email me directly at hello@mail.com';
        } else {
            errorMsg += 'Please try again or email me directly at hello@mail.com';
        }
        
        formMessage.textContent = errorMsg;
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// ============================================
// Hero Navigation (Carousel-like functionality)
// ============================================

const heroNavPrev = document.querySelector('.hero-nav-btn.prev');
const heroNavNext = document.querySelector('.hero-nav-btn.next');

// Simple hero content rotation (can be extended for actual carousel)
let heroContentIndex = 0;
const heroContents = [
    {
        title: 'Hello',
        name: "I'm Jackson",
        description: "I photograph very instinctively. I see how it is taken like most silence. I follow certain styles, philosophies or teachers."
    },
    {
        title: 'Creative',
        name: "Photographer",
        description: "Capturing moments that tell stories. Every frame is a narrative waiting to be discovered."
    },
    {
        title: 'Visual',
        name: "Storyteller",
        description: "Through my lens, I explore the interplay between light and shadow, creating images that resonate with authenticity."
    }
];

function updateHeroContent() {
    const content = heroContents[heroContentIndex];
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    heroTitle.innerHTML = `
        <span class="gradient-text">${content.title}</span>
        <span class="hero-name">${content.name}</span>
    `;
    heroDescription.textContent = content.description;
}

if (heroNavNext && heroNavPrev) {
    heroNavNext.addEventListener('click', () => {
        heroContentIndex = (heroContentIndex + 1) % heroContents.length;
        updateHeroContent();
    });

    heroNavPrev.addEventListener('click', () => {
        heroContentIndex = (heroContentIndex - 1 + heroContents.length) % heroContents.length;
        updateHeroContent();
    });
}

// ============================================
// Scroll Animations
// ============================================

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections for scroll animations
document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item').forEach(el => {
    scrollObserver.observe(el);
});

// ============================================
// Form Validation Enhancement
// ============================================

const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#f44336';
        } else {
            input.style.borderColor = '';
        }
    });

    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(244, 67, 54)') {
            input.style.borderColor = '';
        }
    });
});

// ============================================
// Performance Optimization
// ============================================

// Throttle scroll events for better performance
let ticking = false;
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ============================================
// Console Message
// ============================================

console.log('%c👋 Hello! Welcome to Jackson\'s Portfolio', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
console.log('%c💡 Don\'t forget to configure EmailJS credentials in script.js', 'color: #4ecdc4; font-size: 12px;');
