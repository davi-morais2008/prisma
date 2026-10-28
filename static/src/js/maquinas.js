// ==========================================
// 1. LISTAGEM E FILTROS DE MÁQUINAS
// ==========================================
const btnRegisterMachine = document.querySelector('.machines__button-register');
const inputSearchMachine = document.querySelector('.filter-input-search');
const filterButtons = document.querySelectorAll('.filter-button');
const machineButtons = document.querySelectorAll('.machine__button');




// ==========================================
// 2. MODAL: CADASTRAR NOVA MÁQUINA
// ==========================================
const createModalContainer = document.querySelector('.machine-modal');
const btnCloseCreateModal = document.querySelector('.machine-modal__close-button');
const createMachineForm = document.querySelector('.machine-form');

// Inputs do Formulário de Cadastro
const createAvatarInput = document.querySelector('.machine-form__avatar-upload');
const createTypeInput = document.getElementById('type-machine');
const createNumberInput = document.getElementById('number-machine');
const createProductionTimeInput = document.getElementById('production-time');
const createTotalHoursInput = document.getElementById('total-hours');
const createAccumulatedCostInput = document.getElementById('accumulated-cost');
const createPartsChangedInput = document.getElementById('parts-changed');
const createDowntimeInput = document.getElementById('downtime');
const createManualFileInput = document.getElementById('manual-upload');
const createStatusSelect = document.getElementById('status-machine');
const createScheduledDateInput = document.getElementById('scheduled-date');

// ==========================================
// 3. MODAL: DETALHES DA MÁQUINA
// ==========================================

const detailsModalContainer = document.querySelector('.machine-details');
const detailsTypeText = document.querySelector('.machine-details__type-text');
const detailsPatrimonyText = document.querySelector('.machine-details__number-text');

const detailsStatValues = document.querySelectorAll('.machine-details__stat-value');
const detailsPreventiveStatusText = document.querySelector('.machine-details__prev-maintance-text');
const detailsHistoryTableBody = document.querySelector('.machine-details__maintances-list tbody');

const btnCloseDetailsModal = document.querySelector('.machine-details__close-button');
const btnEditFromDetails = document.querySelector('.machine-details__action-button--edit');
const btnDeleteFromDetails = document.querySelector('.machine-details__action-button--delete');

// Elementos de Exibição de Informações
const detailsImage = document.querySelector('.machine-details__info-image');
const detailsManualLinks = document.querySelectorAll('.machine-details__manual-link');

// ==========================================
// 4. MODAL: EDITAR MÁQUINA
// ==========================================
const editModalOverlay = document.querySelector('.machine-edit__overlay');
const btnCloseEditModal = document.querySelector('.machine-edit__close-button');
const editMachineForm = document.querySelector('.machine-edit__form');

// Inputs do Formulário de Edição
const editPhotoInput = document.getElementById('edit-machine-photo');
const editTypeInput = document.getElementById('edit-type');
const editPatrimonyInput = document.getElementById('edit-patrimony');
const editProdTimeInput = document.getElementById('edit-prod-time');
const editWorkHoursInput = document.getElementById('edit-work-hours');
const editCostInput = document.getElementById('edit-cost');
const editPartsInput = document.getElementById('edit-parts');
const editStopTimeInput = document.getElementById('edit-stop-time');
const editManualFileInput = document.getElementById('edit-manual-file');
const editMaintanceStatusSelect = document.getElementById('edit-maintance-status');
const editMaintanceDateInput = document.getElementById('edit-maintance-date');

// Botões de Ação do Form de Edição
const btnCancelEdit = document.querySelector('.machine-edit__button--cancel');
const btnSaveEdit = document.querySelector('.machine-edit__button--save');

// ==========================================
// 5. MODAL: CONFIRMAÇÃO DE EXCLUSÃO
// ==========================================
const deleteConfirmationModal = document.querySelector('.delete-confirmation');
const btnCloseDeleteModal = document.querySelector('.delete-confirmation__close-button');
const btnCancelDelete = document.querySelector('.button-confirmation--cancel');
const btnConfirmDelete = document.querySelector('.button-confirmation--delete');



async function requestMachine() {

    const resposta = await fetch(`http://127.0.0.1:8080/maquinas/api_request_machines`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            }}
        );
        if (!resposta.ok){
            alert("ERRO AO CARREGAR INFORMAÇÃO!");
        }
    let maquinas = await resposta.json()
    return maquinas
}

machineButtons.forEach((machineButton) => {

    machineButton.addEventListener('click', async () => {
        detailsModalContainer.classList.add('active')
        let machines = await requestMachine()
        machines.forEach((machine) => {
            // console.log(machine)
            // console.log(machineButton.getAttribute('id'))
            if (machine.id_maquina == machineButton.getAttribute('id')){
                let machineDetails = machines[(machineButton.getAttribute('id')) - 1]
                console.log(machineDetails)
                // detailsImage.src = machineDetails.url_imagem;

                // detailsTypeText.textContent = machineDetails.tipo_maquina;
                // detailsPatrimonyText.textContent = machineDetails.numero_patrimonio;

                // detailsPreventiveStatusText.textContent = `Status: ${machineDetails.status_preventiva} - ${machineDetails.data_preventiva}`;
            }
            
        })
    

})})

btnEditFromDetails.addEventListener('click', () => {
    editModalOverlay.classList.add('active')
})

btnDeleteFromDetails.addEventListener('click', () => {
    deleteConfirmationModal.classList.add('active')
})


btnCloseCreateModal.addEventListener('click', () => {createModalContainer.classList.remove('active')}
)

btnCloseDeleteModal.addEventListener('click', () => {deleteConfirmationModal.classList.remove('active')}
)
btnCancelDelete.addEventListener('click', () => {deleteConfirmationModal.classList.remove('active')}
)


btnCloseDetailsModal.addEventListener('click', () => {detailsModalContainer.classList.remove('active')}
)

btnCloseEditModal.addEventListener('click', () => {editModalOverlay.classList.remove('active')}
)
btnCancelEdit.addEventListener('click', () => {editModalOverlay.classList.remove('active')}
)

