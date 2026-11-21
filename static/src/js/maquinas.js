const btnRegisterMachine = document.querySelector('.machines__button-register');
const inputSearchMachine = document.querySelector('.filter-input-search');
const filterButtons = document.querySelectorAll('.filter-button');
const machineButtons = document.querySelectorAll('.machine__button');



const createModalContainer = document.querySelector('.machine-modal__overlay');
const btnCloseCreateModal = document.querySelector('.machine-modal__close-button');
const createMachineForm = document.querySelector('.machine-form');

const imgPreviewInput = document.getElementById('image-preview-input');
const imgPreview = document.getElementById('image-preview');
const filePreviewInput = document.getElementById('manual-upload');
const filePreview = document.getElementById('file-name');

const imgPreviewInputEdit = document.getElementById('preview-edit-img-button');
const imgPreviewEdit = document.getElementById('preview-edit-img');
const filePreviewInputEdit = document.getElementById('manual-upload-edit');
const filePreviewEdit = document.getElementById('file-name-edit');

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
const detailsLocationTitle = document.querySelector('.machine-details__location-title');
const detailsLocationText = document.querySelector('.machine-details__location-text');

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
const editPhotoPreview = document.getElementById('preview-edit-img');
const editTypeInput = document.getElementById('edit-type');
const editOptionDefaultInput = document.getElementById('default');
const editModelInput = document.getElementById('edit-model');
const editPatrimonyInput = document.getElementById('edit-patrimony');
const editLocationInput = document.getElementById('edit-location');
const editProdTimeInput = document.getElementById('edit-prod-time');
const editWorkHoursInput = document.getElementById('edit-work-hours');
const editCostInput = document.getElementById('edit-cost');
const editPartsInput = document.getElementById('edit-parts');
const editStopTimeInput = document.getElementById('edit-stop-time');
const editManualFileInput = document.getElementById('edit-manual-file');
const editManualFileName = document.getElementById('edit-file-name');
const editMaintanceStatusSelect = document.getElementById('edit-maintance-status');
const editMaintanceDateInput = document.getElementById('edit-maintance-date');
const editIdMachine = document.getElementById('edit-id-machine');

const btnCancelEdit = document.querySelector('.machine-edit__button--cancel');
const btnConfirmEdit = document.querySelector('.machine-edit__button--save');

const deleteConfirmationModal = document.querySelector('.order-delete');
const btnCloseDeleteModal = document.querySelector('.order-delete__close-btn');
const btnCancelDeleteHeader = document.getElementById('btnCancelDeleteHeader');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');

const inputMaq = document.getElementById('input_maquina')

function setupImagePreview(inputElement, imgElement) {
    if (!inputElement || !imgElement) return;

    inputElement.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const tempUrl = URL.createObjectURL(file);
            imgElement.src = tempUrl;
            imgElement.style.display = 'block';
        }
    });
}

function setupFilePreview(inputElement, labelElement) {
    if (!inputElement || !labelElement) return;

    inputElement.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            labelElement.textContent = file.name;
        }
    });
}

setupImagePreview(imgPreviewInput, imgPreview);
setupFilePreview(filePreviewInput, filePreview);

setupImagePreview(imgPreviewInputEdit, imgPreviewEdit);
setupFilePreview(filePreviewInputEdit, filePreviewEdit);




