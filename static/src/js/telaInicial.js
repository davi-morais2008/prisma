// ==========================================
// SELEÇÃO DOS ELEMENTOS DO DOM
// ==========================================

// Elementos Principais e Filtros
const workOrders = document.querySelectorAll('.work-order');
const filterButton = document.querySelectorAll('.filter-button');
const currentPath = window.location.pathname;
const homeOrders = document.querySelector('.home__orders');
const inputOrderMaintanence = document.getElementById('tipo_ordem_manutencao')
const inputOrderInspection = document.getElementById('tipo_ordem_inspecao')
const containerInspecForm = document.querySelector('#container_ordem_inspecao')
const containerMaintanece = document.querySelector('#container_ordem_manutencao')
const containerStopMachine = document.querySelector('#grupo_parada_maquina')
const containerDataParada = document.querySelector('#campo_data_parada')
const inputDateStop = document.querySelector('#check_maquina_parada')
const btnInspec = document.querySelector('#btnTabInspecao')
const btnServico = document.querySelector('#btnTabServico')
const containerInspec = document.querySelector('#container-ordens-inspecao')
const containerServico = document.querySelector('#container-ordens-servico')
const sliderBtn = document.getElementById('switcherSlider')
const containerDestinate = document.getElementById('containerDestinate')




// Modal: Detalhes da OS
const orderModal = document.querySelector('#orderModalMaintenance');
const overlayModal = document.querySelector('#modalOverlay');
const btnClose = document.querySelector('#btnClose');
const btnEdit = document.querySelector('#btnEdit');
const btnDelete = document.querySelector('#btnDelete');
const formDetails = document.querySelector('#orderForm');
const btnFinishOS = document.querySelector('#btnFinish');

// Campos de Informação da OS (Detalhes)
const imagemMaquina = document.querySelector('.order-details__image');
const statusOrdem = document.querySelector('#status_ordem');
const faseManutencao = document.querySelector('#fase_manutencao');
const tipoManutencao = document.querySelector('#tipo_manutencao');
const tecnicoResponsavel = document.querySelector('#tecnico_responsavel');
const dataPrevInicio = document.querySelector('#data_prev_inicio_manutencao');
const dataPrevTermino = document.querySelector('#data_prev_termino_manutencao');
const dataParada = document.querySelector('#data_parada');
const dataInicioReal = document.querySelector('#data_inicio');
const falhaIdentificada = document.querySelector('#falha');
const descricaoProblema = document.querySelector('#desc_problema');
const executeContainer = document.getElementById('execute-OS-section');
const camposExecucao = document.getElementById('campos_execucao');
const textareaDesc = document.getElementById('desc_manutencao');



// Modal: Edição
const editModal = document.querySelector('#updateModal');
const overlayUpdate = document.querySelector('#updateModalOverlay');
const btnCloseUpdate = document.querySelector('#btnCancelUpdate');
const btnCancelUpdate = document.querySelector('#btnCancelEditForm');

// Modal: Exclusão
const deleteModal = document.querySelector('.order-delete');
const btnCloseDelete = document.querySelector('#btnCancelDeleteHeader');
const btnCancelDelete = document.querySelector('#btnCancelDelete');
const btnConfirmDelete = document.querySelector('#btnConfirmDelete');

// Modal: Cadastro de OS
const bntCreate = document.querySelector('.home__button-register');
const createModal = document.querySelector('#createModal');
const modalOverlay = document.querySelector('#createModalOverlay');
const btnCloseModal = document.querySelector('#btnCancelCreate');
const btnCancelForm = document.querySelector('#btnCancelCreateForm');
const EditFalha = document.querySelector('#edit_falha')

// Formulário de Cadastro e Campos
const formCreateOrder = document.querySelector('#formCreateOrder');
const inputNumeroPatrimonio = document.querySelector('#create_numero_patrimonio');
const selectTipoManutencao = document.querySelector('#create_tipo_manutencao');
const inputTecnicoResponsavel = document.querySelector('#create_tecnico_responsavel');
const inputDataPrevInicio = document.querySelector('#create_data_prev_inicio');
const inputDataPrevTermino = document.querySelector('#create_data_prev_termino');
const inputDataParada = document.querySelector('#create_data_parada');
const inputFalha = document.querySelector('#create_falha');
const textareaDescProblema = document.querySelector('#create_desc_problema');

