document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navBar = document.getElementById('main-nav');
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (scrollY > 50) {
                navBar.classList.add('bg-[#0d1117]/50', 'backdrop-blur-lg', 'shadow-sm', 'border-b', 'border-white/5');
                navBar.classList.remove('bg-transparent');
            } else {
                navBar.classList.remove('bg-[#0d1117]/50', 'backdrop-blur-lg', 'shadow-sm', 'border-b', 'border-white/5');
                navBar.classList.add('bg-transparent');
            }
        });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('[onclick="toggleMenu()"]');
        if (menu && !menu.contains(e.target) && !hamburger?.contains(e.target)) {
            menu.classList.add('-right-72');
            menu.classList.remove('right-0');
        }
    });
});

// Function to Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu?.classList.toggle('-right-72');
    menu?.classList.toggle('right-0');
}

// Function to Toggle Theme (kept for compatibility)
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
}
