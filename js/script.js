// ========== SMOOTH SCROLL NAVIGATION ==========
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== DROPDOWN MENU INTERACTION ==========
const dropdown = document.querySelector('.dropdown');
const toggle = document.querySelector('.dropdown-toggle');
const menu = document.querySelector('.dropdown-menu');

if (dropdown && toggle && menu) {
    // Open on click
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', dropdown.classList.contains('open'));
    });
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ========== BRAND LOGO CAROUSEL TRUE INFINITE SCROLL ==========
(function() {
    const brandLogos = [
        'brand-collab-1.png',
        'brand-collab-2.png',
        'brand-collab-3.png',
        'brand-collab-4.png',
        'brand-collab-5.jpeg',
        'brand-collab-6.png',
        'brand-collab-7.png',
        'brand-collab-8.webp',
        'brand-collab-9.png',
        'brand-collab-10.png',
        'brand-collab-11.png',
        'brand-collab-12.png',
        'brand-collab-13.png',
        'brand-collab-14.jpeg',
        'brand-collab-15.png',
        'brand-collab-16.png',
        'brand-collab-17.png',
        'brand-collab-18.png',
        'brand-collab-19.png'
    ];
    const carousel = document.getElementById('brand-carousel');
    if (!carousel) return;

    // Clear carousel
    carousel.innerHTML = '';
    // Add each logo 3 times for a seamless infinite effect
    const DUPLICATES = 3;
    for (let d = 0; d < DUPLICATES; d++) {
        brandLogos.forEach(src => {
            const img = document.createElement('img');
            img.src = `files/Brands/${src}`;
            img.alt = src.replace(/[-_]/g, ' ').replace(/\..+$/, '');
            img.className = 'brand-logo';
            carousel.appendChild(img);
        });
    }

    let speed = 0.5; // px per frame
    let paused = false;
    let userScrolling = false;
    let scrollTimeout = null;

    // Pause on hover
    const outer = document.querySelector('.brand-carousel-outer');
    if (outer) {
        outer.addEventListener('mouseenter', () => paused = true);
        outer.addEventListener('mouseleave', () => paused = false);
    }
    // Pause on user scroll (mouse or touch)
    carousel.addEventListener('mousedown', () => {
        userScrolling = true;
        paused = true;
    });
    carousel.addEventListener('touchstart', () => {
        userScrolling = true;
        paused = true;
    });
    carousel.addEventListener('mouseup', () => {
        userScrolling = false;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => paused = false, 1000);
    });
    carousel.addEventListener('touchend', () => {
        userScrolling = false;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => paused = false, 1000);
    });
    carousel.addEventListener('scroll', () => {
        if (!userScrolling) {
            paused = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => paused = false, 1000);
        }
    });

    function animate() {
        if (!paused) {
            carousel.scrollLeft += speed;
            // If the first logo is out of view, move it to the end
            const firstLogo = carousel.querySelector('.brand-logo');
            if (firstLogo) {
                const firstRect = firstLogo.getBoundingClientRect();
                const carouselRect = carousel.getBoundingClientRect();
                if (firstRect.right < carouselRect.left + 1) { // +1 for subpixel
                    carousel.appendChild(firstLogo);
                    // Adjust scrollLeft so the movement is seamless
                    carousel.scrollLeft -= firstLogo.offsetWidth + parseInt(getComputedStyle(carousel).gap || 0);
                }
            }
        }
        requestAnimationFrame(animate);
    }

    carousel.style.overflowX = 'auto';
    carousel.scrollLeft = 0;
    requestAnimationFrame(animate);

    // On resize, do nothing (fixed duplicates)
})(); 