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
        'brand-collab-17.png'
    ];
    const carousel = document.getElementById('brand-carousel');
    if (carousel) {
        // Add each logo once
        brandLogos.forEach(src => {
            const img = document.createElement('img');
            img.src = `files/Brands/${src}`;
            img.alt = src.replace(/[-_]/g, ' ').replace(/\..+$/, '');
            img.className = 'brand-logo';
            carousel.appendChild(img);
        });

        // Duplicate logos until the carousel is at least 2x the width of the visible area
        function fillCarousel() {
            const outer = document.querySelector('.brand-carousel-outer');
            if (!outer) return;
            let totalWidth = carousel.scrollWidth;
            const minWidth = outer.offsetWidth * 2;
            let i = 0;
            while (totalWidth < minWidth) {
                const src = brandLogos[i % brandLogos.length];
                const img = document.createElement('img');
                img.src = `files/Brands/${src}`;
                img.alt = src.replace(/[-_]/g, ' ').replace(/\..+$/, '');
                img.className = 'brand-logo';
                carousel.appendChild(img);
                totalWidth = carousel.scrollWidth;
                i++;
            }
        }
        fillCarousel();

        let speed = 0.5; // px per frame (adjust for slower/faster)
        let paused = false;

        // Pause on hover
        const outer = document.querySelector('.brand-carousel-outer');
        outer.addEventListener('mouseenter', () => paused = true);
        outer.addEventListener('mouseleave', () => paused = false);

        function animate() {
            if (!paused) {
                carousel.scrollLeft += speed;
                // If the first logo is out of view, move it to the end
                const firstLogo = carousel.querySelector('.brand-logo');
                if (firstLogo) {
                    const firstRect = firstLogo.getBoundingClientRect();
                    const carouselRect = carousel.getBoundingClientRect();
                    if (firstRect.right < carouselRect.left) {
                        carousel.appendChild(firstLogo);
                        carousel.scrollLeft -= firstLogo.offsetWidth + 40; // 40 = gap
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        carousel.style.overflowX = 'hidden';
        carousel.scrollLeft = 0;
        requestAnimationFrame(animate);

        // Refill carousel on window resize
        window.addEventListener('resize', () => {
            // Remove all logos except the first set
            while (carousel.children.length > brandLogos.length) {
                carousel.removeChild(carousel.lastChild);
            }
            fillCarousel();
        });
    }
})(); 