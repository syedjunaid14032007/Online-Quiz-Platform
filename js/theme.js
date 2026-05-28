// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('quiz_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    });
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quiz_theme', theme);
    
    // Update icons if buttons exist
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    themeToggleBtns.forEach(btn => {
        if (theme === 'dark') {
            btn.innerHTML = '☀️'; // Sun icon for switching to light
            btn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            btn.innerHTML = '🌙'; // Moon icon for switching to dark
            btn.setAttribute('aria-label', 'Switch to dark mode');
        }
    });
}
