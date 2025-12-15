/**
 * T-Shirt E-Commerce Store JavaScript
 * Handles cart functionality and user interactions
 */

// Cart state
let cart = [];
let cartCount = 0;

// DOM elements
const cartNotification = document.createElement('div');
cartNotification.className = 'cart-notification';
cartNotification.textContent = 'Item added to cart!';
document.body.appendChild(cartNotification);

// Add to cart functionality
function addToCart(productName, price) {
    // Validate inputs
    if (!productName || typeof productName !== 'string' || productName.trim() === '') {
        console.error('Invalid product name');
        return;
    }

    if (isNaN(price) || price <= 0) {
        console.error('Invalid product price');
        return;
    }

    try {
        // Add product to cart
        cart.push({ name: productName.trim(), price: parseFloat(price.toFixed(2)) });
        cartCount++;

        // Show notification
        cartNotification.style.display = 'block';

        // Hide notification after 2 seconds
        setTimeout(() => {
            cartNotification.style.display = 'none';
        }, 2000);

        // Update cart count in localStorage
        updateCartStorage();

        console.log(`Added ${productName} to cart. Total items: ${cartCount}`);
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Update cart in localStorage
function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cartCount.toString());
}

// Load cart from localStorage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    const storedCount = localStorage.getItem('cartCount');

    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    if (storedCount) {
        cartCount = parseInt(storedCount);
    }
}

// Initialize the store
function initStore() {
    // Load cart from storage
    loadCartFromStorage();

    // Update cart count display
    updateCartCountDisplay();

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product info from the parent card
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h2').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));

            // Add to cart
            addToCart(productName, productPrice);

            // Update cart count display
            updateCartCountDisplay();

            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'linear-gradient(45deg, var(--accent-color), #d63a55)';
            }, 1000);
        });
    });

    console.log('E-Commerce store initialized');
}

// Update cart count display
function updateCartCountDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initStore);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Cart utility functions
function getCartTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

function clearCart() {
    cart = [];
    cartCount = 0;
    updateCartStorage();
    console.log('Cart cleared');
}

// Expose some functions to global scope for debugging
window.getCart = () => cart;
window.getCartCount = () => cartCount;
window.getCartTotal = getCartTotal;
window.clearCart = clearCart;