// Modal: Adicionar Falha
const btnAddFalha = document.querySelector('#btnAddFalha');
const falhaModal = document.querySelector('.fault-create');
const overlayFalha = document.querySelector('.fault-create__overlay');
const btnCloseFalha = document.querySelector('.fault-create__close-btn');
const btnCancelFalha = document.querySelector('#btnCancelCreateFaultForm');

// Variável de controle da OS selecionada
let idOrdemAtual = null;


// ==========================================
// FUNÇÕES DE CONTROLE DOS MODAIS
// ==========================================
const openOrderModal = () => orderModal.classList.add('active');
const closeOrderModal = () => orderModal.classList.remove('active');

const openDeleteModal = () => deleteModal.classList.add('active');
const closeDeleteModal = () => deleteModal.classList.remove('active');

const openCreateModal = () => createModal.classList.add('active');
const closeCreateModal = () => createModal.classList.remove('active');

const openFalhaModal = () => falhaModal.classList.add('active');
const closeFalhaModal = () => falhaModal.classList.remove('active');




// ==========================================
// FUNÇÃO AUXILIAR DE FORMATAR DATA
// ==========================================
function formatarDataPT(dataString) {
    if (!dataString) return '-';

    const data = new Date(dataString);
    if (isNaN(data.getTime())) return dataString;

    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const diaSemana = dias[data.getUTCDay()];
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = meses[data.getUTCMonth()];
    const ano = data.getUTCFullYear();
    const hora = String(data.getUTCHours()).padStart(2, '0');
    const min = String(data.getUTCMinutes()).padStart(2, '0');
    const seg = String(data.getUTCSeconds()).padStart(2, '0');

    return `${diaSemana}, ${dia} ${mes} ${ano} ${hora}:${min}:${seg}`;
}







// ==========================================
// MODAL: DETALHES DA ORDEM DE INSPEÇÃO
// ==========================================
const inspectionCards = document.querySelectorAll('.work-order--inspecao');
const inspectionModal = document.querySelector('#inspectionModal');
const inspectionModalOverlay = document.querySelector('#inspectionModalOverlay');
const btnCloseInspection = document.querySelector('#btnCloseInspection');
const btnCancelInspectionFooter = document.querySelector('#btnCancelInspectionFooter');
const btnEditInspection =  document.querySelector('#btnEditInspection')
const updateInspectionModal = document.querySelector('#updateInspectionModal')
const btnCancelUpdateInspection = document.querySelector('#btnCancelUpdateInspection')


const inspIdEl = document.querySelector('#insp_id');
const inspDataEl = document.querySelector('#insp_data');
const inspMaquinaEl = document.querySelector('#insp_maquina');
const inspPatrimonioEl = document.querySelector('#insp_patrimonio');
const inspResponsavelEl = document.querySelector('#insp_responsavel');
const inspDescricaoEl = document.querySelector('#insp_descricao');
const inspStatusBadgeEl = document.querySelector('#insp_status_badge');
const btnCancelEditInspectionForm = document.querySelector('#btnCancelEditInspectionForm')
const formUpdateInspection = document.querySelector('#formUpdateInspection')

const formAssignInspection = document.querySelector('#formAssignInspection');
const selectInspResponsavel = document.querySelector('#select_insp_responsavel');
const formFinishInspection = document.querySelector('#formFinishInspection');


const openInspectionModal = () => inspectionModal?.classList.add('active');
const closeInspectionModal = () => inspectionModal?.classList.remove('active');

const openEditInspectionModal = () => updateInspectionModal?.classList.add('active');
const closeEditInspectionModal = () => updateInspectionModal?.classList.remove('active');

