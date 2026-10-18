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

// Language Toggle Functionality
const translations = {
    fr: {
        theme_title: 'Basculer le thème',
        theme_aria: 'Basculer entre thème clair et sombre',
        lang_title: 'Choisir la langue',
        lang_aria: 'Basculer entre français et anglais',
        nav_home: 'Accueil',
        nav_education: 'Formation',
        nav_experience: 'Expérience',
        nav_projects: 'Projets',
        hero_subtitle: 'Étudiant en informatique',
        section_education: 'Formation',
        section_experience: 'Expérience',
        section_projects: 'Projets',
        edu_mines_title: 'Ingénieur Civil des Mines',
        edu_mines_date: 'Sept 2023 - Présent',
        edu_mines_desc: 'Ingénieur Civil des Mines Nancy<br>(Spécialité Informatique)',
        edu_mines_location: 'Nancy, France',
        edu_mines_courses: 'Cours : Algorithmique, Structures de données, Apprentissage automatique, Ingénierie logicielle',
        edu_cpge_title: 'CPGE TSI',
        edu_cpge_date: 'Sept 2020 - Juin 2023',
        edu_cpge_desc: 'Classe Préparatoire aux Grandes Écoles<br>(Filière Technologie et Sciences Industrielles)',
        edu_cpge_location: 'Clermont-Ferrand, France',
        edu_cpge_courses: "Cours : Informatique, Mathématiques, Physique, Sciences de l'ingénieur",
        exp_orange_title: 'Développeur Junior',
        exp_orange_date: 'Juin 2026 - Déc 2026',
        exp_orange_desc: 'Stage dans une équipe de 20 développeurs chez Orange pour la boutique.orange.fr',
        exp_orange_b1: "Intégration de l'IA agentique dans le cycle de delivery d'une équipe de 4 dev.",
        exp_orange_b2: "Cadrage d'agents, gouvernance du contexte et de l'architecture puis industrialisation des refactors/modernisations",
        exp_orange_b3: 'Participation aux évolutions fonctionnelles en complément de la résorption de la dette technique',
        exp_cartel_title: 'Responsable Partenariats',
        exp_cartel_date: 'Avril 2025 - Avril 2026',
        exp_cartel_desc: 'Coordination et gestion du pôle partenariats pour l\'événement "Cartel 2026" à Nancy.',
        exp_cartel_b1: 'Recherche, prospection et négociation de partenariats avec des entreprises locales et nationales',
        exp_cartel_b2: 'Suivi des relations avec les partenaires, élaboration de supports de communication dédiés',
        exp_cartel_b3: 'Rédaction et mise en place des contrats de sponsoring',
        exp_raid_title: 'Responsable Partenariats',
        exp_raid_date: 'Septembre 2024 - Juin 2025',
        exp_raid_desc: 'Coordination et gestion du pôle partenariats du "Raid Mines Nancy" en 2025.',
        exp_raid_b1: 'Recherche et prospection de partenariats avec entreprises et institutions locales',
        exp_raid_b2: 'Suivi des relations avec les partenaires',
        exp_raid_b3: "Gestion d'une équipe de 3 membres.",
        exp_raid_b4: 'Rédaction et mise en place des contrats de sponsoring',
        tag_agentic_ai: 'IA agentique',
        tag_communication: 'Communication',
        tag_partnerships: 'Partenariats',
        tag_administration: 'Administration',
        tag_team_mgmt: "Gestion d'équipe",
        proj_cartel_desc: 'Application mobile officielle pour l\'événement "Cartel 2026" à Nancy, permettant aux 2300+ participants de naviguer parmi les événements.',
        proj_cartel_b1: 'Application React/TypeScript avec Capacitor pour Android et iOS',
        proj_cartel_b2: 'Trois sections clés : Accueil, Map et Info',
        proj_cartel_b3: 'Chat temps réel avec notifications push',
        proj_cartel_b4: 'Système de paris sportifs avec gestion de points',
        proj_cummap_desc: "Application web interactive, client web de l'application officielle du Cartel Nancy 2026.",
        proj_cummap_b1: 'Carte interactive avec géolocalisation et marqueurs personnalisés',
        proj_cummap_b2: 'Gestion des événements avec filtres avancés et calendrier interactif',
        proj_cummap_b3: 'Mode administrateur avec édition des lieux, matchs et messages',
        proj_cummap_b4: "Synchronisation en temps réel avec l'application mobile officielle",
        proj_img_desc: "Application JavaFX de traitement d'image et dessin développée en équipe.",
        proj_img_b1: 'Opérations géométriques (symétries, rotations, crop) et effets avancés',
        proj_img_b2: 'Effet mosaïque utilisant un KdTree pour optimisation des performances',
        proj_img_b3: 'Seam Carving pour redimensionnement intelligent des images',
        proj_img_b4: 'Undo/Redo, zoom, navigation et raccourcis clavier',
        proj_andra_title: 'Robotique ANDRA',
        proj_andra_desc: "Projet industriel avec l'ANDRA : robotique et IA pour l'exploration autonome des galeries souterraines et la détection de fissures.",
        proj_andra_b1: 'Détection de fissures avec YOLOv11 entraîné sur un dataset spécifique aux galeries',
        proj_andra_b2: 'Navigation autonome avec ROS2 (Humble) et localisation AMCL sur cartes préétablies',
        proj_andra_b3: 'Intégration de multiples capteurs (ZED2, LiDAR 2D, caméra PTZ, caméra 360°)',
        proj_andra_b4: "Robot Agilex Scout Mini équipé d'une Jetson Orin Nano pour traitement embarqué",
        proj_yolo_desc: "Analyseur d'images et vidéos utilisant YOLOv8/YOLOv11 avec PyTorch pour la détection, classification et segmentation d'objets sur plusieurs datasets.",
        proj_yolo_b1: 'Support de multiples datasets (COCO 80 classes, Open Images V7 600 classes)',
        proj_yolo_b2: "Détection et segmentation d'objets en temps réel sur images et vidéos",
        proj_yolo_b3: 'Entraînement de modèles personnalisés avec Docker (ARM64, AMD64, GPU)',
        proj_mines_title: 'Démineur Android',
        proj_mines_desc: 'Jeu du Démineur pour Android.',
        proj_mines_b1: 'Trois niveaux de difficulté (Facile 9x9, Moyen 16x16, Difficile 20x20)',
        proj_mines_b2: 'Premier clic toujours sûr et révélation automatique des cases vides adjacentes',
        proj_mines_b3: 'Pose de drapeaux par appui long et chronomètre intégré',
        proj_mines_b4: 'Système de records avec affichage du meilleur temps pour chaque difficulté',
        proj_trivial_desc: 'Application Android recréant le célèbre jeu de société Trivial Pursuit.',
        proj_trivial_b1: "Mode jeu classique avec jusqu'à 6 joueurs et mode entraînement",
        proj_trivial_b2: '6 catégories (Géographie, Histoire, Divertissement, Art et Littérature, Sciences et Nature, Sports et Loisirs)',
        proj_trivial_b3: '20 questions par catégorie avec système de score et suivi des progrès',
        proj_trivial_b4: 'Tolérance aux réponses avec acceptation des variations orthographiques',
        proj_boids_title: "Simulation de Nuée d'Oiseaux",
        proj_boids_desc: "Simulation interactive de vol d'oiseaux en nuée implémentée en Java.",
        proj_boids_b1: 'Implémentation des trois règles de Boids : Séparation, Alignement et Cohésion',
        proj_boids_b2: "Génération procédurale de terrain avec l'algorithme de Perlin Noise",
        proj_boids_b3: 'Interface graphique interactive avec modification des paramètres en temps réel',
        proj_boids_b4: 'Système de quadrillage optimisé pour la détection des voisins',
        proj_traffic_title: 'Simulation de Trafic Routier',
        proj_traffic_desc: "Simulation de trafic routier développée en Python dans le cadre d'un TIPE.",
        proj_traffic_b1: 'Simulation de 1, 2 ou 4 carrefours interconnectés',
        proj_traffic_b2: 'Gestion de différents types de véhicules (voitures, bus, camions, motos)',
        proj_traffic_b3: 'Deux modes de fonctionnement des feux de circulation',
        proj_traffic_b4: 'Interface graphique interactive avec Pygame et analyse en temps réel',
        scroll_top_aria: 'Retour en haut'
    },
    en: {
        theme_title: 'Toggle theme',
        theme_aria: 'Switch between light and dark theme',
        lang_title: 'Choose language',
        lang_aria: 'Switch between French and English',
        nav_home: 'Home',
        nav_education: 'Education',
        nav_experience: 'Experience',
        nav_projects: 'Projects',
        hero_subtitle: 'Computer Science Student',
        section_education: 'Education',
        section_experience: 'Experience',
        section_projects: 'Projects',
        edu_mines_title: "Engineering Master's Degree Equivalent",
        edu_mines_date: 'Sept 2023 - Present',
        edu_mines_desc: 'Mines de Nancy<br>(Computer Science Department)',
        edu_mines_location: 'Nancy, France',
        edu_mines_courses: 'Algorithms, Data Science, Machine Learning, Robotics, Embedded Systems, Software Engineering',
        edu_cpge_title: 'Undergraduate Program',
        edu_cpge_date: 'Sept 2020 - June 2023',
        edu_cpge_desc: 'Lycée Lafayette<br>(Intensive preparatory program)',
        edu_cpge_location: 'Clermont-Ferrand, France',
        edu_cpge_courses: 'Mathematics, Physics, Programming and Engineering Science',
        exp_orange_title: 'Junior Developer',
        exp_orange_date: 'June 2026 – Dec 2026',
        exp_orange_desc: "Internship at Orange on the editorial platform behind Orange's e-commerce content.",
        exp_orange_b1: "Brought agentic AI into day-to-day delivery on an internal editorial platform powering Orange's e-commerce content.",
        exp_orange_b2: 'Set up agent workflows and shared project context so the team could use coding agents more reliably on features, refactors, and tech-debt cleanup.',
        exp_orange_b3: 'Worked alongside feature delivery while reducing technical debt on the platform.',
        exp_cartel_title: 'Partnerships Lead',
        exp_cartel_date: 'April 2025 – April 2026',
        exp_cartel_desc: 'Led partnerships for the Cartel 2026 student sports event in Nancy.',
        exp_cartel_b1: 'Prospected and negotiated sponsorships with local and national companies',
        exp_cartel_b2: 'Managed partner relationships and produced dedicated communication materials',
        exp_cartel_b3: 'Drafted and put sponsorship contracts in place',
        exp_raid_title: 'Partnerships Lead',
        exp_raid_date: 'September 2024 – June 2025',
        exp_raid_desc: 'Led partnerships for the Raid Mines Nancy 2025.',
        exp_raid_b1: 'Prospected partnerships with local companies and institutions',
        exp_raid_b2: 'Followed up with partners throughout the event lifecycle',
        exp_raid_b3: 'Led a team of 3.',
        exp_raid_b4: 'Drafted and put sponsorship contracts in place',
        tag_agentic_ai: 'Agentic AI',
        tag_communication: 'Communication',
        tag_partnerships: 'Partnerships',
        tag_administration: 'Administration',
        tag_team_mgmt: 'Team management',
        proj_cartel_desc: 'Official event app for Cartel Nancy 2026 — designed, shipped and maintained end to end for 2,300 participants (Android & iOS).',
        proj_cartel_b1: 'React/TypeScript app with Capacitor for Android and iOS',
        proj_cartel_b2: 'Key sections: Home, Map and Info',
        proj_cartel_b3: 'Real-time chat with push notifications',
        proj_cartel_b4: 'Sports betting system with points management',
        proj_cummap_desc: 'Interactive web client of the official Cartel Nancy 2026 app.',
        proj_cummap_b1: 'Interactive map with geolocation and custom markers',
        proj_cummap_b2: 'Events with advanced filters and an interactive calendar',
        proj_cummap_b3: 'Admin tools to edit places, matches and messages',
        proj_cummap_b4: 'Real-time sync with the official mobile app',
        proj_img_desc: 'JavaFX image processing and drawing app, built as a team project.',
        proj_img_b1: 'Geometric transforms (mirrors, rotations, crop) and advanced effects',
        proj_img_b2: 'Mosaic effect backed by a KdTree for performance',
        proj_img_b3: 'Seam carving for content-aware resizing',
        proj_img_b4: 'Undo/redo, zoom, navigation and keyboard shortcuts',
        proj_andra_title: 'Robotics & Computer Vision — ANDRA',
        proj_andra_desc: 'YOLO-based crack detection for nuclear waste storage tunnels, running on an Agilex Scout Mini robot.',
        proj_andra_b1: 'Built a YOLO-based crack detection pipeline trained on a gallery-specific dataset',
        proj_andra_b2: 'Autonomous navigation with ROS2 (Humble) and AMCL on prebuilt maps',
        proj_andra_b3: 'Multi-sensor setup (ZED2, 2D LiDAR, PTZ camera, 360° camera)',
        proj_andra_b4: 'Agilex Scout Mini with Jetson Orin Nano for onboard processing',
        proj_yolo_desc: 'Image and video analyzer with YOLOv8/YOLOv11 and PyTorch — detection, classification and segmentation across multiple datasets.',
        proj_yolo_b1: 'Multiple datasets supported (COCO 80 classes, Open Images V7 600 classes)',
        proj_yolo_b2: 'Real-time detection and segmentation on images and video',
        proj_yolo_b3: 'Custom model training with Docker (ARM64, AMD64, GPU)',
        proj_mines_title: 'Minesweeper Android',
        proj_mines_desc: 'Classic Minesweeper for Android.',
        proj_mines_b1: 'Three difficulties (Easy 9×9, Medium 16×16, Hard 20×20)',
        proj_mines_b2: 'Safe first click and auto-reveal of adjacent empty cells',
        proj_mines_b3: 'Long-press to flag cells, with a built-in timer',
        proj_mines_b4: 'High scores with best time per difficulty',
        proj_trivial_desc: 'Android remake of the classic Trivial Pursuit board game.',
        proj_trivial_b1: 'Classic mode for up to 6 players, plus a training mode',
        proj_trivial_b2: '6 categories (Geography, History, Entertainment, Art & Literature, Science & Nature, Sports & Leisure)',
        proj_trivial_b3: '20 questions per category with scoring and progress tracking',
        proj_trivial_b4: 'Fuzzy answer matching that tolerates spelling variants',
        proj_boids_title: 'Bird Flocking Simulation',
        proj_boids_desc: 'Interactive Boids flocking simulation in Java.',
        proj_boids_b1: 'Three Boids rules: Separation, Alignment and Cohesion',
        proj_boids_b2: 'Procedural terrain via Perlin Noise',
        proj_boids_b3: 'Interactive UI to tweak parameters in real time',
        proj_boids_b4: 'Grid-based neighbor search for performance',
        proj_traffic_title: 'Road Traffic Simulation',
        proj_traffic_desc: 'Python traffic simulation built for a TIPE research project.',
        proj_traffic_b1: '1, 2 or 4 interconnected intersections',
        proj_traffic_b2: 'Multiple vehicle types (cars, buses, trucks, motorcycles)',
        proj_traffic_b3: 'Two traffic-light control modes',
        proj_traffic_b4: 'Interactive Pygame UI with live analysis',
        scroll_top_aria: 'Back to top'
    }
};

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

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLangToggle();
    initActiveNavigation();
    initScrollToTop();
});
