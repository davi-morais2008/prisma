const menuToggle = document.getElementById('menu-toggle');
const mobileDropdown = document.getElementById('mobile-dropdown');

menuToggle.addEventListener('click', () => {
  mobileDropdown.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de tema (header e aside)
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement; // Seleciona a tag <html>
    
    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    // Função para alternar o tema
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Aplica o novo tema no HTML, ativando as variáveis do variáveis.css
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Salva a preferência no navegador
        localStorage.setItem('theme', newTheme);
    }

    // Adiciona o evento de clique a todos os botões encontrados na tela
    themeToggles.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});