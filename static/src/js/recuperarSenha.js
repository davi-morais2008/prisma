document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement; 
    

    const darkIconPath = '../static/src/img/dark_mode_imagem.png'; // Ícone para ativar o modo escuro (Lua)
    const lightIconPath = '../static/src/img/light_mode_imagem.png'; // Ícone para ativar o modo claro (Sol)

    // Função para atualizar as imagens de todos os botões da tela
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

    // Verifica tema salvo e aplica
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcons(savedTheme); // Atualiza o ícone ao carregar a página
    }

    // Função de clique
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateIcons(newTheme); // Atualiza o ícone na hora do clique
    }

    themeToggles.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});