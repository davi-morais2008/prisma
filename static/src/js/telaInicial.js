// ==========================================
// 1. SELEÇÃO DOS ELEMENTOS DO DOM
// ==========================================

// Elementos Principais, Filtros e Switcher
const workOrders = document.querySelectorAll('.work-order');
const filterButton = document.querySelectorAll('.filter-button');
const currentPath = window.location.pathname;


const editStatusOrdem = document.querySelector('#edit_status_ordem');
const editFaseManutencao = document.querySelector('#edit_fase_manutencao');
const editDataInicio = document.querySelector('#edit_data_inicio');
const editDataParada = document.querySelector('#edit_data_parada');


const btnInspec = document.querySelector('#btnTabInspecao');
const btnServico = document.querySelector('#btnTabServico');
const containerInspec = document.querySelector('#container-ordens-inspecao');
const containerServico = document.querySelector('#container-ordens-servico');
const switcherTrack = document.getElementById('switcherTrack');
const inputTech = document.getElementById('search-bar');

// Formulário de Cadastro (Diferenciação Manutenção vs Inspeção)
const formCreateOrder = document.querySelector('#formCreateOrder');
const inputOrderMaintanence = document.getElementById('tipo_ordem_manutencao');
const inputOrderInspection = document.getElementById('tipo_ordem_inspecao');
const containerInspecForm = document.querySelector('#container_ordem_inspecao');
const containerMaintanece = document.querySelector('#container_ordem_manutencao');
const containerStopMachine = document.querySelector('#grupo_parada_maquina');
const containerDataParada = document.querySelector('#campo_data_parada');
const inputDateStop = document.querySelector('#check_maquina_parada');
const selectTipoManutencao = document.querySelector('#create_tipo_manutencao');
const inputFalhaCreate = document.querySelector('#create_falha');
const inputNumberMachine = document.querySelector('#create_numero_patrimonio');
const inputModelMachine = document.querySelector('#create_modelo_maquina');

// Requisição de Peças no Cadastro
const checkSolicitarPecas = document.getElementById('check_solicitar_pecas');
const containerSolicitarPecas = document.getElementById('container_solicitar_pecas');
const listaPecas = document.getElementById('lista_pecas_requisicao');
const btnAddPeca = document.getElementById('btnAddPeca');

// Modal: Detalhes da OS (Manutenção)
const orderModal = document.querySelector('#orderModalMaintenance');
const overlayModal = document.querySelector('#modalOverlay');
const btnClose = document.querySelector('#btnClose');
const btnEdit = document.querySelector('#btnEdit');
const btnDelete = document.querySelector('#btnDelete');
const formDetails = document.querySelector('#orderForm');
const btnFinishOS = document.querySelector('#btnFinish');
const containerDestinate = document.getElementById('containerDestinate');

// Peças na Destinação e Execução (Detalhes da OS)
const containerPecasDestinar = document.getElementById('container_pecas_destinar');
const listaPecasDestinar = document.getElementById('lista_pecas_destinar');
const checkConfirmarPecas = document.getElementById('check_confirmar_pecas');
const listaPecasCadastradas = document.getElementById('lista_pecas_cadastradas');

// Campos de Informação da OS (Detalhes)
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
const camposExecucao = document.getElementById('campos_execucao');
const textareaDesc = document.getElementById('desc_manutencao');
const inputTecnicoResponsavel = document.querySelector('#create_tecnico_responsavel');

// Modal Único: Edição da Ordem de Manutenção
const updateMaintenanceModal = document.querySelector('#updateMaintenanceModal');
const updateMaintenanceOverlay = document.querySelector('#updateMaintenanceOverlay');
const formUpdateMaintenance = document.querySelector('#formUpdateMaintenance');
const orderEditTitle = document.querySelector('#orderEditTitle');
const editTipoManutencao = document.querySelector('#edit_tipo_manutencao');
const editTecnicoResponsavel = document.querySelector('#edit_tecnico_responsavel');
const editPrevInicio = document.querySelector('#edit_prev_inicio');
const editPrevTermino = document.querySelector('#edit_prev_termino');
const editCheckParada = document.querySelector('#edit_check_parada');
const editFalha = document.querySelector('#edit_falha');
const editDescProblema = document.querySelector('#edit_desc_problema');
const editCheckPecas = document.querySelector('#edit_check_pecas');
const editContainerPecas = document.querySelector('#edit_container_pecas');
const editListaPecas = document.querySelector('#edit_lista_pecas');
const btnAddPecaEdit = document.querySelector('#btnAddPecaEdit');

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

