const registerTypeMachineButtons = document.getElementById('new-type-button');
const registerTypeMachineModal = document.getElementById('modal-tipo-maquina');
const registerFailureMachineButtons = document.getElementById('new-failure-button');
const registerFailureMachineModal = document.getElementById('modal-falha');
const registerLocationMachineButtons = document.getElementById('new-location-button');
const registerLocationMachineModal = document.getElementById('modal-setor');

const registerLocationCloseBtn = document.getElementById('close-modal-location');
const registerTypeCloseBtn = document.getElementById('close-modal-tipo');
const registerFailureCloseBtn = document.getElementById('close-modal-failure');

// --- ABRIR MODAIS (NOVO CADASTRO) ---
if (registerTypeMachineButtons) {
    registerTypeMachineButtons.addEventListener('click', () => {
        const form = registerTypeMachineModal.querySelector('form');
        form.reset();
        form.action = '/categorias/adicionar_tipo';
        registerTypeMachineModal.classList.add('active');
    });
}

if (registerFailureMachineButtons) {
    registerFailureMachineButtons.addEventListener('click', () => {
        const form = registerFailureMachineModal.querySelector('form');
        form.reset();
        form.action = '/categorias/adicionar_falha';
        registerFailureMachineModal.classList.add('active');
    });
}

if (registerLocationMachineButtons) {
    registerLocationMachineButtons.addEventListener('click', () => {
        const form = registerLocationMachineModal.querySelector('form');
        form.reset();
        form.action = '/categorias/adicionar_setor';
        registerLocationMachineModal.classList.add('active');
    });
}

// --- FECHAR MODAIS (BOTÃO X) ---
if (registerTypeCloseBtn) {
    registerTypeCloseBtn.addEventListener('click', () => registerTypeMachineModal.classList.remove('active'));
}
if (registerFailureCloseBtn) {
    registerFailureCloseBtn.addEventListener('click', () => registerFailureMachineModal.classList.remove('active'));
}
if (registerLocationCloseBtn) {
    registerLocationCloseBtn.addEventListener('click', () => registerLocationMachineModal.classList.remove('active'));
}

// --- FECHAR MODAIS (BOTÃO CANCELAR E CLIQUE FORA) ---
document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.category-modal__overlay');
        if (modal) modal.classList.remove('active');
    });
});

document.querySelectorAll('.category-modal__overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});