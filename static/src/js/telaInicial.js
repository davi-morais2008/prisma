
// Cards das Ordens de Serviço
const workOrders = document.querySelectorAll('.work-order');
const orderModal = document.querySelector('.order-details')
const overlayModal = document.querySelector('#modalOverlay')

// OS INFO CARD
const btnClose = document.querySelector('#btnClose')
const btnEdit = document.querySelector('#btnEdit')
const btnDelete = document.querySelector('#btnDelete')
const tecResponsavel = document.querySelector('#tecnico_responsavel')

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

function closeOrderModal() {
    orderModal.classList.remove('active')
}

function openEditModal() {
    editModal.classList.add('active')
}

function closeEditModal() {
    editModal.classList.remove('active')
}

function openDeleteModal() {
    deleteModal.classList.add('active')
}

function closeDeleteModal() {
    deleteModal.classList.remove('active')
}


// CLIQUES

// abrir modal OS
workOrders.forEach(order => {
    order.addEventListener('click', async () => {

        const resposta = await fetch(`http://127.0.0.1:8080/api/get/ordens_servico/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
    );

        if (!resposta.ok) {
        alert("ERRO AO CARREGADAR DADOS!")
    } else {

        const ordens = await resposta.json();
        ordens.forEach(os => {
           tecResponsavel.appendChild(os.tecnico_responsavel)
            openOrderModal();
        });
    }

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
    closeOrderModal();
    //aqui tambem deve ser adicionado a logica de exclusão da OS no BCD
})