// Modal: Adicionar Falha
const btnAddFalha = document.querySelector('#btnAddFalha');
const falhaModal = document.querySelector('.fault-create');
const overlayFalha = document.querySelector('.fault-create__overlay');
const btnCloseFalha = document.querySelector('.fault-create__close-btn');
const btnCancelFalha = document.querySelector('#btnCancelCreateFaultForm');

// Modal: Detalhes e Edição da Ordem de Inspeção
const inspectionModal = document.querySelector('#inspectionModal');
const inspectionModalOverlay = document.querySelector('#inspectionModalOverlay');
const btnCloseInspection = document.querySelector('#btnCloseInspection');
const btnCancelInspectionFooter = document.querySelector('#btnCancelInspectionFooter');

const btnEditInspection = document.querySelector('#btnEditInspection');
const updateInspectionModal = document.querySelector('#updateInspectionModal');
const updateInspectionOverlay = document.querySelector('#updateInspectionOverlay');
const btnCancelUpdateInspection = document.querySelector('#btnCancelUpdateInspection');
const btnCancelEditInspectionForm = document.querySelector('#btnCancelEditInspectionForm');
const formUpdateInspection = document.querySelector('#formUpdateInspection');

const inspIdEl = document.querySelector('#insp_id');
const inspDataEl = document.querySelector('#insp_data');
const inspMaquinaEl = document.querySelector('#insp_maquina');
const inspPatrimonioEl = document.querySelector('#insp_patrimonio');
const inspResponsavelEl = document.querySelector('#insp_responsavel');
const inspSolicitanteEl = document.querySelector('#insp_solicitante');
const inspDescricaoEl = document.querySelector('#insp_descricao');
const inspStatusBadgeEl = document.querySelector('#insp_status_badge');

const formAssignInspection = document.querySelector('#formAssignInspection');
const selectInspResponsavel = document.querySelector('#select_insp_responsavel');
const formFinishInspection = document.querySelector('#formFinishInspection');

// Variáveis de controle da ordem selecionada e cache da API
let idOrdemAtual = null;
let osAtualSelecionada = null;
let inspecaoAtualSelecionada = null;
let dadosApiCompletos = null;


// ==========================================
// 2. FUNÇÕES DE CONTROLE DOS MODAIS
// ==========================================
const openOrderModal = () => orderModal?.classList.add('active');
const closeOrderModal = () => orderModal?.classList.remove('active');

const openDeleteModal = () => deleteModal?.classList.add('active');
const closeDeleteModal = () => deleteModal?.classList.remove('active');

const openCreateModal = () => createModal?.classList.add('active');
const closeCreateModal = () => createModal?.classList.remove('active');

const openFalhaModal = () => falhaModal?.classList.add('active');
const closeFalhaModal = () => falhaModal?.classList.remove('active');

const openInspectionModal = () => inspectionModal?.classList.add('active');
const closeInspectionModal = () => inspectionModal?.classList.remove('active');

const openEditInspectionModal = () => updateInspectionModal?.classList.add('active');
const closeEditInspectionModal = () => updateInspectionModal?.classList.remove('active');

const openEditMaintenanceModal = () => updateMaintenanceModal?.classList.add('active');
const closeEditMaintenanceModal = () => updateMaintenanceModal?.classList.remove('active');

