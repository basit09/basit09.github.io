// Theme Switching Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme') || 'dark-theme';
if (savedTheme === 'light-theme') {
    body.classList.replace('dark-theme', 'light-theme');
} else {
    body.classList.add('dark-theme');
}
updateToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
        updateToggleIcon('light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateToggleIcon('dark-theme');
    }
});

function updateToggleIcon(theme) {
    if (theme === 'dark-theme') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Staggered Animation Logic
function applyStagger(container) {
    const children = container.querySelectorAll('.reveal');
    children.forEach((child, index) => {
        child.style.setProperty('--stagger-idx', index);
    });
}

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // If it's a container, apply stagger to visible children
            if (entry.target.classList.contains('stagger-container')) {
                applyStagger(entry.target);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal class to sections and elements for animation
document.querySelectorAll('.reveal, .card, .stat-card, .timeline-item, .skills-container, .project-grid').forEach(el => {
    if (el.classList.contains('skills-container') || el.classList.contains('project-grid') || el.classList.contains('about-stats')) {
        el.classList.add('stagger-container');
    }
    observer.observe(el);
});

// Ambient Glow & Mesh Shift
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Ambient Glow Follow
    const glows = document.querySelectorAll('.ambient-glow');
    glows.forEach((glow, index) => {
        const speed = (index + 1) * 0.02;
        const dx = (x - window.innerWidth / 2) * speed;
        const dy = (y - window.innerHeight / 2) * speed;
        glow.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    // Mesh Gradient Shift
    const moveX = (x / window.innerWidth) * 100;
    const moveY = (y / window.innerHeight) * 100;
    document.body.style.backgroundPosition = `${moveX}% ${moveY}%`;
});

// Hero Parallax Effect
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const avatar = hero.querySelector('.avatar-container');
        if (avatar) {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            avatar.style.transform = `translate(${x}px, ${y}px) rotateX(${y}deg) rotateY(${x}deg)`;
        }
    });
}

// Mobile Drawer Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerLinks = document.querySelectorAll('.drawer-links a');

function toggleDrawer() {
    mobileMenuBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('active');
    drawerOverlay.classList.toggle('active');
    document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', toggleDrawer);

drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleDrawer();
    });
});

// Update navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});
