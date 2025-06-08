// Superhero Resume - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initAnimatedCounters();
    initScrollAnimations();
    initNavigationHighlight();
    initParallaxEffects();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated counters for stats
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
        
        hasAnimated = true;
    }
    
    // Trigger animation when stats section is in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.achievements');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Scroll animations for sections
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .timeline-item, .achievement-item, .education-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Navigation highlight based on scroll position
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    updateActiveNavLink(); // Initialize on load
}

// Parallax effects for hero section
function initParallaxEffects() {
    const capeElement = document.querySelector('.cape-element');
    const heroAvatar = document.querySelector('.hero-avatar');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const avatarRate = scrolled * -0.3;
        
        if (capeElement) {
            capeElement.style.transform = `rotate(15deg) translateY(${rate}px)`;
        }
        
        if (heroAvatar) {
            heroAvatar.style.transform = `translateY(${avatarRate}px)`;
        }
    }
    
    window.addEventListener('scroll', updateParallax);
}

// Navbar background opacity on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Skill badge hover effects
document.addEventListener('DOMContentLoaded', function() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 8px 20px rgba(184, 84, 80, 0.4)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 12px rgba(184, 84, 80, 0.3)';
        });
    });
});

// Achievement items stagger animation
function initAchievementAnimations() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.transition = 'all 0.6s ease-out';
                }, index * 100); // Stagger the animations
            }
        });
    }, observerOptions);
    
    achievementItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        observer.observe(item);
    });
}

// Timeline items animation
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                }, index * 200); // Stagger the animations
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        observer.observe(item);
    });
}

// Initialize additional animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAchievementAnimations();
    initTimelineAnimations();
});

// Contact button interactions
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add floating particles effect to hero section
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS for floating particles animation
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: var(--hero-red);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Initialize particle effects
document.addEventListener('DOMContentLoaded', function() {
    addParticleStyles();
    createFloatingParticles();
});

// Hero text typing effect
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const originalText = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
    
    let i = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
        if (i < originalText.length) {
            tagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after hero animation
    setTimeout(typeWriter, 2000);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTypingEffect, 500);
});

// Smooth reveal for sections on scroll
function initSectionReveals() {
    const sections = document.querySelectorAll('section:not(#hero)');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 1s ease-out';
        observer.observe(section);
    });
}

// Initialize section reveals
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSectionReveals, 1000);
});