btnEditInspection?.addEventListener('click', openEditInspectionModal)
btnCancelUpdateInspection.addEventListener('click', closeEditInspectionModal)
btnCancelEditInspectionForm.addEventListener('click', closeEditInspectionModal)
inspectionModalOverlay.addEventListener('click', closeEditInspectionModal)


// btnEditInspection.addEventListener('click', openEditInspectionModal)

// ==========================================
// EVENT LISTENERS E REGRAS DE NEGÓCIO
// ==========================================

// Destaca botão do filtro atual
filterButton.forEach(button => {
    if (button.getAttribute('href') === currentPath) {
        button.classList.add('active');
    }
});

// Busca e exibição dos dados da OS ou Inspeção ao clicar no card
workOrders.forEach(order => {
    order.addEventListener('click', async (event) => {
        const idOrder = event.currentTarget.getAttribute('id_order');
        const idInspecao = event.currentTarget.getAttribute('id_inspecao');

        if (!idOrder && !idInspecao) return;

        const resposta = await fetch('/api/get/ordens_servico/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            }
        });

        if (!resposta.ok) {
            alert("ERRO AO CARREGAR DADOS!");
            return;
        }

        const dados = await resposta.json();

        // 1. Fluxo de Ordem de Manutenção
        if (idOrder && dados.ordens_manutencao) {
            dados.ordens_manutencao.forEach(os => {
                if (os.id_ordem == idOrder) {
                    btnFinishOS.textContent = os.status_ordem == 'Pendente' ? 'Destinar Técnico' : 'Executar Ordem';
                    formDetails.action = os.status_ordem == 'Pendente' ? `/telaInicial/destinar/${os.id_ordem}` : `/telaInicial/finalizar-maintenance/${os.id_ordem}`;

                    if (os.status_ordem == 'Pendente') {
                        camposExecucao.style.display = 'none';
                        textareaDesc.required = false;
                        containerDestinate.classList.remove('is-hidden');
                        inputTecnicoResponsavel.required = true;
                    } else {
                        containerDestinate.classList.add('is-hidden');
                        camposExecucao.style.display = 'block';
                        textareaDesc.required = true;
                        inputTecnicoResponsavel.required = false;
                    }

                    statusOrdem.textContent = os.status_ordem;
                    faseManutencao.textContent = os.fase_manutencao;
                    tipoManutencao.textContent = os.tipo_manutencao;
                    tecnicoResponsavel.textContent = os.tecnico_responsavel;
                    dataPrevInicio.textContent = formatarDataPT(os.data_prev_inicio_manutencao);
                    dataPrevTermino.textContent = formatarDataPT(os.data_prev_termino_manutencao);
                    dataParada.textContent = formatarDataPT(os.data_parada);
                    dataInicioReal.textContent = formatarDataPT(os.data_inicio_manutencao);

                    falhaIdentificada.textContent = os.falha;
                    descricaoProblema.textContent = os.descricao_problema;
                    openOrderModal();
                }
            });
        }

        // 2. Fluxo de Ordem de Inspeção
        if (idInspecao && dados.ordens_inspecao) {
            dados.ordens_inspecao.forEach(insp => {
                if (insp.id_ordem_inspecao == idInspecao) {
                    formUpdateInspection.action = `/telaInicial/editar-inspecao/${insp.id_ordem_inspecao}`
                    inspIdEl.textContent = `#${insp.id_ordem_inspecao}`;
                    inspDataEl.textContent = formatarDataPT(insp.data_inspec);
                    inspMaquinaEl.textContent = insp.nome_maquina || '-';
                    inspPatrimonioEl.textContent = insp.numero_patrimonio || '-';
                    inspResponsavelEl.textContent = insp.tecnico_responsavel || insp.cpf || 'Não atribuído';
                    inspDescricaoEl.textContent = insp.descricao_inspecao || 'Sem descrição.';
                    inspStatusBadgeEl.textContent = insp.status_inspecao ? 'Ativa' : 'Concluída';

                    if (formAssignInspection) {
                        formAssignInspection.action = `/telaInicial/destinar-os-inspec/${insp.id_ordem_inspecao}`;
                        if (selectInspResponsavel && insp.cpf) {
                            selectInspResponsavel.value = insp.cpf;
                        }
                    }

                    if (formFinishInspection) {
                        formFinishInspection.action = `/telaInicial/finalizar-inspecao/${insp.id_ordem_inspecao}`;
                    }

                    openInspectionModal();
                }
            });
        }
    });
});
// Abertura dos Modais
btnEdit.addEventListener('click', openEditModal);
btnDelete.addEventListener('click', openDeleteModal);
bntCreate.addEventListener('click', openCreateModal);
btnAddFalha.addEventListener('click', openFalhaModal);

