console.log("Carousel script loaded");
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
document.addEventListener("DOMContentLoaded", function() {
    initBrandCarousel('carousel-track');
    initBrandCarousel('carousel-track-references');
    initBrandCarousel('carousel-track-personal-story');
});

function initBrandCarousel(trackId) {
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
    // Shuffle the brandLogos array
    for (let i = brandLogos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [brandLogos[i], brandLogos[j]] = [brandLogos[j], brandLogos[i]];
    }
    const track = document.getElementById(trackId);
    if (!track) return;

    function buildLogoSet() {
        const fragment = document.createDocumentFragment();
        brandLogos.forEach(src => {
            const div = document.createElement('div');
            div.className = 'carousel-item';
            const img = document.createElement('img');
            img.src = `files/Brands/${src}`;
            img.alt = src.replace(/[-_]/g, ' ').replace(/\..+$/, '');
            img.setAttribute('draggable', 'false');
            fragment.appendChild(div);
            div.appendChild(img);
        });
        return fragment;
    }

    function setupCarousel() {
        track.innerHTML = '';
        track.appendChild(buildLogoSet());
        track.appendChild(buildLogoSet());
        setTimeout(updateAnimation, 50);
    }

    function updateAnimation() {
        const prevStyle = document.getElementById('carousel-anim-style-' + trackId);
        if (prevStyle) prevStyle.remove();
        const items = track.querySelectorAll('.carousel-item');
        const setLength = items.length / 2;
        let setWidth = 0;
        for (let i = 0; i < setLength; i++) {
            setWidth += items[i].offsetWidth;
        }
        track.style.width = (setWidth * 2) + 'px';
        const duration = Math.max(30, setWidth / 50);
        track.style.animation = `carousel-scroll-${trackId} ${duration}s linear infinite`;
        const style = document.createElement('style');
        style.id = 'carousel-anim-style-' + trackId;
        style.innerHTML = `@keyframes carousel-scroll-${trackId} { 0% { transform: translateX(0); } 100% { transform: translateX(-${setWidth}px); } }`;
        document.head.appendChild(style);
    }

    const carousel = track.closest('.carousel');
    if (carousel && track) {
        carousel.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        carousel.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }
    window.addEventListener('resize', () => setTimeout(updateAnimation, 100));
    setupCarousel();
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
    // Add each logo 4 times for a seamless infinite effect
    const DUPLICATES = 4;
    for (let d = 0; d < DUPLICATES; d++) {
        brandLogos.forEach(src => {
            const img = document.createElement('img');
            img.src = `files/Brands/${src}`;
            img.alt = src.replace(/[-_]/g, ' ').replace(/\..+$/, '');
            img.className = 'brand-logo';
            img.setAttribute('draggable', 'false');
            carousel.appendChild(img);
        });
    }

    let speed = 2; // px per frame (increased for visibility)
    let paused = false;
    let userScrolling = false;
    let scrollTimeout = null;
    let lastScrollLeft = 0;

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
        scrollTimeout = setTimeout(() => paused = false, 1500);
    });
    carousel.addEventListener('touchend', () => {
        userScrolling = false;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => paused = false, 1500);
    });
    carousel.addEventListener('scroll', () => {
        // If scrollLeft changed by user, pause auto-scroll
        if (carousel.scrollLeft !== lastScrollLeft) {
            paused = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => paused = false, 1500);
            lastScrollLeft = carousel.scrollLeft;
        }
    });

    function getGap() {
        // Fallback to 40px if gap is not set or is NaN
        const gap = parseInt(getComputedStyle(carousel).gap);
        return isNaN(gap) ? 40 : gap;
    }

    function animate() {
        if (!paused) {
            carousel.scrollLeft += speed;
            // If the first logo is out of view, move it to the end
            let firstLogo = carousel.querySelector('.brand-logo');
            if (firstLogo) {
                const firstRect = firstLogo.getBoundingClientRect();
                const carouselRect = carousel.getBoundingClientRect();
                if (firstRect.right < carouselRect.left + 1) { // +1 for subpixel
                    const width = firstLogo.offsetWidth + getGap();
                    carousel.appendChild(firstLogo);
                    // Adjust scrollLeft so the movement is seamless
                    carousel.scrollLeft -= width;
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

// ========== CONFETTI ON RESULTS SECTION VIEW ==========
(function() {
  // Load canvas-confetti from CDN if not present
  function loadConfettiScript(callback) {
    if (window.confetti) return callback();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  function fireConfetti() {
    if (!window.confetti) return;
    // Left side
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.2 },
      colors: ['#a259ff', '#fff', '#7f3cff', '#f7c1ff', '#e0e0e0']
    });
    // Right side
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.2 },
      colors: ['#a259ff', '#fff', '#7f3cff', '#f7c1ff', '#e0e0e0']
    });
  }

  function setupConfettiObserver() {
    const resultsSection = document.querySelector('.results-section');
    if (!resultsSection) return;
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fireConfetti();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(resultsSection);
  }

  loadConfettiScript(setupConfettiObserver);
})();

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.querySelector('.contact-popup-btn');
  if (btn) {
    btn.addEventListener('click', function() {
      alert("Hey, if you want to contact me - just do it! You can send me a quick text on WhatsApp, make a call anytime or pop over an email. :)");
    });
  }
});

// === Personal Story Scroll Appear Effect ===
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.personal-story-section');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));
}); 