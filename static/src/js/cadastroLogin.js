// Elementos Container
const containerFormLogin = document.querySelector('#form-login')
const containerFormCadastro = document.querySelector('#form-cadastro')

// Elementos de Entrada
const inputLoginCPF = document.querySelector('#login_cpf')
const inputLoginSenha = document.querySelector('#login_senha')

const inputCadastroNome = document.querySelector('#cadastro-nome')
const inputCadastroEmail = document.querySelector('#cadastro-email')
const inputCadastroCPF = document.querySelector('#cadastro-cpf')
const inputCadastroSenha = document.querySelector('#cadastro-pwd')
const inputCadastroConfirmSenha = document.querySelector('#cadastro-confirmpwd')

// Elementos de Ação
const bntLogin = document.querySelector('#btn-login')
const bntCadastro = document.querySelector('#btn-cadastro')


inputLoginCPF.addEventListener('input', () => {
        if (isNaN(inputLoginCPF.value.at(-1))){
            inputLoginCPF.value = inputLoginCPF.value.slice(0, -1)
        }
})

inputCadastroCPF.addEventListener('input', () => {
    if (isNaN(inputCadastroCPF.value.at(-1))){
            inputCadastroCPF.value = inputCadastroCPF.value.slice(0, -1)
        }
})

inputCadastroEmail.addEventListener('input', () => {
    const valorEmail = inputCadastroEmail.value;
    const partes = valorEmail.split('@');
    if (partes.length === 2) {
        inputCadastroEmail.style.borderColor = "green";
    } else {
        inputCadastroEmail.style.borderColor = "red";
    }
});

// console.log(bntLogin)
// bntLogin.addEventListener('click', () => requisicaoUsuarios())

// const requisicaoUsuarios = async () => {
//     console.log('teste')
//     const response = await fetch(`http://127.0.0.1:8080/usuarios/api_get/users`,{
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json; charset=utf-8',
//                 'Content-Type': 'application/json; charset=utf-8'
//             }}
//         );

//     if (!response.ok){
//         console.log('ERRO NA REQUISIÇÃO');
//     }

//     const usuarios = await response.json()

//     console.log(usuarios)
// }

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