// ========================================
// LAXI SUPER MART — Main Script
// ========================================

// Mobile Drawer Toggle
function setupMobileMenu() {
    const openBtn = document.getElementById('open-drawer');
    const closeBtn = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');

    if (openBtn && closeBtn && drawer && overlay) {
        const toggle = (active) => {
            drawer.classList.toggle('active', active);
            overlay.classList.toggle('active', active);
            document.body.style.overflow = active ? 'hidden' : '';
        };
        openBtn.onclick = (e) => { e.preventDefault(); toggle(true); };
        closeBtn.onclick = (e) => { e.preventDefault(); toggle(false); };
        overlay.onclick = () => toggle(false);
    }
}

// Search Toggle
function setupSearchToggle() {
    const toggleBtn = document.querySelector('.nav-search-toggle');
    const searchBar = document.getElementById('nav-search-bar');
    const closeBtn = document.querySelector('.nav-search-close');

    if (toggleBtn && searchBar) {
        toggleBtn.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                const input = searchBar.querySelector('input');
                if (input) input.focus();
            }
        });
    }
    if (closeBtn && searchBar) {
        closeBtn.addEventListener('click', () => searchBar.classList.remove('active'));
    }
}

// Active Nav Link Detection
function setActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === path || (path === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Insights Carousel
function setupInsightsCarousel() {
    const wrapper = document.querySelector('.insights-track-wrapper');
    const track = document.getElementById('insights-track');
    const prevBtn = document.querySelector('.insights-prev');
    const nextBtn = document.querySelector('.insights-next');
    const currentEl = document.querySelector('.insights-counter-current');
    const totalEl = document.querySelector('.insights-counter-total');

    if (!track || !prevBtn || !nextBtn || !wrapper) return;

    const cards = track.querySelectorAll('.insight-card');
    if (totalEl) totalEl.textContent = cards.length;

    function updateCounter() {
        const cardWidth = cards[0].offsetWidth + 24;
        const idx = Math.round(wrapper.scrollLeft / cardWidth);
        if (currentEl) currentEl.textContent = idx + 1;
        prevBtn.disabled = wrapper.scrollLeft <= 10;
        nextBtn.disabled = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 10;
    }

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: cards[0].offsetWidth + 24, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -(cards[0].offsetWidth + 24), behavior: 'smooth' });
    });

    wrapper.addEventListener('scroll', updateCounter);
    updateCounter();
}

