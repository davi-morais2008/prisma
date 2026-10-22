
// Cards das Ordens de Serviço
const workOrders = document.querySelectorAll('.work-order');

// Modal 1: Visualização da OS
const orderModal = document.getElementById('orderModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const btnClose = document.getElementById('btnClose');
const btnDelete = document.getElementById('btnDelete')
const modalOverlay = document.getElementById('modalOverlay');

// Modal 2: Edição da OS
const updateModal = document.getElementById('updateModal');
const btnEdit = document.getElementById('btnEdit');
const updateModalOverlay = document.getElementById('updateModalOverlay');
const updateForm = updateModal.querySelector('.form');

// Modal 3: Confirmar exclusão
const deleteModal = document.getElementById('deleteModal')
const deleteModalOverlay = document.getElementById('deleteModalOverlay')
const btnCancel = document.getElementById('btnCancelDelete')
const btnConfirm = document.getElementById('btnConfirmDelete')


// Funções para Abrir e Fechar Modais
// Abrir Modal 1
function openOrderModal(title, description) {
    if (title) modalTitle.textContent = title;
    if (description) modalDescription.textContent = description;
    orderModal.classList.add('active');
}

// Fechar Modal 1
function closeOrderModal() {
    orderModal.classList.remove('active');
}

// Abrir Modal 2 (Edição)
function openUpdateModal() {
    closeOrderModal(); // Fecha o primeiro modal para abrir o formulário
    updateModal.classList.add('active');
}

// Fechar Modal 2
function closeUpdateModal() {
    updateModal.classList.remove('active');
}

// Abrir modal 3
function openDeleteModal (){
    closeOrderModal()
    deleteModal.classList.add('active')
}
function closeDeleteModal (){
    deleteModal.classList.remove('active')
}

// Clique em qualquer card de Ordem de Serviço
workOrders.forEach(order => {
    order.addEventListener('click', () => {
        const title = order.querySelector('.work-order__title')?.textContent;
        const description = order.querySelector('.work-order__description')?.textContent;
        openOrderModal(title, description);
    });
});

// Clique no botão de editar (dentro do Modal 1)
if (btnEdit) {
    btnEdit.addEventListener('click', openUpdateModal);
}

// Fechar Modal 1 - Botão "Fechar" ou Clicar fora do card/overlay
if (btnClose) btnClose.addEventListener('click', closeOrderModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeOrderModal);

// Fechar Modal 2 (Clicar fora do card/overlay)
if (updateModalOverlay) updateModalOverlay.addEventListener('click', closeUpdateModal);

// Modal de Confirmar Exclusão
if (btnDelete) {
    btnDelete.addEventListener('click', openDeleteModal);
}

// Fechar Modal 3 no botão "Cancelar"
if (btnCancel) {
    btnCancel.addEventListener('click', closeDeleteModal);
}

// Fechar Modal 3 ao clicar no fundo escuro (overlay)
if (deleteModalOverlay) {
    deleteModalOverlay.addEventListener('click', closeDeleteModal);
}

// Ação de confirmar exclusão
if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
        // Aqui deve ser adicionado a Lógica de Exclusão da Ordem de Serviço
        
        closeDeleteModal();
    });
}