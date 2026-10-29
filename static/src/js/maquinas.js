const btnRegisterMachine = document.querySelector('.machines__button-register');
const inputSearchMachine = document.querySelector('.filter-input-search');
const filterButtons = document.querySelectorAll('.filter-button');
const machineButtons = document.querySelectorAll('.machine__button');

const createModalContainer = document.querySelector('.machine-modal__overlay');
const btnCloseCreateModal = document.querySelector('.machine-modal__close-button');
const createMachineForm = document.querySelector('.machine-form');
const imgPreviewInput = document.getElementById('image-preview-input');
const imgPreview = document.getElementById('image-preview');
const filePreview = document.getElementById('file-name');
const filePreviewInput = document.getElementById('manual-upload')





const createAvatarInput = document.querySelector('.machine-form__avatar-upload');
const createTypeInput = document.getElementById('type-machine');
const createNumberInput = document.getElementById('number-machine');
const createLocationInput = document.getElementById('location-machine');
const createProductionTimeInput = document.getElementById('production-time');
const createTotalHoursInput = document.getElementById('total-hours');
const createAccumulatedCostInput = document.getElementById('accumulated-cost');
const createPartsChangedInput = document.getElementById('parts-changed');
const createDowntimeInput = document.getElementById('downtime');
const createManualFileInput = document.getElementById('manual-upload');
const createStatusSelect = document.getElementById('status-machine');
const createScheduledDateInput = document.getElementById('scheduled-date');

function getCreateFormData() {
    return {
        avatarFile: createAvatarInput?.querySelector('input[type="file"]')?.files[0] || null,
        typeValue: createTypeInput?.value || '',
        numberValue: createNumberInput?.value || '',
        locationValue: createLocationInput?.value || '',
        productionTimeValue: createProductionTimeInput?.value || '',
        totalHoursValue: createTotalHoursInput?.value || '',
        accumulatedCostValue: createAccumulatedCostInput?.value || '',
        partsChangedValue: createPartsChangedInput?.value || '',
        downtimeValue: createDowntimeInput?.value || '',
        manualFile: createManualFileInput?.files[0] || null,
        statusValue: createStatusSelect?.value || '',
        scheduledDateValue: createScheduledDateInput?.value || ''
    };
}

const detailsModalContainer = document.querySelector('.machine-details__overlay');
const detailsImage = document.querySelector('.machine-details__info-image');
const detailsTypeText = document.querySelector('.machine-details__type-text');
const detailsPatrimonyText = document.querySelector('.machine-details__number-text');

const detailsStatValues = document.querySelectorAll('.machine-details__stat-value');
const detailsManualLinks = document.querySelectorAll('.machine-details__manual-link');
const detailsPreventiveStatusText = document.querySelector('.machine-details__prev-maintance-text');
const detailsHistoryTableBody = document.querySelector('.machine-details__maintances-list tbody');

const btnCloseDetailsModal = document.querySelector('.machine-details__close-button');
const btnEditFromDetails = document.querySelector('.machine-details__action-button--edit');
const btnDeleteFromDetails = document.querySelector('.machine-details__action-button--delete');

let selectedMachineId = null;

const editModalOverlay = document.querySelector('.machine-edit__overlay');
const btnCloseEditModal = document.querySelector('.machine-edit__close-button');
const editMachineForm = document.querySelector('.machine-edit__form');

const editPhotoInput = document.getElementById('edit-machine-photo');
const editTypeInput = document.getElementById('edit-type');
const editPatrimonyInput = document.getElementById('edit-patrimony');
const editLocationInput = document.getElementById('edit-location');
const editProdTimeInput = document.getElementById('edit-prod-time');
const editWorkHoursInput = document.getElementById('edit-work-hours');
const editCostInput = document.getElementById('edit-cost');
const editPartsInput = document.getElementById('edit-parts');
const editStopTimeInput = document.getElementById('edit-stop-time');
const editManualFileInput = document.getElementById('edit-manual-file');
const editMaintanceStatusSelect = document.getElementById('edit-maintance-status');
const editMaintanceDateInput = document.getElementById('edit-maintance-date');

const btnCancelEdit = document.querySelector('.machine-edit__button--cancel');

const deleteConfirmationModal = document.querySelector('.order-delete');
const btnCloseDeleteModal = document.querySelector('.order-delete__close-btn');
const btnCancelDeleteHeader = document.getElementById('btnCancelDeleteHeader');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');

