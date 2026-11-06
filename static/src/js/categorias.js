const registerTypeMachineButtons = document.getElementById('new-type-button')
const registerTypeMachineModal = document.getElementById('modal-tipo-maquina')
const registerFailureMachineButtons = document.getElementById('new-failure-button')
const registerFailureMachineModal = document.getElementById('modal-falha')
const registerLocationMachineButtons = document.getElementById('new-location-button')
const registerLocationMachineModal = document.getElementById('modal-setor')
const registerLocationCloseBtn = document.getElementById('close-modal-location')
const registerTypeCloseBtn = document.getElementById('close-modal-type')
const registerFailureCloseBtn = document.getElementById('closeAddFailureModal')

if (registerTypeMachineButtons) registerTypeMachineButtons.addEventListener('click', () => {
    registerTypeMachineModal.classList.add('active')})

if (registerFailureMachineButtons) registerFailureMachineButtons.addEventListener('click', () => {
    registerFailureMachineModal.classList.add('active')})

if (registerTypeCloseBtn) registerTypeCloseBtn.addEventListener('click', () => {registerTypeMachineModal.classList.remove('active')})
if (registerFailureCloseBtn) registerFailureCloseBtn.addEventListener('click', () => {registerFailureMachineModal.classList.remove('active')})