// Filtro dinâmico de máquina e falhas no Cadastro
if (createModal && inputNumberMachine) {
    const optionMolde = document.createElement('option');

    inputNumberMachine.addEventListener('change', async () => {
        const numberMachine = inputNumberMachine.value;

        if (!numberMachine) {
            if (inputModelMachine) inputModelMachine.value = '';
            if (inputFalhaCreate) {
                inputFalhaCreate.innerHTML = '<option value="" disabled selected>Selecione a falha...</option>';
            }
            return;
        }

        try {
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
            dadosApiCompletos = dados;
            const maquinas = dados.maquinas || [];
            const falhas = dados.falhas_maquinas || [];

            const machine = maquinas.find(maquina => String(maquina.numero_patrimonio) === String(numberMachine));

            if (machine) {
                if (inputModelMachine) {
                    inputModelMachine.value = machine.modelo_maquina || '';
                }

                if (inputFalhaCreate) {
                    inputFalhaCreate.innerHTML = '<option value="" disabled selected>Selecione a falha...</option>';
                    for (let i = 0; i < falhas.length; i++) {
                        if (String(falhas[i].id_tipo_maquina) === String(machine.id_tipo_maquina)) {
                            const optionClone = optionMolde.cloneNode(true);
                            optionClone.value = falhas[i].id_falha;
                            optionClone.textContent = falhas[i].falha;
                            optionClone.dataset.tipoMaquina = falhas[i].id_tipo_maquina;

                            inputFalhaCreate.appendChild(optionClone);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao buscar máquina e falhas:", error);
        }
    });
}


// ==========================================
// 3. FUNÇÕES AUXILIARES DE DATA
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

function formatarParaDatetimeLocal(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    if (isNaN(data.getTime())) return '';

    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const hora = String(data.getUTCHours()).padStart(2, '0');
    const min = String(data.getUTCMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${min}`;
}

function formatarParaInputDate(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    if (isNaN(data.getTime())) return '';

    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(data.getUTCDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}


// ==========================================
// 4. FILTROS E SWITCHER DE ABAS (SERVIÇO x INSPEÇÃO)
// ==========================================
filterButton.forEach(button => {
    if (button.getAttribute('href') === currentPath) {
        button.classList.add('active');
    }
});

if (containerInspec) {
    containerInspec.hidden = true;
    containerInspec.classList.add('is-hidden');
}

btnInspec?.addEventListener('click', () => {
    btnInspec.classList.add('is-active');
    btnServico?.classList.remove('is-active');
    switcherTrack?.classList.add('is-inspecao');

    if (containerServico) {
        containerServico.hidden = true;
        containerServico.classList.add('is-hidden');
    }
    if (containerInspec) {
        containerInspec.hidden = false;
        containerInspec.classList.remove('is-hidden');
    }
});

btnServico?.addEventListener('click', () => {
    btnServico.classList.add('is-active');
    btnInspec?.classList.remove('is-active');
    switcherTrack?.classList.remove('is-inspecao');

    if (containerInspec) {
        containerInspec.hidden = true;
        containerInspec.classList.add('is-hidden');
    }
    if (containerServico) {
        containerServico.hidden = false;
        containerServico.classList.remove('is-hidden');
    }
});


// ==========================================
// 5. CLIQUE NOS CARDS: CARREGAR DADOS E ABRIR MODAL
// ==========================================
workOrders.forEach(order => {
    order.addEventListener('click', async (event) => {
        const idOrder = event.currentTarget.getAttribute('id_order');
        const idInspecao = event.currentTarget.getAttribute('id_inspecao');

        if (!idOrder && !idInspecao) return;

        try {
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
            dadosApiCompletos = dados;

            // 1. Fluxo de Ordem de Manutenção
            if (idOrder && dados.ordens_manutencao) {
                const os = dados.ordens_manutencao.find(item => String(item.id_ordem) === String(idOrder));
                if (!os) return;

                osAtualSelecionada = os;
                idOrdemAtual = os.id_ordem;

                const pecasDaOS = (dados.peca_requisicoes || []).filter(
                    p => String(p.id_ordem) === String(os.id_ordem)
                );

                const ehPendente = String(os.status_ordem || '').trim().toLowerCase() === 'pendente';

                if (btnFinishOS) {
                    btnFinishOS.textContent = ehPendente ? 'Destinar Técnico' : 'Executar Ordem';
                }
                if (formDetails) {
                    formDetails.action = ehPendente
                        ? `/telaInicial/destinar-os-maintenance/${os.id_ordem}`
                        : `/telaInicial/finalizar-maintenance/${os.id_ordem}`;
                }

                if (ehPendente) {
                    if (camposExecucao) camposExecucao.style.display = 'none';
                    if (textareaDesc) textareaDesc.required = false;

                    if (containerDestinate) {
                        containerDestinate.classList.remove('is-hidden');
                        containerDestinate.style.display = '';
                    }
                    if (inputTecnicoResponsavel) inputTecnicoResponsavel.required = true;

                    if (pecasDaOS.length > 0 && containerPecasDestinar && listaPecasDestinar) {
                        containerPecasDestinar.classList.remove('is-hidden');
                        containerPecasDestinar.style.display = 'flex';

                        listaPecasDestinar.innerHTML = pecasDaOS.map(peca => `
                            <div class="order-details__part-quote-item">
                                <input type="hidden" name="id_requisicao[]" value="${peca.id_requisicao}">
                                <div class="order-details__part-quote-info">
                                    <strong class="order-details__part-quote-name">${peca.nome_peca}</strong>
                                    <span class="order-details__part-quote-qty">Quantidade: ${peca.quantidade} un.</span>
                                </div>
                                <div class="order-details__part-quote-input-group">
                                    <label class="order-details__part-quote-label" for="custo_${peca.id_requisicao}">Valor unitário (R$)</label>
                                    <input
                                        id="custo_${peca.id_requisicao}"
                                        class="order-create__input input-custo-peca"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        name="custo_unitario[]"
                                        placeholder="0,00"
                                        value="${peca.custo_unitario ?? ''}"
                                        required
                                    >
                                </div>
                            </div>
                        `).join('');

                        if (checkConfirmarPecas) {
                            checkConfirmarPecas.checked = false;
                            checkConfirmarPecas.required = true;
                        }
                    } else {
                        if (containerPecasDestinar) {
                            containerPecasDestinar.classList.add('is-hidden');
                            containerPecasDestinar.style.display = 'none';
                        }
                        if (listaPecasDestinar) listaPecasDestinar.innerHTML = '';
                        if (checkConfirmarPecas) {
                            checkConfirmarPecas.checked = false;
                            checkConfirmarPecas.required = false;
                        }
                    }
                } else {
                    if (containerDestinate) {
                        containerDestinate.classList.add('is-hidden');
                        containerDestinate.style.display = 'none';
                    }
                    if (containerPecasDestinar) {
                        containerPecasDestinar.classList.add('is-hidden');
                        containerPecasDestinar.style.display = 'none';
                    }
                    if (listaPecasDestinar) listaPecasDestinar.innerHTML = '';
                    if (checkConfirmarPecas) checkConfirmarPecas.required = false;

                    if (camposExecucao) camposExecucao.style.display = 'block';
                    if (textareaDesc) textareaDesc.required = true;
                    if (inputTecnicoResponsavel) inputTecnicoResponsavel.required = false;

                    if (listaPecasCadastradas) {
                        listaPecasCadastradas.innerHTML = pecasDaOS.length > 0
                            ? pecasDaOS.map(p => `<li>${p.nome_peca} — Qtd: ${p.quantidade}${p.custo_unitario ? ` (R$ ${Number(p.custo_unitario).toFixed(2)})` : ''}</li>`).join('')
                            : '<li>Nenhuma peça requisitada para esta OS.</li>';
                    }
                }

                if (statusOrdem) statusOrdem.textContent = os.status_ordem;
                if (faseManutencao) faseManutencao.textContent = os.fase_manutencao;
                if (tipoManutencao) tipoManutencao.textContent = os.tipo_manutencao;
                if (tecnicoResponsavel) tecnicoResponsavel.textContent = os.tecnico_responsavel || 'Não atribuído';
                if (dataPrevInicio) dataPrevInicio.textContent = formatarDataPT(os.data_prev_inicio_manutencao);
                if (dataPrevTermino) dataPrevTermino.textContent = formatarDataPT(os.data_prev_termino_manutencao);
                if (dataParada) dataParada.textContent = formatarDataPT(os.data_parada);
                if (dataInicioReal) dataInicioReal.textContent = formatarDataPT(os.data_inicio_manutencao);

                if (falhaIdentificada) falhaIdentificada.textContent = os.falha;
                if (descricaoProblema) descricaoProblema.textContent = os.descricao_problema;

                openOrderModal();
            }

            // 2. Fluxo de Ordem de Inspeção
            if (idInspecao && dados.ordens_inspecao) {
                const insp = dados.ordens_inspecao.find(item => String(item.id_ordem_inspecao) === String(idInspecao));
                if (!insp) return;

                inspecaoAtualSelecionada = insp;

                if (formUpdateInspection) {
                    formUpdateInspection.action = `/telaInicial/editar-inspecao/${insp.id_ordem_inspecao}`;
                }
                if (inspIdEl) inspIdEl.textContent = `#${insp.id_ordem_inspecao}`;
                if (inspDataEl) inspDataEl.textContent = formatarDataPT(insp.data_inspec);
                if (inspMaquinaEl) inspMaquinaEl.textContent = insp.nome_maquina || '-';
                if (inspPatrimonioEl) inspPatrimonioEl.textContent = insp.numero_patrimonio || '-';
                if (inspResponsavelEl) inspResponsavelEl.textContent = insp.tecnico_responsavel || 'Não atribuído';
                if (inspSolicitanteEl) inspSolicitanteEl.textContent = insp.nome_solicitante || '-';
                if (inspDescricaoEl) inspDescricaoEl.textContent = insp.descricao_inspecao || 'Sem descrição.';
                if (inspStatusBadgeEl) inspStatusBadgeEl.textContent = insp.status_inspecao || 'Ativa';

                if (formAssignInspection) {
                    formAssignInspection.action = `/telaInicial/destinar-os-inspec/${insp.id_ordem_inspecao}`;
                    if (selectInspResponsavel) {
                        selectInspResponsavel.value = insp.cpf || '';
                    }
                }

                if (formFinishInspection) {
                    formFinishInspection.action = `/telaInicial/finalizar-inspecao/${insp.id_ordem_inspecao}`;
                }

                openInspectionModal();
            }
        } catch (erro) {
            console.error("Erro ao carregar detalhes:", erro);
        }
    });
});

