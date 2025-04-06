export function initFilters() {
    let activeFilters = [];

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            if(button.dataset.filter === 'all') {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                activeFilters = [];
            } else {
                document.querySelector('.filter-btn[data-filter="all"]').classList.remove('active');
                button.classList.toggle('active');
                
                activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
                    .map(btn => btn.dataset.filter)
                    .filter(filter => filter !== 'all');
            }

            document.querySelectorAll('.project-card').forEach(card => {
                const cardTechs = card.dataset.technologies.split(' ');
                const shouldShow = activeFilters.length === 0 || 
                                 activeFilters.every(filter => cardTechs.includes(filter));
                
                card.classList.toggle('hidden', !shouldShow);
            });

            updateProjectCount();
        });
    });

    function updateProjectCount() {
        const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)').length;
        const totalProjects = document.querySelectorAll('.project-card').length;
        const countElement = document.getElementById('project-count');
        const isEnglishPage = window.location.pathname.includes('index-en.html');
const language = isEnglishPage ? 'en' : 'pt';

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

    // Inicialização
    updateProjectCount();
}