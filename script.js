// Mobile Drawer Toggle Logic
function setupMobileMenu() {
    const openDrawerBtn = document.getElementById('open-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');

    if (openDrawerBtn && closeDrawerBtn && drawer && overlay) {
        const toggleDrawer = (active) => {
            if (active) {
                drawer.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                drawer.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        openDrawerBtn.onclick = (e) => {
            e.preventDefault();
            toggleDrawer(true);
        };
        closeDrawerBtn.onclick = (e) => {
            e.preventDefault();
            toggleDrawer(false);
        };
        overlay.onclick = () => toggleDrawer(false);
    }
}

const products = [
    { id: 1, title: "Fresh Organic Broccoli", weight: "500g", price: 120, oldPrice: 150, discount: "20% OFF", image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=300", category: "Vegetables" },
    { id: 2, title: "Red Gala Apples", weight: "1kg", price: 180, oldPrice: 220, discount: "18% OFF", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&q=80&w=300", category: "Fruits" },
    { id: 3, title: "Fresh Farm Chicken", weight: "1kg", price: 240, oldPrice: 280, discount: "14% OFF", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=300", category: "Meat" },
    { id: 4, title: "Amul Taaza Toned Milk", weight: "1L", price: 54, oldPrice: 56, discount: "4% OFF", image: "https://images.unsplash.com/photo-1563636619-e91000f21fca?auto=format&fit=crop&q=80&w=300", category: "Dairy" },
    { id: 5, title: "Fresh Rohu Fish", weight: "500g", price: 190, oldPrice: 210, discount: "10% OFF", image: "https://images.unsplash.com/photo-1534604973900-c41ab4c5d4b0?auto=format&fit=crop&q=80&w=300", category: "Seafood" },
    { id: 6, title: "Organic Carrots", weight: "500g", price: 40, oldPrice: 60, discount: "33% OFF", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=300", category: "Vegetables" },
    { id: 7, title: "Fresh Strawberries", weight: "250g", price: 150, oldPrice: 200, discount: "25% OFF", image: "https://images.unsplash.com/photo-1464960350295-99573839bc2c?auto=format&fit=crop&q=80&w=300", category: "Fruits" },
    { id: 8, title: "Brown Eggs (Dozen)", weight: "12 units", price: 90, oldPrice: 110, discount: "18% OFF", image: "https://images.unsplash.com/photo-1582722872445-44ad5c78a9dd?auto=format&fit=crop&q=80&w=300", category: "Dairy" }
];

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

function setupSearchToggle() {
    const toggleBtn = document.querySelector('.nav-search-toggle');
    const searchBar = document.getElementById('nav-search-bar');
    const closeBtn = document.querySelector('.nav-search-close');

    if (toggleBtn && searchBar) {
        toggleBtn.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchBar.querySelector('input').focus();
            }
        });
    }
    if (closeBtn && searchBar) {
        closeBtn.addEventListener('click', () => {
            searchBar.classList.remove('active');
        });
    }
}

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

    function getScrollIndex() {
        const cardWidth = cards[0].offsetWidth + 24;
        return Math.round(wrapper.scrollLeft / cardWidth);
    }

    function updateCounter() {
        if (currentEl) currentEl.textContent = getScrollIndex() + 1;
        prevBtn.disabled = wrapper.scrollLeft <= 10;
        nextBtn.disabled = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 10;
    }

    nextBtn.addEventListener('click', () => {
        const cardWidth = cards[0].offsetWidth + 24;
        wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = cards[0].offsetWidth + 24;
        wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    wrapper.addEventListener('scroll', updateCounter);
    updateCounter();
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupSearchToggle();
    setupInsightsCarousel();

    const limitedGrid = document.getElementById('limited-products');
    const allProductsGrid = document.getElementById('all-products-grid');
    const cartCounter = document.querySelector('.cart-badge');

    // Load Cart Count
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    if (cartCounter) cartCounter.innerText = cartCount;

    // Render Limited Products (Home Page)
    if (limitedGrid) {
        limitedGrid.innerHTML = products.slice(0, 5).map(p => createProductCard(p)).join('');
    }

    // Render All Products (Product Page)
    if (allProductsGrid) {
        allProductsGrid.innerHTML = products.map(p => createProductCard(p)).join('');
    }

    // Click Handlers for Buttons
    document.addEventListener('click', (e) => {
        // Add to Cart
        if (e.target.closest('.add-btn')) {
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            if (cartCounter) cartCounter.innerText = cartCount;
            const title = e.target.closest('.product-card').querySelector('.product-title').innerText;
            alert(`${title} added to cart!`);
        }

        // Shop Now / View All Navigation
        if (e.target.innerText === 'Shop Now' || e.target.innerText === 'View All') {
            window.location.href = 'product.html';
        }

        // Category Cards Filtering (Simulated)
        if (e.target.closest('.category-card')) {
            const category = e.target.closest('.category-card').querySelector('h4').innerText;
            window.location.href = `product.html?category=${category}`;
        }
    });

    // Handle Category Filtering on Product Page
    if (allProductsGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFilter = urlParams.get('category');
        if (categoryFilter) {
            const filtered = products.filter(p => p.category.toLowerCase().includes(categoryFilter.toLowerCase()));
            allProductsGrid.innerHTML = filtered.map(p => createProductCard(p)).join('');
            document.getElementById('page-title').innerText = `${categoryFilter} Products`;
        }
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
