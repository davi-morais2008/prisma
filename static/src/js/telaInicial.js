
// Cards das Ordens de Serviço
const workOrders = document.querySelectorAll('.work-order');
const orderModal = document.querySelector('.order-details')
const overlayModal = document.querySelector('#modalOverlay')

// OS INFO CARD
const btnClose = document.querySelector('#btnClose')
const btnEdit = document.querySelector('#btnEdit')
const btnDelete = document.querySelector('#btnDelete')

// MODAL DE EDIÇÃO
const editModal = document.querySelector('.order-edit');
const btnCloseUpdate = document.querySelector('#btnCancelUpdate')
const btnCancelUpdate = document.querySelector('#btnCancelEditForm')
const overlayUpdate = document.querySelector('#updateModalOverlay')

// MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
const deleteModal = document.querySelector('.order-delete')
const btnCloseDelete = document.querySelector('#btnCancelDeleteHeader')
const btnCancelDelete = document.querySelector('#btnCancelDelete')
const btnConfirmDelete = document.querySelector('#btnConfirmDelete')

function openOrderModal() {
    orderModal.classList.add('active')
}

function closeOrderModal(){
    orderModal.classList.remove('active')
}

function openEditModal(){
    editModal.classList.add('active')
}

function closeEditModal(){
    editModal.classList.remove('active')
}

function openDeleteModal(){
    deleteModal.classList.add('active')
}

function closeDeleteModal(){
    deleteModal.classList.remove('active')
}

// CLIQUES

//abrir modal OS
workOrders.forEach(order => {
    order.addEventListener('click', () => {
        // necessario colocar logica de abrir a ordem serviço certa aqui
        openOrderModal();
    });
});
// fechar modal OS
btnClose.addEventListener('click', closeOrderModal)
overlayModal.addEventListener('click', closeOrderModal)
btnDelete.addEventListener('click', openDeleteModal) // abre o modal para confirmar exclusão

// abrir modal de edição
btnEdit.addEventListener('click', openEditModal)
// fechar modal de edição
btnCloseUpdate.addEventListener('click', closeEditModal)
overlayUpdate.addEventListener('click', closeEditModal)
btnCancelUpdate.addEventListener('click', closeEditModal)

btnCancelDelete.addEventListener('click', closeDeleteModal)
btnConfirmDelete.addEventListener('click', () => {
    closeDeleteModal();
    //aqui tambem deve ser adicionado a logica de exclusão da OS no BCD
})