// Validação de peças antes de destinar o técnico
formDetails?.addEventListener('submit', (event) => {
    const ehPendente = String(osAtualSelecionada?.status_ordem || '').trim().toLowerCase() === 'pendente';

    if (
        ehPendente &&
        containerPecasDestinar &&
        !containerPecasDestinar.classList.contains('is-hidden')
    ) {
        const inputsCusto = listaPecasDestinar.querySelectorAll('.input-custo-peca');
        const algumSemValor = Array.from(inputsCusto).some(inp => !inp.value || parseFloat(inp.value) <= 0);

        if (algumSemValor || !checkConfirmarPecas?.checked) {
            event.preventDefault();
            alert('Informe o valor unitário de todas as peças e marque a confirmação antes de destinar o técnico.');
        }
    }
});


// ==========================================
// 6. ABERTURA E PREENCHIMENTO DOS MODAIS DE EDIÇÃO / AÇÕES
// ==========================================

// Função auxiliar para renderizar linha de peça no modal de edição
function criarLinhaPecaEdicao(nomePeca = '', quantidade = 1) {
    const divRow = document.createElement('div');
    divRow.classList.add('order-create__peca-row');
    divRow.innerHTML = `
        <div class="order-create__field">
            <label class="order-create__label">Nome / Descrição da Peça</label>
            <input class="order-create__input" type="text" name="peca_nome[]" value="${nomePeca}" placeholder="Ex: Rolamento 6205" required>
        </div>
        <div class="order-create__field order-create__field--qtd">
            <label class="order-create__label">Qtd.</label>
            <input class="order-create__input" type="number" name="peca_quantidade[]" min="1" value="${quantidade}" required>
        </div>
        <button type="button" class="order-create__btn--remove-peca" title="Remover peça">
            <span class="material-symbols-outlined">delete</span>
        </button>
    `;
    return divRow;
}

