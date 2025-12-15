/**
 * Test script for the T-Shirt E-Commerce Store
 * This script tests the functionality of the cart system
 */

// Mock DOM elements for testing
const mockProductCard = {
    querySelector: function(selector) {
        if (selector === 'h2') {
            return { textContent: 'Test T-Shirt' };
        } else if (selector === 'p') {
            return { textContent: '$19.99' };
        }
        return null;
    }
};

// Mock button
const mockButton = {
    closest: function() {
        return mockProductCard;
    },
    style: {
        backgroundColor: ''
    },
    textContent: 'Add to Cart'
};

// Test the addToCart function
console.log('Testing addToCart function...');

// Test valid product
try {
    addToCart('Test T-Shirt', 19.99);
    console.log('✓ Valid product added successfully');
} catch (error) {
    console.error('✗ Error adding valid product:', error);
}

// Test invalid product name
try {
    addToCart('', 19.99);
    console.log('✗ Empty product name should have failed');
} catch (error) {
    console.log('✓ Empty product name correctly rejected');
}

// Test invalid price
try {
    addToCart('Test T-Shirt', -5);
    console.log('✗ Negative price should have failed');
} catch (error) {
    console.log('✓ Negative price correctly rejected');
}

// Test cart utility functions
console.log('\nTesting cart utility functions...');

console.log('Cart contents:', getCart());
console.log('Cart count:', getCartCount());
console.log('Cart total:', getCartTotal().toFixed(2));

// Test clear cart
clearCart();
console.log('Cart after clearing:', getCart());
console.log('Cart count after clearing:', getCartCount());

console.log('\nAll tests completed!');
