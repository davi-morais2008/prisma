
// Cards das Ordens de Serviço
const workOrders = document.querySelectorAll('.work-order');
const orderModal = document.querySelector('.order-details')
const overlayModal = document.querySelector('#modalOverlay')

// OS INFO CARD
const btnClose = document.querySelector('#btnClose')
const btnEdit = document.querySelector('#btnEdit')


function openOrderModal() {
    orderModal.classList.add('active')
}

function closeOrderModal(){
    orderModal.classList.remove('active')
}


// cliques 
//abrir modal
workOrders.forEach(order => {
    order.addEventListener('click', () => {
        // necessario colocar logica de abrir a ordem serviço certa aqui
        openOrderModal();
    });
});