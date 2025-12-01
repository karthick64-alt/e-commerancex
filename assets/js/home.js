// Home Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadDealsProducts();
    loadFeaturedProducts();
    loadTrendingProducts();
    initNewsletter();
});

function loadDealsProducts() {
    const container = document.getElementById('dealsProducts');
    if (!container) return;
    
    const products = getSampleProducts().slice(0, 4).map(product => ({
        ...product,
        originalPrice: product.price * 1.3,
        discount: 30
    }));
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const products = getSampleProducts().slice(0, 4);
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function loadTrendingProducts() {
    const container = document.getElementById('trendingProducts');
    if (!container) return;
    
    const products = getSampleProducts().slice(4, 8);
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const isInWish = isInWishlist(product.id);
    const discountBadge = product.originalPrice ? 
        `<span class="badge bg-danger product-badge">-${product.discount}%</span>` : '';
    
    return `
        <div class="col-md-6 col-lg-3">
            <div class="card product-card h-100 shadow-sm">
                <div class="product-image position-relative">
                    ${discountBadge}
                    <img src="${product.image}" alt="${product.name}" class="img-fluid" onerror="this.src='https://via.placeholder.com/500x500/cccccc/666666?text=' + encodeURIComponent('${product.name}')">
                    <div class="product-actions">
                        <button onclick="addToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})" 
                                class="btn btn-sm" title="Add to Wishlist">
                            <i class="bi bi-heart${isInWish ? '-fill text-danger' : ''}"></i>
                        </button>
                        <button onclick="window.location.href='product-detail.html?id=${product.id}'" 
                                class="btn btn-sm" title="Quick View">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <h6 class="card-title"><a href="product-detail.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a></h6>
                    <div class="product-rating mb-2">
                        ${generateStars(product.rating)}
                        <small class="text-muted">(${product.rating})</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="product-price">${formatPrice(product.price)}</span>
                            ${product.originalPrice ? `<span class="product-price-old">${formatPrice(product.originalPrice)}</span>` : ''}
                        </div>
                    </div>
                    <button class="btn btn-primary w-100 mt-3" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star"></i>';
    }
    
    return stars;
}

function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate newsletter subscription
        showNotification('Thank you for subscribing!', 'success');
        this.reset();
    });
}