function sincronizarContainerPecasEdicao() {
    if (!editCheckPecas || !editContainerPecas || !editListaPecas) return;

    if (editCheckPecas.checked) {
        editContainerPecas.classList.remove('is-hidden');
        editContainerPecas.style.display = 'block';
        if (editListaPecas.children.length === 0) {
            editListaPecas.appendChild(criarLinhaPecaEdicao());
        }
        editListaPecas.querySelectorAll('input').forEach(inp => inp.required = true);
    } else {
        editContainerPecas.classList.add('is-hidden');
        editContainerPecas.style.display = 'none';
        editListaPecas.innerHTML = '';
    }
}

editCheckPecas?.addEventListener('change', sincronizarContainerPecasEdicao);

btnAddPecaEdit?.addEventListener('click', () => {
    if (editCheckPecas?.checked && editListaPecas) {
        editListaPecas.appendChild(criarLinhaPecaEdicao());
    }
});

editListaPecas?.addEventListener('click', (event) => {
    const btnRemover = event.target.closest('.order-create__btn--remove-peca');
    if (!btnRemover) return;

    const linhas = editListaPecas.querySelectorAll('.order-create__peca-row');
    if (linhas.length > 1) {
        btnRemover.closest('.order-create__peca-row').remove();
    } else {
        linhas[0].querySelector('input[name="peca_nome[]"]').value = '';
        linhas[0].querySelector('input[name="peca_quantidade[]"]').value = '1';
    }
});

