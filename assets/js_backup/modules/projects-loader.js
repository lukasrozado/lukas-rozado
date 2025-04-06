// assets/js/modules/projects-loader.js
export async function loadProjects() {
    try {
        if (!document.querySelector('.projects-grid')) return;
        const lang = window.location.pathname.includes('index-en.html') ? 'en' : 'pt';
        
        const response = await fetch(`./data/projects/${lang}.json`);
        const data = await response.json();
        
        const grid = document.querySelector('.projects-grid');
        grid.innerHTML = '';

        data.projects.forEach(project => {
            const cardHTML = `
                <article class="project-card" 
                         data-technologies="${project.technologies.join(' ')}" 
                         data-difficulty="${project.difficulty}">
                    <div class="card-content-wrapper">
                        <a href="${project.githubLink}" target="_blank" class="project-link">
                            <div class="card-header">
                                <span class="project-tag">${project.category}</span>
                                <div class="difficulty">
                                    <span class="difficulty-dot ${project.difficulty}"></span>
                                    <span class="difficulty-text">${project.difficulty}</span>
                                </div>
                            </div>
                            
                            <div class="card-content">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                            </div>
            
                            <div class="card-footer">
                                <div class="tech-stack">
                                    ${project.techIcons.map(icon => `
                                        <img src="assets/icons/${icon}.svg" alt="${icon}" class="tech-icon">
                                    `).join('')}
                                </div>
                                <span class="project-duration">${project.duration}</span>
                            </div>
                        </a>
                    </div>
                </article>
            `;
            
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('project-count').textContent = 
            window.location.pathname.includes('index-en.html') 
            ? 'Error loading projects' 
            : 'Erro ao carregar projetos';
    }
}