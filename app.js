const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul');




document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const workItems = document.querySelectorAll('.work-item.hide');

    let isShowingMore = false; // Track whether items are shown or hidden

    toggleButton.addEventListener('click', () => {
        isShowingMore = !isShowingMore; // Toggle the state

        workItems.forEach(item => {
            if (isShowingMore) {
                item.style.display = 'block';
                toggleButton.textContent = 'Show Less'; // Change text to 'Show Less'
            } else {
                item.style.display = 'none';
                toggleButton.textContent = 'Show More'; // Change text to 'Show More'
            }
        });
    });
});



function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    // Toggle the menu's visibility
    menu.classList.toggle('-right-64');
    menu.classList.toggle('right-0');
}


window.addEventListener('scroll', () => {
    if (scrollY > 50) {
        navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
    } else {
        navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20')
        navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent',);
    }
})

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}