btnEdit?.addEventListener('click', () => {
    if (!osAtualSelecionada || !updateMaintenanceModal) return;

    const os = osAtualSelecionada;
    const dados = dadosApiCompletos || {};

    // 1. Action exata da sua rota Flask e título
    if (formUpdateMaintenance) {
        formUpdateMaintenance.action = `/telaIncial/atualizar_ordem/${os.id_ordem}`;
    }
    if (orderEditTitle) {
        orderEditTitle.textContent = `EDITAR ORDEM DE MANUTENÇÃO #${os.id_ordem}`;
    }

    // 2. Status, Fase e Tipo de Manutenção
    if (editStatusOrdem) editStatusOrdem.value = os.status_ordem || 'Pendente';
    if (editFaseManutencao) editFaseManutencao.value = os.fase_manutencao || 'Aguardando Início';
    if (editTipoManutencao) editTipoManutencao.value = os.tipo_manutencao || 'Corretiva';

    // 3. Técnico Responsável
    if (editTecnicoResponsavel) {
        editTecnicoResponsavel.innerHTML = '<option value="">Não atribuído</option>';
        const listaTecnicos = dados.tecnicos || dados.usuarios || [];

        if (listaTecnicos.length > 0) {
            listaTecnicos.forEach(tec => {
                if (!tec.rbac || tec.rbac === 'usuario') {
                    const opt = document.createElement('option');
                    opt.value = tec.cpf;
                    opt.textContent = tec.nome;
                    editTecnicoResponsavel.appendChild(opt);
                }
            });
        } else if (inputTecnicoResponsavel) {
            Array.from(inputTecnicoResponsavel.options).forEach(opt => {
                if (opt.value) editTecnicoResponsavel.appendChild(opt.cloneNode(true));
            });
        }

        editTecnicoResponsavel.value = os.cpf || '';
    }

    // 4. Cronograma e Datas (DATE no MySQL)
    if (editPrevInicio) editPrevInicio.value = formatarParaInputDate(os.data_prev_inicio_manutencao);
    if (editPrevTermino) editPrevTermino.value = formatarParaInputDate(os.data_prev_termino_manutencao);
    if (editDataInicio) editDataInicio.value = formatarParaInputDate(os.data_inicio_manutencao);
    if (editDataParada) editDataParada.value = formatarParaInputDate(os.data_parada);

    // 5. Falha Identificada filtrada pelo tipo de máquina
    if (editFalha) {
        editFalha.innerHTML = '<option value="" disabled>Selecione a falha...</option>';
        const falhas = dados.falhas_maquinas || [];
        const maquinas = dados.maquinas || [];

        let tipoMaquinaAtual = os.id_tipo_maquina ? String(os.id_tipo_maquina) : '';
        if (!tipoMaquinaAtual && os.id_maquina) {
            const maq = maquinas.find(m => String(m.id_maquina) === String(os.id_maquina));
            if (maq) tipoMaquinaAtual = String(maq.id_tipo_maquina);
        }

        const falhaAtualId = os.id_falha ? String(os.id_falha) : '';
        const optionMolde = document.createElement('option');

        for (let i = 0; i < falhas.length; i++) {
            const pertenceAMaquina = !tipoMaquinaAtual || String(falhas[i].id_tipo_maquina) === tipoMaquinaAtual;
            const ehAFalhaAtual = String(falhas[i].id_falha) === falhaAtualId;

            if (pertenceAMaquina || ehAFalhaAtual) {
                const optionClone = optionMolde.cloneNode(true);
                optionClone.value = falhas[i].id_falha;
                optionClone.textContent = falhas[i].falha;
                optionClone.dataset.tipoMaquina = falhas[i].id_tipo_maquina || '';
                editFalha.appendChild(optionClone);
            }
        }

        editFalha.value = falhaAtualId;
    }

    // 6. Descrição do Problema
    if (editDescProblema) {
        editDescProblema.value = os.descricao_problema || '';
    }

    // 7. Peças Requisitadas
    const pecasDaOS = (dados.peca_requisicoes || []).filter(
        p => String(p.id_ordem) === String(os.id_ordem)
    );

    if (editCheckPecas && editListaPecas) {
        editListaPecas.innerHTML = '';
        if (pecasDaOS.length > 0) {
            editCheckPecas.checked = true;
            pecasDaOS.forEach(p => {
                editListaPecas.appendChild(criarLinhaPecaEdicao(p.nome_peca, p.quantidade));
            });
        } else {
            editCheckPecas.checked = false;
        }
        sincronizarContainerPecasEdicao();
    }

    openEditMaintenanceModal();
});

