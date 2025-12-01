// Global App JavaScript

// Initialize cart and wishlist from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;

// Update cart and wishlist counts
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = count > 0 ? 'block' : 'none';
    }
}

function updateWishlistCount() {
    const count = wishlist.length;
    const wishlistCountEl = document.getElementById('wishlistCount');
    if (wishlistCountEl) {
        wishlistCountEl.textContent = count;
        wishlistCountEl.style.display = count > 0 ? 'block' : 'none';
    }
}

// Add to cart
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!', 'success');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product removed from cart!', 'info');
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    }
}

// Add to wishlist
function addToWishlist(product) {
    if (!wishlist.find(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        showNotification('Added to wishlist!', 'success');
    } else {
        showNotification('Already in wishlist!', 'warning');
    }
}

// Remove from wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    showNotification('Removed from wishlist!', 'info');
}

// Check if product is in wishlist
function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            performSearch(this.value.trim());
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    // Simulate search - in real app, this would be an API call
    const allProducts = getSampleProducts();
    const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="d-flex align-items-center">
                    <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    <div>
                        <div class="fw-bold">${product.name}</div>
                        <small class="text-muted">${formatPrice(product.price)}</small>
                    </div>
                </div>
            </div>
        `).join('');
        searchResults.classList.add('show');
    } else {
        searchResults.innerHTML = '<div class="search-result-item text-muted">No results found</div>';
        searchResults.classList.add('show');
    }
}

// Generate image URL based on product name
function getProductImageUrl(productName) {
    // Convert product name to search-friendly keyword
    const keyword = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    // Use Unsplash with keyword-based search
    return `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80`;
}

// Sample products data
function getSampleProducts() {
    const products = [
        { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'electronics', rating: 4.5 },
        { id: 2, name: 'Smart Watch', price: 199.99, category: 'electronics', rating: 4.8 },
        { id: 3, name: 'Running Shoes', price: 79.99, category: 'sports', rating: 4.3 },
        { id: 4, name: 'Cotton T-Shirt', price: 29.99, category: 'fashion', rating: 4.6 },
        { id: 5, name: 'Coffee Maker', price: 149.99, category: 'home', rating: 4.7 },
        { id: 6, name: 'Face Cream', price: 39.99, category: 'beauty', rating: 4.4 },
        { id: 7, name: 'Laptop Bag', price: 59.99, category: 'fashion', rating: 4.5 },
        { id: 8, name: 'Yoga Mat', price: 34.99, category: 'sports', rating: 4.2 },
    ];
    
    // Add image URLs based on product names
    const imageMap = {
        'Wireless Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        'Smart Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        'Running Shoes': 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
        'Cotton T-Shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        'Coffee Maker': 'https://images.pexels.com/photos/2748535/pexels-photo-2748535.jpeg',
        'Face Cream': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
        'Laptop Bag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        'Yoga Mat': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
    };
    
    return products.map(product => ({
        ...product,
        image: imageMap[product.name] || `https://via.placeholder.com/500x500/cccccc/666666?text=${encodeURIComponent(product.name)}`
    }));
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateWishlistCount();
    initSearch();
    initScrollToTop();
    
    // Update user dropdown if logged in
    if (user) {
        const userDropdown = document.getElementById('userDropdown');
        if (userDropdown) {
            userDropdown.innerHTML = `<i class="bi bi-person-circle"></i> ${user.name}`;
        }
    }
});

