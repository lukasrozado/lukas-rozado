// assets/js/main.js
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Inicializa sistema de idiomas
    const { initLanguageSystem } = await import('./modules/language.js');
    initLanguageSystem();

    // 2. Carrega componentes do idioma correto
    const loadComponents = async () => {
        const lang = window.location.pathname.includes('index-en.html') ? 'en' : 'pt';
        const components = ['footer'];
        
        for (const component of components) {
            try {
                const element = document.querySelector(`[data-include="./components/${lang}/${component}.html"]`);
                if (!element) {
                    console.warn(`Elemento não encontrado para: ${component}`);
                    continue;
                }
                
                const response = await fetch(`./components/${lang}/${component}.html`);
                if (!response.ok) throw new Error(`${component} não encontrado`);
                const html = await response.text();
                element.innerHTML = html; // INSIRA ESTA LINHA
                
            } catch (error) {
                console.error(`Error loading ${component}:`, error);
            }
        }
    };

    // 3. Carrega projetos
    const loadDynamicContent = async () => {
        try {
            const { loadProjects } = await import('./modules/projects-loader.js');
            await loadProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    // 4. Inicializa módulos interativos
    const initInteractiveModules = async () => {
        try {
            const { initMenu } = await import('./modules/menu.js');
            const { initFilters } = await import('./modules/filters.js');
            
            initMenu();
            initFilters();
        } catch (error) {
            console.error('Error initializing modules:', error);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const content = document.body.innerText.toLowerCase();
        const keywords = {
            pt: ['python', 'dados', 'machine learning', 'análise', 'dashboard'],
            en: ['python', 'data', 'machine learning', 'analysis', 'visualization']
        };
        
        const lang = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
        const report = keywords[lang].map(kw => ({
            keyword: kw,
            count: content.match(new RegExp(kw, 'gi'))?.length || 0
        }));
        
        console.table(report);
    });

    // Fluxo principal
    try {
        await loadComponents();
        await loadDynamicContent();
        await initInteractiveModules();
    } catch (error) {
        console.error('Critical error:', error);
        document.body.innerHTML = `
            <div style="color: red; padding: 20px;">
                ${window.location.pathname.includes('index-en.html') 
                    ? 'Critical error: Please reload the page' 
                    : 'Erro crítico: Recarregue a página'}
            </div>
        `;
    }
}

);