// Clique em Editar Ordem de Inspeção
btnEditInspection?.addEventListener('click', () => {
    if (inspecaoAtualSelecionada) {
        const editInspStatus = document.querySelector('#edit_insp_status');
        const editInspResponsavel = document.querySelector('#edit_insp_responsavel');
        const editInspData = document.querySelector('#edit_insp_data');
        const editInspDescricao = document.querySelector('#edit_insp_descricao');

        if (editInspStatus) editInspStatus.value = inspecaoAtualSelecionada.status_inspecao || 'Ativa';
        if (editInspResponsavel) editInspResponsavel.value = inspecaoAtualSelecionada.cpf || '';
        if (editInspData) editInspData.value = formatarParaInputDate(inspecaoAtualSelecionada.data_inspec);
        if (editInspDescricao) editInspDescricao.value = inspecaoAtualSelecionada.descricao_inspecao || '';
    }

    openEditInspectionModal();
});

btnDelete?.addEventListener('click', openDeleteModal);
btnAddFalha?.addEventListener('click', openFalhaModal);
document.querySelectorAll('.btn-add-falha-edit').forEach(btn => btn.addEventListener('click', openFalhaModal));

btnConfirmDelete?.addEventListener('click', () => {
    closeDeleteModal();
    closeOrderModal();
});

// Alerta flash auto-dismiss
document.querySelectorAll('.alert.alert-sucesso').forEach(alerta => {
    const btnCloseAlert = alerta.querySelector('.btn-close');
    btnCloseAlert?.addEventListener('click', () => alerta.remove());
    setTimeout(() => alerta.remove(), 4000);
});


// ==========================================
// 7. AGRUPAMENTO DE EVENTOS DE FECHAMENTO
// ==========================================
[btnClose, overlayModal].forEach(el => el?.addEventListener('click', closeOrderModal));
[btnCloseDelete, btnCancelDelete].forEach(el => el?.addEventListener('click', closeDeleteModal));
[btnCloseFalha, overlayFalha, btnCancelFalha].forEach(el => el?.addEventListener('click', closeFalhaModal));
[btnCloseInspection, btnCancelInspectionFooter, inspectionModalOverlay].forEach(el => el?.addEventListener('click', closeInspectionModal));
[updateInspectionOverlay, btnCancelUpdateInspection, btnCancelEditInspectionForm].forEach(el => el?.addEventListener('click', closeEditInspectionModal));
[updateMaintenanceOverlay].forEach(el => el?.addEventListener('click', closeEditMaintenanceModal));

document.querySelectorAll('.btn-fechar-edicao, .order-edit__overlay').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.order-edit.active').forEach(modal => modal.classList.remove('active'));
    });
});


// ==========================================
// 8. REQUISIÇÃO DINÂMICA DE PEÇAS NO CADASTRO
// ==========================================
function atualizarRequiredPecas(isRequired) {
    listaPecas?.querySelectorAll('input[name="peca_nome[]"]').forEach(input => input.required = isRequired);
    listaPecas?.querySelectorAll('input[name="peca_quantidade[]"]').forEach(input => input.required = isRequired);
}

function resetarListaPecas() {
    const linhas = listaPecas?.querySelectorAll('.order-create__peca-row') || [];
    linhas.forEach((linha, index) => {
        if (index > 0) {
            linha.remove();
        } else {
            const inputNome = linha.querySelector('input[name="peca_nome[]"]');
            const inputQtd = linha.querySelector('input[name="peca_quantidade[]"]');
            if (inputNome) inputNome.value = '';
            if (inputQtd) inputQtd.value = '1';
        }
    });
}

function sincronizarContainerPecas() {
    if (!checkSolicitarPecas || !containerSolicitarPecas) return;

    if (checkSolicitarPecas.checked) {
        containerSolicitarPecas.classList.remove('is-hidden');
        containerSolicitarPecas.style.display = 'block';
        atualizarRequiredPecas(true);
    } else {
        containerSolicitarPecas.classList.add('is-hidden');
        containerSolicitarPecas.style.display = 'none';
        atualizarRequiredPecas(false);
        resetarListaPecas();
    }
}

