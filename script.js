// Global variables
let currentTheme = 'light';
let currentPage = 'home';

// Sample products data
const products = [
    {
        id: 1,
        category: 'traditional',
        image: 'public/collection/p1.jpg',
    },
    {
        id: 2,
        category: 'traditional',
        image: 'public/collection/p2.jpg',
    },
    {
        id: 3,
        category: 'western',
        image: 'public/collection/p3.jpg',
    },
    {
        id: 4,
        category: 'western',
        image: 'public/collection/p4.jpg',
    },
    {
        id: 5,
        category: 'traditional',
        image: 'public/collection/p5.jpg',
    },
    {
        id: 6,
        category: 'traditional',
        image: 'public/collection/p6.jpg',
    },
    {
        id: 7,
        category: 'western',
        image: 'public/collection/p7.jpg',
    },
    {
        id: 8,
        category: 'western',
        image: 'public/collection/p8.jpg',
    },
    {
        id: 9,
        category: 'traditional',
        image: 'public/collection/p9.jpg',
    },
    {
        id: 10,
        category: 'western',
        image: 'public/collection/p10.jpg',
    },
    {
        id: 11,
        category: 'western',
        image: 'public/collection/p11.jpg',
    },
    {
        id: 12,
        category: 'western',
        image: 'public/collection/p12.jpg',
    },
    {
        id: 13,
        category: 'western',
        image: 'public/collection/p13.jpg',
    },
    {
        id: 14,
        category: 'western',
        image: 'public/collection/p14.jpg',
    },
    {
        id: 15,
        category: 'traditional',
        image: 'public/collection/p15.jpg',
    },
    {
        id: 16,
        category: 'traditional',
        image: 'public/collection/p16.jpg',
    },
    {
        id: 17,
        category: 'traditional',
        image: 'public/collection/p17.jpg',
    },
    {
        id: 18,
        category: 'traditional',
        image: 'public/collection/p18.jpg',
    },
    {
        id: 19,
        category: 'traditional',
        image: 'public/collection/p19.jpg',
    },
    {
        id: 20,
        category: 'traditional',
        image: 'public/collection/p20.jpg',
    },
    {
        id: 21,
        category: 'traditional',
        image: 'public/collection/p21.jpg',
    },
    {
        id: 22,
        category: 'accessories',
        image: 'public/collection/p22.png',
    },
     {
        id: 23,
        category: 'accessories',
        image: 'public/collection/p23.png',
    },
     {
        id: 24,
        category: 'accessories',
        image: 'public/collection/p24.png',
    },
     {
        id: 25,
        category: 'accessories',
        image: 'public/collection/p25.png',
    },
     {
        id: 26,
        category: 'accessories',
        image: 'public/collection/p26.png',
    },
     {
        id: 27,
        category: 'accessories',
        image: 'public/collection/p27.png',
    },

];


// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const categoryButtons = document.querySelectorAll('.category-btn');
const productsGrid = document.getElementById('productsGrid');
const contactForm = document.getElementById('contactForm');

// Initialize the application
function init() {
    setupEventListeners();
    loadProducts();
    setActivePage('home');
    loadTheme();
}

// Setup event listeners
function setupEventListeners() {

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            setActivePage(page);
            updateURL(page);
        });
    });

    // Category filters
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterProducts(category);
            updateActiveCategory(button);
        });
    });

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || 'home';
        setActivePage(page);
    });

    // Handle initial page load
    const hash = window.location.hash.slice(1) || 'home';
    setActivePage(hash);
}

// Page navigation
function setActivePage(page) {
    // Hide all pages
    pages.forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
    
    currentPage = page;
    
    // Add fade-in animation
    if (targetPage) {
        targetPage.classList.add('fade-in');
        setTimeout(() => {
            targetPage.classList.remove('fade-in');
        }, 500);
    }
}

function updateURL(page) {
    const url = new URL(window.location);
    url.hash = page;
    window.history.pushState({ page }, '', url);
}

// Product management
function loadProducts(category = 'all') {
    if (!productsGrid) return;
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" class="product-img">
        </div>
    `;
    return card;
}

function filterProducts(category) {
    loadProducts(category);
}

function updateActiveCategory(activeButton) {
    categoryButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}



function simulateContactSubmit(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate success (90% success rate)
            if (Math.random() > 0.1) {
                resolve(data);
            } else {
                reject(new Error('Network error'));
            }
        }, 1000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.3s ease;
    `;
    
    notification.querySelector('.notification-close').addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    notification.querySelector('.notification-close').addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Shopping cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show notification
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Update cart count if cart icon exists
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // If you have a cart icon, update its badge
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        let badge = cartIcon.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: #ef4444;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: bold;
            `;
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(badge);
        }
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.collection-card, .feature-card, .stat-card, .team-member');
    animateElements.forEach(el => observer.observe(el));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Add any responsive behavior here
}, 250);

window.addEventListener('resize', handleResize);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupSmoothScrolling();
    setupAnimations();
    updateCartCount();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(style); 