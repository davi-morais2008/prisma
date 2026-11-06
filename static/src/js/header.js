import * as MyModule from "../js/painelGeral.js";

const menuToggle = document.getElementById('menu-toggle');
const mobileDropdown = document.getElementById('mobile-dropdown');

menuToggle.addEventListener('click', () => {
  mobileDropdown.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement; 
    

    const darkIconPath = 'dark_mode'; 
    const lightIconPath = 'light_mode'; 


    function updateIcons(theme) {
        const themeIcons = document.querySelectorAll('.theme-toggle__icon');
        themeIcons.forEach(icon => {
            if (theme === 'dark') {
                icon.textContent = lightIconPath; 
            } else {
                icon.textContent = darkIconPath; 
            }
        });
    }


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcons(savedTheme);
    }


    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateIcons(newTheme);

        MyModule.carregarDadosDashboard(newTheme);
    }

    themeToggles.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});