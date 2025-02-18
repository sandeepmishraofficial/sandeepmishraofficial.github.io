document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const workItems = document.querySelectorAll('.work-item.hide');

    if (toggleButton) { // Check if the element exists before adding event listener
        let isShowingMore = false;

        toggleButton.addEventListener('click', () => {
            isShowingMore = !isShowingMore;

            workItems.forEach(item => {
                item.style.display = isShowingMore ? 'block' : 'none';
            });

            toggleButton.textContent = isShowingMore ? 'Show Less' : 'Show More';
        });
    }

    // Mobile Menu Toggle
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        document.getElementById('sideMenu')?.addEventListener('click', toggleMenu);
    }

    // Navbar Scroll Effect
    const navBar = document.querySelector('nav');
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (scrollY > 50) {
                navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
            } else {
                navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
            }
        });
    }

    // Theme Toggle
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    document.getElementById('education-button')?.addEventListener('click', () => {
        document.getElementById('education')?.classList.toggle('hidden');
        document.getElementById('technical-skills')?.classList.add('hidden');
    });

    // Skills Section Toggle
    const categoryButtons = document.querySelectorAll('.category-button');
    const skillLists = document.querySelectorAll('.skill-list');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            categoryButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-300', 'text-gray-700');
            });

            skillLists.forEach(list => list.classList.add('hidden'));

            button.classList.add('active', 'bg-blue-500', 'text-white');
            button.classList.remove('bg-gray-300', 'text-gray-700');
            document.querySelector(`.skill-list.${category}`)?.classList.remove('hidden');
        });
    });
});

// Function to Toggle Theme
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// Function to Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu?.classList.toggle('-right-64');
    menu?.classList.toggle('right-0');
}
