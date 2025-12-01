// Cart Page JavaScript

let appliedCoupon = null;

document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartSummary();
});

function loadCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x fs-1 text-muted"></i>
                <h5 class="mt-3">Your cart is empty</h5>
                <p class="text-muted">Add some products to your cart to continue shopping.</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item d-flex align-items-center mb-4 pb-4 border-bottom" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">
            <div class="flex-grow-1 ms-3">
                <h6 class="mb-1">${item.name}</h6>
                <p class="text-muted mb-0 small">${item.category}</p>
            </div>
            <div class="text-center mx-3">
                <div class="input-group" style="width: 120px;">
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="form-control form-control-sm text-center" value="${item.quantity}" min="1" max="10" 
                           onchange="updateQuantity(${item.id}, parseInt(this.value))">
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="text-end mx-3" style="min-width: 100px;">
                <div class="fw-bold">${formatPrice(item.price * item.quantity)}</div>
                <small class="text-muted">${formatPrice(item.price)} each</small>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `).join('');
}

function updateQuantity(productId, quantity) {
    updateCartQuantity(productId, quantity);
    loadCartItems();
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const discount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
    const total = subtotal + shipping + tax - discount;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('tax').textContent = formatPrice(tax);
    
    if (appliedCoupon) {
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('discount').textContent = '-' + formatPrice(discount);
    } else {
        document.getElementById('discountRow').style.display = 'none';
    }
    
    document.getElementById('total').textContent = formatPrice(total);
}

function applyCoupon() {
    const code = document.getElementById('couponCode').value.trim().toUpperCase();
    const couponMessage = document.getElementById('couponMessage');
    
    // Simulate coupon validation
    const coupons = {
        'SAVE10': { discount: 10, valid: true },
        'SAVE20': { discount: 20, valid: true },
        'WELCOME': { discount: 15, valid: true }
    };
    
    if (coupons[code]) {
        appliedCoupon = { code, discount: coupons[code].discount };
        couponMessage.innerHTML = `<div class="alert alert-success mb-0">Coupon applied! ${coupons[code].discount}% discount.</div>`;
        updateCartSummary();
    } else {
        couponMessage.innerHTML = `<div class="alert alert-danger mb-0">Invalid coupon code.</div>`;
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}






