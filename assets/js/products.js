// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initFilters();
    initSorting();
    initFilterCollapse();
    
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterByCategory(category);
    }
});

function initFilterCollapse() {
    const filtersCollapse = document.getElementById('filtersCollapse');
    const toggleButton = document.querySelector('[data-bs-target="#filtersCollapse"]');
    
    if (filtersCollapse && toggleButton) {
        filtersCollapse.addEventListener('show.bs.collapse', function() {
            const chevron = toggleButton.querySelector('.bi-chevron-down');
            if (chevron) {
                chevron.style.transform = 'rotate(180deg)';
            }
        });
        
        filtersCollapse.addEventListener('hide.bs.collapse', function() {
            const chevron = toggleButton.querySelector('.bi-chevron-down');
            if (chevron) {
                chevron.style.transform = 'rotate(0deg)';
            }
        });
    }
}

function loadProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    const products = getSampleProducts();
    displayProducts(products);
}

function displayProducts(products) {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><h5>No products found</h5></div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="card product-card h-100 shadow-sm">
                <div class="product-image position-relative">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    <div class="product-actions">
                        <button onclick="addToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})" 
                                class="btn btn-sm" title="Add to Wishlist">
                            <i class="bi bi-heart${isInWishlist(product.id) ? '-fill text-danger' : ''}"></i>
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
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="product-price">${formatPrice(product.price)}</span>
                        <small class="text-muted">In Stock</small>
                    </div>
                    <button class="btn btn-primary w-100" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill text-warning"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half text-warning"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star text-warning"></i>';
    }
    
    return stars;
}

function initFilters() {
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = '$' + this.value;
        });
    }
}

function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

function sortProducts(sortBy) {
    const products = getSampleProducts();
    let sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            sorted.reverse();
            break;
        default:
            // popularity - keep original order
            break;
    }
    
    displayProducts(sorted);
}

function applyFilters() {
    const categories = Array.from(document.querySelectorAll('input[type="checkbox"][id^="cat-"]:checked'))
        .map(cb => cb.value);
    const maxPrice = document.getElementById('priceRange').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    
    let products = getSampleProducts();
    
    if (categories.length > 0) {
        products = products.filter(p => categories.includes(p.category));
    }
    
    products = products.filter(p => p.price <= maxPrice);
    
    if (rating) {
        products = products.filter(p => p.rating >= rating);
    }
    
    displayProducts(products);
}

function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
    document.getElementById('priceRange').value = 500;
    document.getElementById('priceValue').textContent = '$500';
    loadProducts();
}

function filterByCategory(category) {
    const checkbox = document.getElementById(`cat-${category}`);
    if (checkbox) {
        checkbox.checked = true;
        applyFilters();
    }
}