document.querySelectorAll('.alert.alert-sucesso').forEach(alerta => {
    const btnCloseAlert = alerta.querySelector('.btn-close');
    if (btnCloseAlert) {
        btnCloseAlert.addEventListener('click', () => alerta.remove());
    }
    setTimeout(() => alerta.remove(), 4000);
});



// Confirmação da Exclusão
if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', () => {
        closeDeleteModal();
        closeOrderModal();
    });
}


// ==========================================
// AGRUPAMENTO DE EVENTOS DE FECHAMENTO
// ==========================================

// Fechar Modal de Edição (Jinja dinâmico)
document.querySelectorAll('.btn-fechar-edicao, .order-edit__overlay').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.order-edit.active').forEach(modal => {
            modal.classList.remove('active');
        });
    });
});

// Fechar Modal de Detalhes da OS
[btnClose, overlayModal].forEach(el => {
    if (el) el.addEventListener('click', closeOrderModal);
});

// Fechar Modal de Exclusão
[btnCloseDelete, btnCancelDelete].forEach(el => {
    if (el) el.addEventListener('click', closeDeleteModal);
});

// Fechar Modal de Cadastro
[modalOverlay, btnCloseModal, btnCancelForm].forEach(el => {
    if (el) el.addEventListener('click', closeCreateModal);
});

// Fechar Modal de Cadastro de Falha
[btnCloseFalha, overlayFalha, btnCancelFalha].forEach(el => el.addEventListener('click', closeFalhaModal));

// Fechar Modal de Cadastro de Falha
[btnCloseInspection, inspectionModalOverlay].forEach(el => el.addEventListener('click', closeInspectionModal));



const btnAddPeca = document.getElementById('btnAddPecaCreate');
const inputNome = document.getElementById('input_peca');
const inputQtd = document.getElementById('input_peca_qtd');
const inputPreco = document.getElementById('input_peca_preco');
const listaPecas = document.getElementById('lista_pecas_cadastradas');



