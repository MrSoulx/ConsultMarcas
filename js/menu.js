// Función para inicializar el menú
function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (!menuToggle || !navMenu) {
        console.error('Menu toggle or nav menu element not found');
        return;
    }

    // Función para abrir/cerrar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Event listener para el botón del menú
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !menuToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            toggleMenu();
        }
    });

    // Cerrar menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Inicializar el menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initMenu);

// Exportar la función para uso como módulo
export { initMenu };
