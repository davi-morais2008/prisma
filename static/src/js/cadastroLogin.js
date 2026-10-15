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


const requisicaoUsuarios = async () => {

}