document.addEventListener('DOMContentLoaded', () => {
    const checkSolicitarPecas = document.getElementById('check_solicitar_pecas');
    const containerSolicitarPecas = document.getElementById('container_solicitar_pecas');
    const listaPecas = document.getElementById('lista_pecas_requisicao');
    const btnAddPeca = document.getElementById('btnAddPeca');

    // 1. Controla a exibição do container ao marcar/desmarcar o checkbox
    if (checkSolicitarPecas) {
        checkSolicitarPecas.addEventListener('change', () => {
            if (checkSolicitarPecas.checked) {
                containerSolicitarPecas.style.display = 'block';
                atualizarRequiredPecas(true);
            } else {
                containerSolicitarPecas.style.display = 'none';
                atualizarRequiredPecas(false);
                resetarListaPecas();
            }
        });
    }

    // 2. Adiciona uma nova linha de peça ao clicar em "Adicionar outra peça"
    if (btnAddPeca) {
        btnAddPeca.addEventListener('click', () => {
            const novaLinha = criarLinhaPeca();
            listaPecas.appendChild(novaLinha);
        });
    }

    // 3. Remove uma linha de peça usando delegação de eventos
    if (listaPecas) {
        listaPecas.addEventListener('click', (event) => {
            const btnRemover = event.target.closest('.order-create__btn--remove-peca');
            if (!btnRemover) return;

            const linhas = listaPecas.querySelectorAll('.order-create__peca-row');

            if (linhas.length > 1) {
                btnRemover.closest('.order-create__peca-row').remove();
            } else {
                const linhaUnica = linhas[0];
                linhaUnica.querySelector('input[name="peca_nome[]"]').value = '';
                linhaUnica.querySelector('input[name="peca_quantidade[]"]').value = '1';
            }
        });
    }

    function criarLinhaPeca() {
        const divRow = document.createElement('div');
        divRow.classList.add('order-create__peca-row');

        divRow.innerHTML = `
            <div class="order-create__field">
                <label class="order-create__label">Nome / Descrição da Peça</label>
                <input class="order-create__input" type="text" name="peca_nome[]"
                    placeholder="Ex: Rolamento 6205" required>
            </div>
            <div class="order-create__field order-create__field--qtd">
                <label class="order-create__label">Qtd.</label>
                <input class="order-create__input" type="number" name="peca_quantidade[]"
                    min="1" value="1" required>
            </div>
            <button type="button" class="order-create__btn--remove-peca" title="Remover peça">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;

        return divRow;
    }

    function atualizarRequiredPecas(isRequired) {
        const inputsNome = listaPecas.querySelectorAll('input[name="peca_nome[]"]');
        const inputsQtd = listaPecas.querySelectorAll('input[name="peca_quantidade[]"]');

        inputsNome.forEach(input => input.required = isRequired);
        inputsQtd.forEach(input => input.required = isRequired);
    }

    function resetarListaPecas() {
        const linhas = listaPecas.querySelectorAll('.order-create__peca-row');
        linhas.forEach((linha, index) => {
            if (index > 0) {
                linha.remove();
            } else {
                linha.querySelector('input[name="peca_nome[]"]').value = '';
                linha.querySelector('input[name="peca_quantidade[]"]').value = '1';
            }
        });
    }
});


// ==========================================
// DIFERENCIAÇÃO DE ORDENS E VALIDAÇÃO DE DADOS
// ==========================================
containerInspecForm.classList.add('is-hidden')

inputOrderInspection.addEventListener('input', () => {
    formCreateOrder.action = '/telaInicial/post-register-order-inspec'
    containerInspecForm.classList.remove('is-hidden')
    containerMaintanece.classList.add('is-hidden');
})
inputOrderMaintanence.addEventListener('input', () => {
    formCreateOrder.action = '/telaInicial/post-register-order-maintenance'
    containerInspecForm.classList.add('is-hidden');
    containerMaintanece.classList.remove('is-hidden')

})


selectTipoManutencao.addEventListener('change', () => {
    if (selectTipoManutencao.value == 'Corretiva') {
        containerStopMachine.classList.remove('is-hidden')
    } else {
        containerStopMachine.classList.add('is-hidden')
    }

})
if (containerDataParada) containerDataParada.classList.add('is-hidden');


containerDataParada.classList.add('is-hidden')
inputDateStop.addEventListener('input', () => {
    if (!inputDateStop.checked) {
        containerDataParada.classList.add('is-hidden')
    }
    else {
        containerDataParada.classList.remove('is-hidden')
    }
})


const switcherTrack = document.getElementById('switcherTrack');

containerInspec.hidden = true;
containerInspec.classList.add('is-hidden');

btnInspec.addEventListener('click', () => {

    btnInspec.classList.add('is-active');
    btnServico.classList.remove('is-active');

    switcherTrack.classList.add('is-inspecao');

    containerServico.hidden = true;
    containerServico.classList.add('is-hidden');

    containerInspec.hidden = false;
    containerInspec.classList.remove('is-hidden');
});

btnServico.addEventListener('click', () => {

    btnServico.classList.add('is-active');
    btnInspec.classList.remove('is-active');

    switcherTrack.classList.remove('is-inspecao');

    containerInspec.hidden = true;
    containerInspec.classList.add('is-hidden');

    containerServico.hidden = false;
    containerServico.classList.remove('is-hidden');
    EditFalha.required = true});