async function requestMachine() {
    try {
        const resposta = await fetch(`http://127.0.0.1:8080/maquinas/api_request_machines`, {
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

machineButtons.forEach((machineButton) => {
    machineButton.addEventListener('click', async () => {
        detailsModalContainer.classList.add('active');
        const machines = await requestMachine();
        const buttonId = machineButton.getAttribute('id');

        selectedMachineId = buttonId;

        const machine = machines.find((item) => item.id_maquina == buttonId);

        if (machine) {
            if (detailsImage) detailsImage.src = machine.url_imagem || '/static/src/img/torno_mecanico.jpg';
            if (detailsTypeText) detailsTypeText.textContent = machine.tipo_maquina || 'N/A';
            if (detailsPatrimonyText) detailsPatrimonyText.textContent = machine.numero_patrimonio || 'N/A';

            if (detailsStatValues && detailsStatValues.length >= 5) {
                detailsStatValues[0].textContent = `${machine.tempo_producao || 0}h`;
                detailsStatValues[1].textContent = `${machine.total_horas || 0}h`;
                detailsStatValues[2].textContent = machine.pecas_alteradas || 0;
                detailsStatValues[3].textContent = `${machine.tempo_parada || 0}h`;
                detailsStatValues[4].textContent = `R$ ${machine.custo_acumulado || '0,00'}`;
            }

            if (detailsManualLinks.length > 0 && machine.url_manual) {
                detailsManualLinks.forEach(link => {
                    link.href = machine.url_manual;
                });
            }

            if (detailsPreventiveStatusText) {
                const status = machine.status_preventiva || 'Sem status';
                const data = machine.data_preventiva || 'Sem data';
                detailsPreventiveStatusText.textContent = `Status: ${status} - ${data}`;
            }

            if (detailsHistoryTableBody && machine.historico) {
                detailsHistoryTableBody.innerHTML = '';
                machine.historico.forEach((item) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.data || ''}</td>
                        <td>${item.tipo || ''}</td>
                        <td>${item.tecnico || ''}</td>
                        <td>${item.observacoes || ''}</td>
                    `;
                    detailsHistoryTableBody.appendChild(row);
                });
            }
        }
    });
});

btnEditFromDetails.addEventListener('click', () => {
    editModalOverlay.classList.add('active');
});

btnDeleteFromDetails.addEventListener('click', () => {
    deleteConfirmationModal.classList.add('active');
});


btnRegisterMachine.addEventListener('click', () => { createModalContainer.classList.add('active'); });
btnCloseCreateModal.addEventListener('click', () => { createModalContainer.classList.remove('active'); });

btnCloseDetailsModal.addEventListener('click', () => { detailsModalContainer.classList.remove('active'); });

btnCloseEditModal.addEventListener('click', () => { editModalOverlay.classList.remove('active'); });
btnCancelEdit.addEventListener('click', () => { editModalOverlay.classList.remove('active'); });

if (btnCloseDeleteModal) btnCloseDeleteModal.addEventListener('click', () => { deleteConfirmationModal.classList.remove('active'); });
if (btnCancelDeleteHeader) btnCancelDeleteHeader.addEventListener('click', () => { deleteConfirmationModal.classList.remove('active'); });
if (btnCancelDelete) btnCancelDelete.addEventListener('click', () => { deleteConfirmationModal.classList.remove('active'); });
if (btnConfirmDelete) btnConfirmDelete.addEventListener('click', async () => {
    try {
        const response = await fetch('/maquinas/api_delete_machines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectedMachineId
            })
        });

        if (!response.ok) {
            throw new Error(`Erro no envio: ${response.status}`);
        }

        const resultado = await response.json();
        console.log('Máquina Deletada:', resultado);

    } catch (error) {
        console.error('Falha ao deletar Máquina:', error);
        alert('Não foi possível deletar.');
    }

    detailsModalContainer.classList.remove('active')
    window.location.reload();
})

console.log(imgPreview, imgPreviewInput)

imgPreviewInput.addEventListener('change', (event) => {
    let arquivo = event.target.files[0]

    if (arquivo) {
        // Cria uma URL temporária apontando para o arquivo local
        const urlTemporaria = URL.createObjectURL(arquivo);

        imgPreview.src = urlTemporaria;
        imgPreview.style.display = 'block';
    }
});

filePreviewInput.addEventListener('change', (event) => {
    let arquivo = event.target.files[0]

    if (arquivo) {

        filePreview.textContent = arquivo.name

    }
});