// Garante que o container comece oculto ao carregar a tela
sincronizarContainerPecas();

// Escuta marcação/desmarcação do checkbox
checkSolicitarPecas?.addEventListener('change', sincronizarContainerPecas);

// Garante verificação ao abrir e fechar o modal de cadastro
bntCreate?.addEventListener('click', () => {
    if (checkSolicitarPecas) checkSolicitarPecas.checked = false;
    sincronizarContainerPecas();
    openCreateModal();
});

[modalOverlay, btnCloseModal, btnCancelForm].forEach(el => {
    el?.addEventListener('click', () => {
        if (checkSolicitarPecas) checkSolicitarPecas.checked = false;
        sincronizarContainerPecas();
        closeCreateModal();
    });
});

btnAddPeca?.addEventListener('click', () => {
    if (checkSolicitarPecas?.checked && listaPecas) {
        listaPecas.appendChild(criarLinhaPeca());
    }
});

listaPecas?.addEventListener('click', (event) => {
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

function criarLinhaPeca() {
    const divRow = document.createElement('div');
    divRow.classList.add('order-create__peca-row');
    divRow.innerHTML = `
        <div class="order-create__field">
            <label class="order-create__label">Nome / Descrição da Peça</label>
            <input class="order-create__input" type="text" name="peca_nome[]" placeholder="Ex: Rolamento 6205" required>
        </div>
        <div class="order-create__field order-create__field--qtd">
            <label class="order-create__label">Qtd.</label>
            <input class="order-create__input" type="number" name="peca_quantidade[]" min="1" value="1" required>
        </div>
        <button type="button" class="order-create__btn--remove-peca" title="Remover peça">
            <span class="material-symbols-outlined">delete</span>
        </button>
    `;
    return divRow;
}


// ==========================================
// 9. DIFERENCIAÇÃO DE ORDENS E VALIDAÇÃO DE CAMPOS OCULTOS
// ==========================================
containerInspecForm?.classList.add('is-hidden');
containerDataParada?.classList.add('is-hidden');

inputOrderInspection?.addEventListener('input', () => {
    if (formCreateOrder) formCreateOrder.action = '/telaInicial/post-register-order-inspec';
    containerInspecForm?.classList.remove('is-hidden');
    containerMaintanece?.classList.add('is-hidden');

    if (inputFalhaCreate) inputFalhaCreate.required = false;
    if (selectTipoManutencao) selectTipoManutencao.required = false;

    if (checkSolicitarPecas) checkSolicitarPecas.checked = false;
    sincronizarContainerPecas();
});

inputOrderMaintanence?.addEventListener('input', () => {
    if (formCreateOrder) formCreateOrder.action = '/telaInicial/post-register-order-maintenance';
    containerInspecForm?.classList.add('is-hidden');
    containerMaintanece?.classList.remove('is-hidden');

    if (inputFalhaCreate) inputFalhaCreate.required = true;
    if (selectTipoManutencao) selectTipoManutencao.required = true;
    sincronizarContainerPecas();
});

selectTipoManutencao?.addEventListener('change', () => {
    if (selectTipoManutencao.value === 'Corretiva') {
        containerStopMachine?.classList.remove('is-hidden');
    } else {
        containerStopMachine?.classList.add('is-hidden');
    }
});

inputDateStop?.addEventListener('input', () => {
    if (!inputDateStop.checked) {
        containerDataParada?.classList.add('is-hidden');
    } else {
        containerDataParada?.classList.remove('is-hidden');
    }
});


// ==========================================
// 10. BARRA DE PESQUISA POR RESPONSÁVEL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const cardsOrders = document.querySelectorAll('.work-order');
    const msgVazio = document.getElementById('sem-resultados');

    function aplicarFiltros() {
        const termoBusca = (inputTech?.value || '').trim().toLowerCase();
        let visiveis = 0;

        cardsOrders.forEach(card => {
            const orderCard = (card.getAttribute('data-responsavel') || '').toLowerCase();
            const bateNome = !termoBusca || orderCard.includes(termoBusca);

            if (bateNome) {
                card.style.display = '';
                visiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        if (msgVazio) {
            msgVazio.style.display = (visiveis === 0) ? 'flex' : 'none';
        }
    }

    inputTech?.addEventListener('input', aplicarFiltros);
});