# 🛒 ShopHub - Complete E-Commerce Store

A comprehensive, full-featured e-commerce website built with HTML, CSS, JavaScript, and Bootstrap 5.

## ✨ Features

### 1️⃣ Home Page Module
- Main banner slider with multiple slides
- Category showcase with images
- Featured products section
- Today's deals section
- Trending items
- Seasonal collections
- Brand highlights
- Customer testimonials/reviews
- Newsletter signup

### 2️⃣ User Account Module
- User registration with validation
- Login/logout functionality
- OTP-based login
- Forgot/reset password
- User dashboard with statistics
- Edit profile details
- Manage addresses (add, edit, delete)
- View saved payment cards

### 3️⃣ Product Management Module
- Product categories & subcategories
- Product listing page with grid view
- Advanced filters (brand, size, color, price, rating)
- Product sorting (price, newest, popularity, rating)
- Detailed product page with zoom
- Product variants (size, color)
- Product gallery with thumbnails
- Related/recommended products
- Stock availability display

### 4️⃣ Search & Discovery Module
- Real-time search bar
- Auto-suggestions dropdown
- Recent searches
- Popular searches
- Smart search functionality

### 5️⃣ Shopping Cart Module
- Add to cart functionality
- Remove from cart
- Update quantity
- Auto price calculation
- Coupon code application
- Cart summary (subtotal, shipping, tax, total)

### 6️⃣ Checkout & Payment Module
- Address selection/add new address
- Delivery options (fast/standard)
- Order summary
- Coupon validation
- Multiple payment options:
  - Cash on Delivery (COD)
  - UPI (GPay, PhonePe, Paytm)
  - Credit/Debit Cards
  - Net Banking
- Order confirmation page

### 7️⃣ Wishlist Module
- Add to wishlist
- Remove from wishlist
- Wishlist page with grid view
- Move items from wishlist to cart

### 8️⃣ Order Management Module
- My orders list with status
- View order details
- Order tracking timeline
- Download invoice
- Order cancellation
- Return/replacement request

### 9️⃣ Review & Rating Module
- Rate products (1-5 stars)
- Write detailed reviews
- Upload review images
- View all reviews
- Verified purchase badge

### 🔟 Admin Panel Module
- Admin dashboard with statistics
- Manage products (CRUD operations)
- Manage categories & subcategories
- Manage brands
- Manage users
- Manage orders (approve, cancel, refund)
- Manage return & refund requests
- Manage banners & homepage content
- Manage offers & coupons
- Sales reports
- Analytics dashboard

### 1️⃣1️⃣ Marketing & Promotions Module
- Coupon/discount management
- Seasonal sale management
- Banner & offer section control
- Promotional notifications

### 1️⃣2️⃣ Customer Support Module
- Contact form
- Help center / FAQs
- Live chat support widget
- Ticket raising system
- Order-related support

### 1️⃣3️⃣ Security Module
- Secure payment encryption
- Login protection
- Admin authentication
- SSL protection indicators

### 1️⃣4️⃣ CMS / Static Pages Module
- About Us page
- Contact Us page
- Privacy Policy
- Terms & Conditions
- Shipping Policy
- Return/Refund Policy
- FAQ page

### 1️⃣5️⃣ Notification Module
- Email notifications (simulated)
- Order status updates
- Payment alerts
- Promotional notifications

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for best experience)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. For better experience, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

### Adding Images

The website expects images in the `assets/images/` directory. You need to add the following images:

**Banner Images:**
- `banner1.jpg` - Main banner slide 1
- `banner2.jpg` - Main banner slide 2
- `banner3.jpg` - Main banner slide 3

**Category Images:**
- `category-electronics.jpg`
- `category-fashion.jpg`
- `category-home.jpg`
- `category-beauty.jpg`
- `category-sports.jpg`
- `category-books.jpg`

**Product Images:**
- `product1.jpg` through `product8.jpg` (or more)

**Collection Images:**
- `collection-summer.jpg`
- `collection-winter.jpg`

**Brand Logos:**
- `brand1.png` through `brand6.png`

**User Images:**
- `user1.jpg`, `user2.jpg`, `user3.jpg`

**Other Images:**
- `about-hero.jpg`

You can use placeholder image services like:
- https://via.placeholder.com/800x400
- https://picsum.photos/800/400
- Or add your own images

## 📁 Project Structure

```
E-commerce store/
│
├── index.html                 # Home page
├── login.html                 # Login page
├── register.html              # Registration page
├── products.html              # Product listing
├── product-detail.html        # Product detail page
├── cart.html                  # Shopping cart
├── checkout.html              # Checkout page
├── wishlist.html              # Wishlist page
├── orders.html                # Order list
├── order-detail.html          # Order details
├── order-confirmation.html    # Order confirmation
├── dashboard.html             # User dashboard
├── profile.html               # Edit profile
├── addresses.html             # Manage addresses
├── saved-cards.html           # Saved payment cards
├── about.html                 # About us
├── contact.html               # Contact us
├── faq.html                   # FAQ page
├── support.html               # Customer support
├── privacy.html               # Privacy policy
├── terms.html                 # Terms & conditions
├── shipping.html              # Shipping policy
├── returns.html               # Returns policy
├── refund.html                # Refund policy
├── forgot-password.html       # Forgot password
├── otp-login.html            # OTP login
│
├── admin/
│   └── dashboard.html         # Admin dashboard
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   └── home.css           # Home page styles
│   ├── js/
│   │   ├── app.js             # Main JavaScript
│   │   ├── home.js            # Home page JS
│   │   ├── products.js        # Products page JS
│   │   ├── cart.js            # Cart page JS
│   │   └── checkout.js        # Checkout page JS
│   └── images/                # Image directory
│
└── README.md                  # This file
```

## 🎨 Design Features

- **Responsive Design**: Fully responsive, works on all devices
- **Modern UI**: Clean, modern interface using Bootstrap 5
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Text Alignment**: Proper CSS-based text alignment (not image-dependent)
- **Footer Section**: Comprehensive footer on all pages

## 💾 Data Storage

The website uses **localStorage** to store:
- Shopping cart items
- Wishlist items
- User information
- Orders
- Recent searches

**Note**: This is for demonstration purposes. In a production environment, you would use a backend database.

## 🔧 Customization

### Changing Colors
Edit `assets/css/style.css` and modify the CSS variables:
```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    /* ... */
}
```

### Adding Products
Edit `assets/js/app.js` and modify the `getSampleProducts()` function to add your products.

### Modifying Navigation
Edit the navigation section in each HTML file or create a shared component.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📝 Notes

- All forms are client-side only (no backend integration)
- Payment processing is simulated
- Images need to be added manually
- Admin panel is accessible without authentication (for demo purposes)

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Created with ❤️ for e-commerce enthusiasts

---

**Enjoy building your e-commerce store! 🚀**






