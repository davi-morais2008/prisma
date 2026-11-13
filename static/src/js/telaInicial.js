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
const containerInspec = document.querySelector('#container_ordem_inspecao')
const containerMaintanece = document.querySelector('#container_ordem_manutencao')
const containerStopMachine = document.querySelector('#grupo_parada_maquina')




// Modal: Detalhes da OS
const orderModal = document.querySelector('.order-details');
const overlayModal = document.querySelector('#modalOverlay');
const btnClose = document.querySelector('#btnClose');
const btnEdit = document.querySelector('#btnEdit');
const btnDelete = document.querySelector('#btnDelete');
const formDetails = document.querySelector('#orderForm');
const btnFinishOS = document.querySelector('#btnFinish')

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
const executeContainer = document.getElementById('execute-OS-section')
const camposExecucao = document.getElementById('campos_execucao');
const textareaDesc = document.getElementById('desc_manutencao');



// Modal: Edição
const editModal = document.querySelector('.order-edit');
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


// ==========================================
// FUNÇÕES DE CONTROLE DOS MODAIS
// ==========================================
const openOrderModal = () => orderModal.classList.add('active');
const closeOrderModal = () => orderModal.classList.remove('active');

const openEditModal = () => editModal.classList.add('active');
const closeEditModal = () => editModal.classList.remove('active');

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
// EVENT LISTENERS E REGRAS DE NEGÓCIO
// ==========================================

// Destaca botão do filtro atual
filterButton.forEach(button => {
    if (button.getAttribute('href') === currentPath) {
        button.classList.add('active');
    }
});

// Busca e exibição dos dados da OS ao clicar no card
workOrders.forEach(order => {
    order.addEventListener('click', async (event) => {
        const idOrder = event.currentTarget.getAttribute('id_order');

        const resposta = await fetch('/api/get/ordens_servico/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            }
        });

        if (!resposta.ok) {
            alert("ERRO AO CARREGAR DADOS!");
        } else {
            const ordens = await resposta.json();
            ordens.forEach(os => {
                if (os.id_ordem == idOrder) {
                    btnFinishOS.textContent = os.fase_manutencao == 'Aguardando Início' ? 'Iniciar Manutenção' : 'Finalizar Ordem de Serviço'
                    formDetails.action = os.fase_manutencao == 'Aguardando Início' ? `/telaInicial/iniciar/${os.id_ordem}` : `/telaInicial/finalizar/${os.id_ordem}`
                    if (os.fase_manutencao == 'Aguardando Início') {
                        camposExecucao.style.display = 'none';
                        textareaDesc.required = false;
                    }
                    else {
                        camposExecucao.style.display = 'block';
                        textareaDesc.required = true;
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
    });
});

// Abertura dos Modais
btnEdit.addEventListener('click', openEditModal);
btnDelete.addEventListener('click', openDeleteModal);
bntCreate.addEventListener('click', openCreateModal);
btnAddFalha.addEventListener('click', openFalhaModal);

// Confirmação da Exclusão
btnConfirmDelete.addEventListener('click', () => {
    closeDeleteModal();
    closeOrderModal();
});

// ==========================================
// AGRUPAMENTO DE EVENTOS DE FECHAMENTO
// ==========================================

// Fechar Modal de Detalhes da OS
[btnClose, overlayModal].forEach(el => el.addEventListener('click', closeOrderModal));

// Fechar Modal de Edição
[btnCloseUpdate, overlayUpdate, btnCancelUpdate].forEach(el => el.addEventListener('click', closeEditModal));

// Fechar Modal de Exclusão
[btnCloseDelete, btnCancelDelete].forEach(el => el.addEventListener('click', closeDeleteModal));

// Fechar Modal de Cadastro
[modalOverlay, btnCloseModal, btnCancelForm].forEach(el => {
    el.addEventListener('click', closeCreateModal)
});

// Fechar Modal de Cadastro de Falha
[btnCloseFalha, overlayFalha, btnCancelFalha].forEach(el => el.addEventListener('click', closeFalhaModal));


const btnAddPeca = document.getElementById('btnAddPeca');
const inputNome = document.getElementById('input_peca');
const inputQtd = document.getElementById('input_peca_qtd');
const inputPreco = document.getElementById('input_peca_preco');
const listaPecas = document.getElementById('lista_pecas_cadastradas');





btnAddPeca.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    const qtd = parseInt(inputQtd.value) || 1;
    const preco = parseFloat(inputPreco.value) || 0;

    // Validação simples para não adicionar item vazio
    if (!nome) {
        alert('Digite o nome da peça.');
        inputNome.focus();
        return;
    }

    // Formata o preço para exibição visual (ex: R$ 85,00)
    const precoFormatado = preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Cria o item da lista (<li>) contendo tanto o visual quanto os inputs ocultos
    const li = document.createElement('li');
    li.className = 'order-details__part-item';
    li.innerHTML = `
            <div class="order-details__part-info">
                <span class="order-details__part-name">${nome}</span>
                <div class="order-details__part-meta">
                    <span class="order-details__part-qty">${qtd}x</span>
                    <strong class="order-details__part-price">${precoFormatado}</strong>
                </div>
            </div>
            
            <!-- Inputs ocultos que serão enviados pelo Form para o Python -->
            <input type="hidden" name="pecas_nome[]" value="${nome}">
            <input type="hidden" name="pecas_qtd[]" value="${qtd}">
            <input type="hidden" name="pecas_preco[]" value="${preco.toFixed(2)}">

            <button type="button" class="order-details__part-remove" aria-label="Remover peça">
                <span class="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
        `;

    // Evento para remover a peça caso o usuário clique no "X"
    li.querySelector('.order-details__part-remove').addEventListener('click', () => {
        li.remove();
    });

    // Adiciona na tela e limpa os campos para a próxima peça
    listaPecas.appendChild(li);
    inputNome.value = '';
    inputQtd.value = '1';
    inputPreco.value = '';
    inputNome.focus();
});



// ==========================================
// DIFERENCIAÇÃO DE ORDENS E VALIDAÇÃO DE DADOS
// ==========================================
containerInspec.classList.add('is-hidden')

inputOrderInspection.addEventListener('input', () => {
    containerInspec.classList.remove('is-hidden')
    containerMaintanece.classList.add('is-hidden');
})
inputOrderMaintanence.addEventListener('input', () => {
    containerInspec.classList.add('is-hidden');
    containerMaintanece.classList.remove('is-hidden')
})


selectTipoManutencao.addEventListener('change', () => {
    if (selectTipoManutencao.value == 'Corretiva'){
    containerStopMachine.classList.remove('is-hidden')
} else {
    containerStopMachine.classList.add('is-hidden')
}

})
