// ============================================
// PORTFOLIO JAVASCRIPT FUNCTIONALITIES
// ============================================

// Active Navigation Link Based on Scroll Position
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Si on est tout en haut, activer le lien "Home"
        if (scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Scroll to Top Button
function initScrollToTop() {
    // Create button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Retour en haut');
    
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Sun icon SVG (shown in dark mode - click to switch to light)
    const sunIcon = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke-width="2" stroke-linecap="round"/>`;
    
    // Moon icon SVG (shown in light mode - click to switch to dark)
    const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        // Update icon: show moon in light mode, sun in dark mode
        themeIcon.innerHTML = theme === 'light' ? moonIcon : sunIcon;
        localStorage.setItem('theme', theme);
    }
    
    // Initialize theme
    applyTheme(savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
}

// Language Toggle Functionality (dictionnaire → i18n.js)
function initLangToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');
    const html = document.documentElement;

    const savedLang = localStorage.getItem('lang') || 'fr';

    function applyTranslations(lang) {
        const t = translations[lang];
        if (!t) return;

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (t[key] != null) el.textContent = t[key];
        });

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            if (t[key] != null) el.innerHTML = t[key];
        });

        document.querySelectorAll('[data-i18n-title]').forEach((el) => {
            const key = el.getAttribute('data-i18n-title');
            if (t[key] != null) el.setAttribute('title', t[key]);
        });

        document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria');
            if (t[key] != null) el.setAttribute('aria-label', t[key]);
        });

        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn && t.scroll_top_aria) {
            scrollBtn.setAttribute('aria-label', t.scroll_top_aria);
        }

        const cvHref = lang === 'en'
            ? 'pdf/English_Paul_Antoine_CV.pdf'
            : 'pdf/CV_Paul_Antoine_PARIS.pdf';
        document.querySelectorAll('[data-cv-link]').forEach((el) => {
            el.setAttribute('href', cvHref);
        });
    }

    function applyLang(lang) {
        html.setAttribute('lang', lang);
        langLabel.textContent = lang === 'fr' ? 'EN' : 'FR';
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
    }

    applyLang(savedLang);

    langToggle.addEventListener('click', () => {
        const currentLang = html.getAttribute('lang') || 'fr';
        applyLang(currentLang === 'fr' ? 'en' : 'fr');
    });
}

// defer → DOM déjà parsé ; appliquer i18n tout de suite (évite écran vide)
initThemeToggle();
initLangToggle();
initActiveNavigation();
initScrollToTop();