async function requestMachine() {
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

async function fillEditModal(machineId) {
    const machines = await requestMachine();
    const machine = machines.find((item) => item.id_maquina == machineId);

    if (machine) {

        if (editOptionDefaultInput) editOptionDefaultInput.value = machine.id_tipo_maquina || '';
        if (editOptionDefaultInput) editOptionDefaultInput.textContent = machine.tipo_maquina || '';
        if (editPatrimonyInput) editPatrimonyInput.value = machine.numero_patrimonio || '';
        if (editLocationInput) editLocationInput.value = machine.id_setor || '';
        if (editProdTimeInput) editProdTimeInput.value = machine.tempo_producao || '';
        if (editWorkHoursInput) editWorkHoursInput.value = machine.total_horas || '';
        if (editCostInput) editCostInput.value = machine.custo_acumulado || '';
        if (editPartsInput) editPartsInput.value = machine.pecas_alteradas || '';
        if (editStopTimeInput) editStopTimeInput.value = machine.tempo_parada || '';
        if (editMaintanceStatusSelect) editMaintanceStatusSelect.value = machine.status_preventiva || '';
        if (editMaintanceDateInput) editMaintanceDateInput.value = machine.data_preventiva || '';
        if (editIdMachine) editIdMachine.value = selectedMachineId
        if (editPhotoPreview && machine.url_imagem) {
            editPhotoPreview.src = machine.url_imagem;
        }
    }
}


async function requestOrder() {
    try {
        const resposta = await fetch('/api/get/ordens_servico/', {
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

function parseDataSegura(dataStr) {
    if (!dataStr) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dataStr)) {
        return new Date(`${dataStr}T00:00:00`);
    }
    const data = new Date(dataStr);
    return isNaN(data.getTime()) ? null : data;
}

// Extrai o início da parada/manutenção priorizando a data real e caindo para a prevista
function obterInicioManutencao(ordem) {
    return parseDataSegura(
        ordem.data_parada ||
        ordem.data_inicio_manutencao ||
        ordem.data_prev_inicio_manutencao
    );
}

// Extrai o término da manutenção priorizando a data real e caindo para a prevista
function obterTerminoManutencao(ordem) {
    return parseDataSegura(
        ordem.data_termino_manutencao ||
        ordem.data_prev_termino_manutencao
    );
}


function calcularTempoFuncionamento(machine, orders) {
    if (!machine || !Array.isArray(orders)) return 0;

    const machineOrders = orders
        .filter((item) => {
            const status = (item.status_ordem || '');
            return item.id_maquina == machine.id_maquina && status !== 'Cancelada' && status !== 'Finalizada';
        })
        .sort((a, b) => {
            const inicioA = obterInicioManutencao(a);
            const inicioB = obterInicioManutencao(b);
            return (inicioA ? inicioA.getTime() : 0) - (inicioB ? inicioB.getTime() : 0);
        });

    let totalMs = 0;

    // Soma os intervalos funcionando ENTRE uma manutenção e a próxima parada
    for (let i = 0; i < machineOrders.length - 1; i++) {
        const dataTermino = obterTerminoManutencao(machineOrders[i]);
        const dataProxInicio = obterInicioManutencao(machineOrders[i + 1]);

        if (dataTermino && dataProxInicio) {
            const diferenca = dataProxInicio - dataTermino;
            if (diferenca > 0) {
                totalMs += diferenca;
            }
        }
    }

    // Soma o tempo desde o término da última manutenção até agora
    if (machineOrders.length > 0) {
        const ultimaOrdem = machineOrders[machineOrders.length - 1];
        const dataUltimoTermino = obterTerminoManutencao(ultimaOrdem);

        if (dataUltimoTermino) {
            const diferencaHoje = new Date() - dataUltimoTermino;
            if (diferencaHoje > 0) {
                totalMs += diferencaHoje;
            }
        }
    }

    return Math.floor(totalMs / (1000 * 60 * 60 * 24));
}

function calcularTempoParado(machine, orders) {
    if (!machine || !Array.isArray(orders)) return 0;

    const machineOrders = orders.filter((item) => {
        const status = (item.status_ordem || '').toLowerCase();
        return item.id_maquina == machine.id_maquina && status !== 'Cancelada' && status !== 'Finalizada';
    });

    let totalMs = 0;

    machineOrders.forEach((ordem) => {
        const dataParada = parseDataSegura(ordem.data_parada);
        // Se a manutenção ainda não foi concluída (sem data_termino_manutencao), conta até agora
        const dataTermino = ordem.data_termino_manutencao
            ? parseDataSegura(ordem.data_termino_manutencao)
            : new Date();

        if (dataParada && dataTermino) {
            const diferenca = dataTermino - dataParada;
            if (diferenca > 0) {
                totalMs += diferenca;
            }
        }
    });

    return Math.floor(totalMs / (1000 * 60 * 60 * 24));
}

function calcularIndiceDisponibilidade(machine, orders){
    const tempoFuncionando = calcularTempoFuncionamento(machine, orders);
    const tempoParada = calcularTempoParado(machine, orders)
    const tempoTotal = tempoFuncionando + tempoParada

    if (tempoTotal === 0) {
        return 0
    }

    const indiceDisponibilidade = (tempoFuncionando / tempoTotal) * 100
    return Number(indiceDisponibilidade.toFixed(1));
}


machineButtons.forEach((machineButton) => {
    machineButton.addEventListener('click', async () => {

        const [machines, ordens] = await Promise.all([
            requestMachine(),
            requestOrder()
        ]);

        detailsModalContainer.classList.add('active');

        const buttonId = machineButton.getAttribute('id');

        selectedMachineId = buttonId;

        const machine = machines.find((item) => item.id_maquina == buttonId);

        if (machine) {
            if (detailsImage) detailsImage.src = machine.url_imagem || '/static/src/img/torno_mecanico.jpg';
            if (detailsTypeText) detailsTypeText.textContent = machine.tipo_maquina || 'N/A';
            if (detailsPatrimonyText) detailsPatrimonyText.textContent = machine.numero_patrimonio || 'N/A';
            if (detailsLocationText) detailsLocationText.textContent = machine.setor || 'N/A';

            if (detailsStatValues && detailsStatValues.length >= 5) {
                // Calcula aguardando a resposta e passando os parâmetros corretos
                const diasFuncionando = calcularTempoFuncionamento(machine, ordens);
                const tempoParada = calcularTempoParado(machine, ordens)
                const disponibilidade = calcularIndiceDisponibilidade(machine, ordens)

                detailsStatValues[0].textContent = `${diasFuncionando}d`;
                detailsStatValues[1].textContent = 0;
                detailsStatValues[2].textContent = `${tempoParada}d`;
                detailsStatValues[3].textContent = `${disponibilidade}%`;
                detailsStatValues[4].textContent = `R$ ${'0,00'}`;
            }

            if (detailsManualLinks.length > 0 && machine.url_manual) {
                detailsManualLinks.forEach(link => {
                    link.href = machine.url_manual;
                });
            }

            if (detailsPreventiveStatusText) {
                const status = machine.status_preventiva || 'Sem status';
                const data = machine.data_preventiva || 'Sem data';
                // Removido o '-' que estava no início desta linha
                detailsPreventiveStatusText.textContent = `Status: ${status} ${data}`;
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


btnEditFromDetails.addEventListener('click', async () => {
    if (selectedMachineId) {
        await fillEditModal(selectedMachineId);
    }
    editModalOverlay.classList.add('active');
});

btnDeleteFromDetails.addEventListener('click', () => {
    deleteConfirmationModal.classList.add('active');
});

if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', async () => {
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


        } catch (error) {
            console.error('Falha ao inativar Máquina:', error);
            alert('Não foi possível inativar a máquina.');
        }

        detailsModalContainer.classList.remove('active');
        deleteConfirmationModal.classList.remove('active');
        window.location.reload();
    });
}

btnRegisterMachine.addEventListener('click', () => { createModalContainer.classList.add('active'); });
btnCloseCreateModal.addEventListener('click', () => { createModalContainer.classList.remove('active'); });

btnCloseDetailsModal.addEventListener('click', () => { detailsModalContainer.classList.remove('active'); });

btnCloseEditModal.addEventListener('click', () => { editModalOverlay.classList.remove('active'); });
btnCancelEdit.addEventListener('click', () => { editModalOverlay.classList.remove('active'); });


if (btnCloseDeleteModal) btnCloseDeleteModal.addEventListener('click', () => { deleteConfirmationModal.classList.remove('active'); });
if (btnCancelDeleteHeader) btnCancelDeleteHeader.addEventListener('click', () => { deleteConfirmationModal.classList.remove('active'); });
if (btnCancelDelete) btnCancelDelete.addEventListener('click', () => { deleteConfirmationModal.classList.remove('active'); });

document.addEventListener('DOMContentLoaded', () => {
    const cardsMaquinas = document.querySelectorAll('.machine');
    const msgVazio = document.getElementById('sem-resultados');
    const flash = document.querySelector('.container-flash');
    let tipoSelecionado = '';

    function aplicarFiltros() {
        const termoBusca = (inputMaq?.value || '').trim().toLowerCase();
        let visiveis = 0;

        cardsMaquinas.forEach(card => {
            const machineCard = (card.getAttribute('data-machine') || '').toLowerCase();
            const tipoCard = (card.getAttribute('data-tipo') || '').toLowerCase();

            const bateNome = !termoBusca || machineCard.includes(termoBusca);
            const bateTipo = !tipoSelecionado || tipoCard === tipoSelecionado;

            if (bateNome && bateTipo) {
                card.style.display = '';
                visiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        if (msgVazio) {
            msgVazio.style.display = (visiveis === 0) ? 'flex' : 'none';
        }

        if (flash) {
            msgVazio.style.display = 'none';
        }
    }

    if (inputMaq) {
        inputMaq.addEventListener('input', aplicarFiltros);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const valorBotao = (button.value || '').trim().toLowerCase();

            // Se clicar no botão já ativo, desativa o filtro de tipo
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                tipoSelecionado = '';
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                tipoSelecionado = valorBotao;
            }

            aplicarFiltros();
        });
    });
});