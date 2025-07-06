/*
* Christian Tolentino - Modern Professional Portfolio
* Enhanced JavaScript with smooth animations and interactive features
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initSmoothScrolling();
    initNavbarEffects();
    initScrollAnimations();
    initSkillAnimations();
    initPortfolioInteractions();
    initContactForm();
    initTypingEffect();
    initParallaxEffects();
    initLoadingAnimations();
    initScrollToTop();
    initAnimatedStats();
});

// Smooth scrolling with enhanced behavior
function initSmoothScrolling() {
    document.querySelectorAll('.navbar-nav .nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link with animation
                updateActiveNavLink(this);
            }
        });
    });
}
    
// Enhanced navbar effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove shadow and adjust padding
        if (currentScrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update active nav link based on scroll position
        updateActiveNavLinkOnScroll();
    });
}

// Update active navigation link
function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
    });
    clickedLink.classList.add('active');
}
    
    // Update active nav link based on scroll position
function updateActiveNavLinkOnScroll() {
    const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === '#' + sectionId) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.fade-in-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and elements with fade-in class
    document.querySelectorAll('section, .fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Animated skill bars
function initSkillAnimations() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

// Enhanced portfolio interactions
function initPortfolioInteractions() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            
            // Add shimmer effect
            const shimmer = document.createElement('div');
            shimmer.className = 'shimmer-effect';
            shimmer.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                transition: left 0.5s;
                z-index: 1;
            `;
            this.appendChild(shimmer);
            
            setTimeout(() => {
                shimmer.style.left = '100%';
            }, 10);
            
            setTimeout(() => {
                if (shimmer.parentNode) {
                    shimmer.parentNode.removeChild(shimmer);
                }
            }, 500);
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
        });
    });
}

// Enhanced contact form with validation and animations
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add input animation
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = 'var(--primary)';
            } else {
                this.style.borderColor = 'var(--gray-200)';
            }
        });
    });
    
    // Form submission with enhanced UX
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
                input.style.borderColor = 'var(--gray-200)';
            });
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--primary)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effects for background elements
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 500);
    });
    
    // Animate elements on page load
    const animateOnLoad = () => {
        const elements = document.querySelectorAll('.animate-on-load');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        });
    };
    
    // Run after page loads
    window.addEventListener('load', animateOnLoad);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animated statistics
function initAnimatedStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
}

// Utility function for smooth animations
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * progress;
        element.textContent = Math.round(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Add CSS for additional animations
const additionalStyles = `
    .fade-in-child {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .fade-in-child.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .shimmer-effect {
        pointer-events: none;
    }
    
    .notification {
        font-weight: 600;
    }
    
    .form-group.focused .form-label {
        color: var(--primary);
        transform: translateY(-20px) scale(0.8);
    }
    
    .loading {
        opacity: 0;
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    .animate-on-load {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-load.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);