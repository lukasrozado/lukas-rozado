window.onload = () => {
    // ===== REDIRECIONAMENTO DE IDIOMA =====
    const userLang = navigator.language || navigator.userLanguage;
    const savedLang = localStorage.getItem("preferredLang");
    const currentURL = window.location.href;

    if (!savedLang) {
        if (userLang.startsWith("en")) {
            localStorage.setItem("preferredLang", "en");
            if (!currentURL.includes("index-en.html")) {
                window.location.href = "index-en.html";
            }
        } else {
            localStorage.setItem("preferredLang", "pt");
            if (!currentURL.includes("index.html")) {
                window.location.href = "index.html";
            }
        }
    } else {
        if (savedLang === "en" && !currentURL.includes("index-en.html")) {
            window.location.href = "index-en.html";
        } else if (savedLang === "pt" && !currentURL.includes("index.html")) {
            window.location.href = "index.html";
        }
    }

    // ===== MENU HAMBURGUER =====
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('header nav ul');
    const mainContent = document.querySelector('main');

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mainContent.classList.remove('navbar-active');
    };

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        mainContent.classList.toggle('navbar-active');
    });

    document.querySelectorAll('header nav ul li a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        const navbar = document.getElementById('navbar');
        if (!navbar.contains(e.target)) {
            closeMenu();
        }
    });

    // ===== SISTEMA DE FILTRAGEM =====
    let activeFilters = [];

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Ativa/desativa filtros
            if(button.dataset.filter === 'all') {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                activeFilters = [];
            } else {
                document.querySelector('.filter-btn[data-filter="all"]').classList.remove('active');
                button.classList.toggle('active');
                
                // Atualiza lista de filtros ativos
                activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
                    .map(btn => btn.dataset.filter)
                    .filter(filter => filter !== 'all');
            }

            // Aplica filtros
            document.querySelectorAll('.project-card').forEach(card => {
                const cardTechs = card.dataset.technologies.split(' ');
                const shouldShow = activeFilters.length === 0 || 
                                 activeFilters.every(filter => cardTechs.includes(filter));
                
                card.classList.toggle('hidden', !shouldShow);
            });

            updateProjectCount();
        });
    });

    // ===== CONTADOR DE PROJETOS =====
    function updateProjectCount() {
        const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)').length;
        const totalProjects = document.querySelectorAll('.project-card').length;
        const countElement = document.getElementById('project-count');
        const language = localStorage.getItem("preferredLang") || 'pt';

        if(countElement) {
            const messages = {
                pt: {
                    showing: `Mostrando ${visibleProjects} de ${totalProjects} projetos`,
                    all: `Mostrando todos os ${totalProjects} projetos`
                },
                en: {
                    showing: `Showing ${visibleProjects} of ${totalProjects} projects`,
                    all: `Showing all ${totalProjects} projects`
                }
            };
            
            countElement.textContent = activeFilters.length > 0
                ? messages[language].showing
                : messages[language].all;
        }
    }

    // ===== PREVENIR INTERAÇÕES INDESEJADAS =====
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if(e.target.closest('.tech-stack, .difficulty')) {
                e.preventDefault();
                window.open(link.href, '_blank');
            }
        });
    });

    // Inicialização
    updateProjectCount();
};