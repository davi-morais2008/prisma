import { renderizarGrafico } from "../js/painelGeral";

const menuToggle = document.getElementById('menu-toggle');
const mobileDropdown = document.getElementById('mobile-dropdown');

menuToggle.addEventListener('click', () => {
  mobileDropdown.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement; 
    

    const darkIconPath = '../static/src/img/dark_mode_imagem.png'; 
    const lightIconPath = '../static/src/img/light_mode_imagem.png'; 


    function updateIcons(theme) {
        const themeIcons = document.querySelectorAll('.theme-toggle__icon');
        themeIcons.forEach(icon => {
            if (theme === 'dark') {
                icon.src = lightIconPath; 
            } else {
                icon.src = darkIconPath; 
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

        renderizarGrafico();
        
        updateIcons(newTheme);
    }

    themeToggles.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});