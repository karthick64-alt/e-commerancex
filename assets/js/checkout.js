// Checkout Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadOrderItems();
    updateOrderSummary();
    
    // Update shipping cost based on delivery option
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const shipping = this.id === 'fastDelivery' ? 15 : 10;
            document.getElementById('orderShipping').textContent = formatPrice(shipping);
            updateOrderSummary();
        });
    });
});

function loadOrderItems() {
    const container = document.getElementById('orderItems');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between mb-2">
            <div>
                <strong>${item.name}</strong><br>
                <small class="text-muted">Qty: ${item.quantity}</small>
            </div>
            <div class="text-end">
                ${formatPrice(item.price * item.quantity)}
            </div>
        </div>
    `).join('');
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingText = document.getElementById('orderShipping').textContent;
    const shipping = parseFloat(shippingText.replace('$', ''));
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    document.getElementById('orderSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('orderTax').textContent = formatPrice(tax);
    document.getElementById('orderTotal').textContent = formatPrice(total);
}

function saveAddress() {
    showNotification('Address saved successfully!', 'success');
    document.getElementById('addressModal').querySelector('.btn-close').click();
    document.getElementById('addressForm').reset();
}

function placeOrder() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Simulate order placement
    const orderId = 'ORD-' + Date.now();
    const order = {
        id: orderId,
        items: [...cart],
        date: new Date().toISOString(),
        status: 'confirmed',
        total: document.getElementById('orderTotal').textContent
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to order confirmation
    window.location.href = `order-confirmation.html?id=${orderId}`;
}






