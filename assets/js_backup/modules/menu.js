export function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('header nav ul');

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    };

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
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
}