// ========================================
// PRODUCT DATA — 10 Categories, ~35 items
// ========================================
const products = [
    // Grocery & Staples
    { id: 1, title: "Premium Toor Dal", weight: "1kg", price: 145, oldPrice: 170, discount: "15% OFF", image: "https://images.unsplash.com/photo-1585996959969-1a561066bab5?auto=format&fit=crop&q=80&w=300", category: "Grocery & Staples" },
    { id: 2, title: "Basmati Rice (Aged)", weight: "5kg", price: 480, oldPrice: 560, discount: "14% OFF", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300", category: "Grocery & Staples" },
    { id: 3, title: "Whole Wheat Flour", weight: "5kg", price: 210, oldPrice: 240, discount: "13% OFF", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=300", category: "Grocery & Staples" },
    { id: 4, title: "Sunflower Cooking Oil", weight: "1L", price: 135, oldPrice: 155, discount: "13% OFF", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300", category: "Grocery & Staples" },
    // Fruits & Vegetables
    { id: 5, title: "Fresh Organic Broccoli", weight: "500g", price: 120, oldPrice: 150, discount: "20% OFF", image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=300", category: "Fruits & Vegetables" },
    { id: 6, title: "Red Gala Apples", weight: "1kg", price: 180, oldPrice: 220, discount: "18% OFF", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&q=80&w=300", category: "Fruits & Vegetables" },
    { id: 7, title: "Organic Carrots", weight: "500g", price: 40, oldPrice: 60, discount: "33% OFF", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=300", category: "Fruits & Vegetables" },
    { id: 8, title: "Fresh Strawberries", weight: "250g", price: 150, oldPrice: 200, discount: "25% OFF", image: "https://images.unsplash.com/photo-1464960350295-99573839bc2c?auto=format&fit=crop&q=80&w=300", category: "Fruits & Vegetables" },
    // Dairy & Frozen
    { id: 9, title: "Amul Taaza Toned Milk", weight: "1L", price: 54, oldPrice: 56, discount: "4% OFF", image: "https://images.unsplash.com/photo-1563636619-e91000f21fca?auto=format&fit=crop&q=80&w=300", category: "Dairy & Frozen" },
    { id: 10, title: "Fresh Paneer Block", weight: "200g", price: 85, oldPrice: 100, discount: "15% OFF", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=300", category: "Dairy & Frozen" },
    { id: 11, title: "Brown Eggs (Dozen)", weight: "12 units", price: 90, oldPrice: 110, discount: "18% OFF", image: "https://images.unsplash.com/photo-1582722872445-44ad5c78a9dd?auto=format&fit=crop&q=80&w=300", category: "Dairy & Frozen" },
    { id: 12, title: "Frozen Green Peas", weight: "500g", price: 65, oldPrice: 80, discount: "19% OFF", image: "https://images.unsplash.com/photo-1563636619-e91000f21fca?auto=format&fit=crop&q=80&w=300", category: "Dairy & Frozen" },
    // Home & Personal Care
    { id: 13, title: "Liquid Detergent", weight: "1L", price: 195, oldPrice: 230, discount: "15% OFF", image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&q=80&w=300", category: "Home & Personal Care" },
    { id: 14, title: "Herbal Shampoo", weight: "200ml", price: 165, oldPrice: 199, discount: "17% OFF", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=300", category: "Home & Personal Care" },
    { id: 15, title: "Antibacterial Hand Wash", weight: "250ml", price: 75, oldPrice: 90, discount: "17% OFF", image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&q=80&w=300", category: "Home & Personal Care" },
    // Bed & Bath
    { id: 16, title: "Cotton Bath Towel Set", weight: "2 pcs", price: 450, oldPrice: 599, discount: "25% OFF", image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&q=80&w=300", category: "Bed & Bath" },
    { id: 17, title: "Premium Bed Sheet Set", weight: "Double", price: 899, oldPrice: 1200, discount: "25% OFF", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=300", category: "Bed & Bath" },
    { id: 18, title: "Memory Foam Pillow", weight: "1 pc", price: 599, oldPrice: 799, discount: "25% OFF", image: "https://images.unsplash.com/photo-1592789705501-f9ae4287c4b9?auto=format&fit=crop&q=80&w=300", category: "Bed & Bath" },
    // Crockery
    { id: 19, title: "Dinner Set (24 pcs)", weight: "Set", price: 1450, oldPrice: 1800, discount: "19% OFF", image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&q=80&w=300", category: "Crockery" },
    { id: 20, title: "Ceramic Coffee Mugs", weight: "4 pcs", price: 320, oldPrice: 400, discount: "20% OFF", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=300", category: "Crockery" },
    { id: 21, title: "Glass Tumbler Set", weight: "6 pcs", price: 280, oldPrice: 350, discount: "20% OFF", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=300", category: "Crockery" },
    // Toys & Games
    { id: 22, title: "Building Blocks Set", weight: "200 pcs", price: 650, oldPrice: 850, discount: "24% OFF", image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&q=80&w=300", category: "Toys & Games" },
    { id: 23, title: "Classic Board Game", weight: "1 set", price: 350, oldPrice: 450, discount: "22% OFF", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=300", category: "Toys & Games" },
    { id: 24, title: "Soft Teddy Bear", weight: "Medium", price: 399, oldPrice: 550, discount: "27% OFF", image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?auto=format&fit=crop&q=80&w=300", category: "Toys & Games" },
    // Men's Apparel
    { id: 25, title: "Cotton Round Neck T-Shirt", weight: "M/L/XL", price: 349, oldPrice: 499, discount: "30% OFF", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300", category: "Men's Apparel" },
    { id: 26, title: "Casual Chino Trousers", weight: "32/34/36", price: 699, oldPrice: 999, discount: "30% OFF", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=300", category: "Men's Apparel" },
    { id: 27, title: "Formal Cotton Shirt", weight: "M/L/XL", price: 599, oldPrice: 799, discount: "25% OFF", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=300", category: "Men's Apparel" },
    // Women's Apparel
    { id: 28, title: "Printed Cotton Kurti", weight: "S/M/L", price: 449, oldPrice: 650, discount: "31% OFF", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=300", category: "Women's Apparel" },
    { id: 29, title: "Stretch Leggings", weight: "Free Size", price: 299, oldPrice: 399, discount: "25% OFF", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=300", category: "Women's Apparel" },
    { id: 30, title: "Dupatta Set (3 pcs)", weight: "Set", price: 350, oldPrice: 500, discount: "30% OFF", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300", category: "Women's Apparel" },
    // Footwear
    { id: 31, title: "Running Sports Shoes", weight: "7/8/9/10", price: 1299, oldPrice: 1799, discount: "28% OFF", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300", category: "Footwear" },
    { id: 32, title: "Casual Sandals", weight: "7/8/9", price: 399, oldPrice: 550, discount: "27% OFF", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=300", category: "Footwear" },
    { id: 33, title: "Comfort Flip Flops", weight: "Free Size", price: 149, oldPrice: 199, discount: "25% OFF", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=300", category: "Footwear" },
];

// Product Card Template
function createProductCard(product) {
    return `
        <div class="product-card">
            <span class="product-badge">${product.discount}</span>
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div class="product-title">${product.title}</div>
            <div class="product-weight">${product.weight}</div>
            <div class="price-block">
                <span class="current-price">₹${product.price}</span>
                <span class="old-price">₹${product.oldPrice}</span>
            </div>
            <button class="add-btn" data-id="${product.id}">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `;
}

// ========================================
// STORE DATA
// ========================================
const stores = [
    { name: "Laxi Mart — Jaipur Main", address: "42 Tonk Road, C-Scheme, Jaipur 302001", city: "Jaipur", state: "Rajasthan", phone: "+91 141-400-1001", hours: "7:00 AM – 10:00 PM" },
    { name: "Laxi Mart — Malviya Nagar", address: "B-12, Malviya Nagar, Jaipur 302017", city: "Jaipur", state: "Rajasthan", phone: "+91 141-400-1002", hours: "7:00 AM – 10:00 PM" },
    { name: "Laxi Mart — Andheri West", address: "Plot 8, Veera Desai Rd, Andheri West, Mumbai 400053", city: "Mumbai", state: "Maharashtra", phone: "+91 22-400-2001", hours: "8:00 AM – 10:00 PM" },
    { name: "Laxi Mart — Wakad", address: "Sr. No. 45, Wakad-Hinjewadi Rd, Pune 411057", city: "Pune", state: "Maharashtra", phone: "+91 20-400-2002", hours: "8:00 AM – 10:00 PM" },
    { name: "Laxi Mart — Satellite", address: "Opp. Iscon Mall, Satellite Rd, Ahmedabad 380015", city: "Ahmedabad", state: "Gujarat", phone: "+91 79-400-3001", hours: "7:30 AM – 10:00 PM" },
    { name: "Laxi Mart — Ring Road", address: "Near Sahara Darwaja, Ring Rd, Surat 395002", city: "Surat", state: "Gujarat", phone: "+91 261-400-3002", hours: "7:30 AM – 10:00 PM" },
    { name: "Laxi Mart — Whitefield", address: "ITPL Main Rd, Whitefield, Bangalore 560066", city: "Bangalore", state: "Karnataka", phone: "+91 80-400-4001", hours: "8:00 AM – 10:00 PM" },
    { name: "Laxi Mart — Madhapur", address: "Cyber Towers Rd, Madhapur, Hyderabad 500081", city: "Hyderabad", state: "Telangana", phone: "+91 40-400-5001", hours: "8:00 AM – 10:00 PM" },
    { name: "Laxi Mart — Anna Nagar", address: "2nd Avenue, Anna Nagar, Chennai 600040", city: "Chennai", state: "Tamil Nadu", phone: "+91 44-400-6001", hours: "8:00 AM – 9:30 PM" },
    { name: "Laxi Mart — Dwarka", address: "Sector 12, Dwarka, New Delhi 110078", city: "Delhi", state: "Delhi NCR", phone: "+91 11-400-7001", hours: "8:00 AM – 10:00 PM" },
    { name: "Laxi Mart — Vijay Nagar", address: "AB Road, Vijay Nagar, Indore 452010", city: "Indore", state: "Madhya Pradesh", phone: "+91 731-400-8001", hours: "8:00 AM – 9:30 PM" },
    { name: "Laxi Mart — Model Town", address: "Ferozepur Road, Model Town, Ludhiana 141002", city: "Ludhiana", state: "Punjab", phone: "+91 161-400-9001", hours: "8:00 AM – 9:30 PM" },
];

// Store Locator Filter
function setupStoreLocator() {
    const stateSelect = document.getElementById('store-state');
    const cityInput = document.getElementById('store-city');
    const searchBtn = document.getElementById('store-search');
    const grid = document.getElementById('store-grid');

    if (!grid) return;

    function renderStores(list) {
        if (list.length === 0) {
            grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#6a6b76;padding:40px;">No stores found matching your search.</p>';
            return;
        }
        grid.innerHTML = list.map(s => `
            <div class="store-card">
                <h3>${s.name}</h3>
                <p><i class="fas fa-map-marker-alt" style="color:#3b9b78;margin-right:6px;"></i>${s.address}</p>
                <p><i class="fas fa-phone" style="color:#3b9b78;margin-right:6px;"></i>${s.phone}</p>
                <p class="store-hours"><i class="fas fa-clock" style="margin-right:6px;"></i>${s.hours}</p>
            </div>
        `).join('');
    }

    renderStores(stores);

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const state = stateSelect ? stateSelect.value : '';
            const city = cityInput ? cityInput.value.trim().toLowerCase() : '';
            const filtered = stores.filter(s => {
                const matchState = !state || s.state === state;
                const matchCity = !city || s.city.toLowerCase().includes(city);
                return matchState && matchCity;
            });
            renderStores(filtered);
        });
    }
}

// Accordion
function setupAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const wasOpen = item.classList.contains('open');
            // Close all in same parent
            item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });
}

// Contact Form Validation
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const message = form.querySelector('[name="message"]');

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert('Please fill in all required fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            alert('Please enter a valid email address.');
            return;
        }
        alert('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
        form.reset();
    });
}

// Category Browse Cards (Product Page)
function setupCategoryBrowse() {
    document.querySelectorAll('.category-browse-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.querySelector('span').textContent;
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('category', cat);
            window.location.search = urlParams.toString();
        });
    });
}

// Category Browse Click (Product Page inline onclick)
function filterByCategory(cat) {
    window.location.href = `product.html?category=${encodeURIComponent(cat)}`;
}

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupSearchToggle();
    setActiveNavLink();
    setupInsightsCarousel();
    setupAccordions();
    setupContactForm();
    setupStoreLocator();
    setupCategoryBrowse();

    const limitedGrid = document.getElementById('limited-products');
    const allProductsGrid = document.getElementById('all-products-grid');
    const cartBadges = document.querySelectorAll('.cart-badge');

    // Cart
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartBadges.forEach(b => b.innerText = cartCount);

    // Render Products
    if (limitedGrid) {
        limitedGrid.innerHTML = products.slice(0, 5).map(p => createProductCard(p)).join('');
    }

    if (allProductsGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFilter = urlParams.get('category');
        const filtered = categoryFilter
            ? products.filter(p => p.category.toLowerCase().includes(categoryFilter.toLowerCase()))
            : products;

        allProductsGrid.innerHTML = filtered.map(p => createProductCard(p)).join('');

        const pageTitle = document.getElementById('page-title');
        if (pageTitle && categoryFilter) {
            pageTitle.innerText = `${categoryFilter}`;
        }
    }

    // Click Handlers
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-btn')) {
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            cartBadges.forEach(b => b.innerText = cartCount);
            const card = e.target.closest('.product-card');
            if (card) {
                const title = card.querySelector('.product-title').innerText;
                alert(`${title} added to cart!`);
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
