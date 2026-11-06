const registerTypeMachineButtons = document.getElementById('new-type-button')
const registerTypeMachineModal = document.getElementById('modal-tipo-maquina')
const registerFailureMachineButtons = document.getElementById('new-failure-button')
const registerFailureMachineModal = document.getElementById('modal-falha')
const registerLocationMachineButtons = document.getElementById('new-location-button')
const registerLocationMachineModal = document.getElementById('modal-setor')
const registerLocationCloseBtn = document.getElementById('close-modal-location')
const registerTypeCloseBtn = document.getElementById('close-modal-tipo')
const registerFailureCloseBtn = document.getElementById('close-modal-failure')

console.log(registerLocationMachineButtons)

if (registerTypeMachineButtons) registerTypeMachineButtons.addEventListener('click', () => {
    registerTypeMachineModal.classList.add('active')})

if (registerFailureMachineButtons) registerFailureMachineButtons.addEventListener('click', () => {
    registerFailureMachineModal.classList.add('active')})

if (registerLocationMachineButtons) registerLocationMachineButtons.addEventListener('click', () => {
    registerLocationMachineModal.classList.add('active')})

if (registerTypeCloseBtn) registerTypeCloseBtn.addEventListener('click', () => {registerTypeMachineModal.classList.remove('active')})
if (registerFailureCloseBtn) registerFailureCloseBtn.addEventListener('click', () => {registerFailureMachineModal.classList.remove('active')})
if (registerLocationCloseBtn) registerLocationCloseBtn.addEventListener('click', () => {registerLocationMachineModal.classList.remove('active')})

    
async function requestCategories() {
    try {
        const resposta = await fetch(`/maquinas/api_request_machines`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        if (!resposta.ok) {
            alert("ERRO AO CARREGAR INFORMAÇÃO!");
            return [];
        }
        return await resposta.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return [];
    }
}