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
const containerDataParada = document.querySelector('#campo_data_parada')
const inputDateStop = document.querySelector('#check_maquina_parada')




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
                // Remove a linha clicada se houver mais de uma
                btnRemover.closest('.order-create__peca-row').remove();
            } else {
                // Se for a última linha restante, apenas limpa os inputs
                const linhaUnica = linhas[0];
                linhaUnica.querySelector('input[name="peca_nome[]"]').value = '';
                linhaUnica.querySelector('input[name="peca_quantidade[]"]').value = '1';
            }
        });
    }

    // Função auxiliar para montar o HTML de uma nova linha
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

    // Ativa ou desativa o 'required' nos inputs de peça conforme o checkbox
    function atualizarRequiredPecas(isRequired) {
        const inputsNome = listaPecas.querySelectorAll('input[name="peca_nome[]"]');
        const inputsQtd = listaPecas.querySelectorAll('input[name="peca_quantidade[]"]');

        inputsNome.forEach(input => input.required = isRequired);
        inputsQtd.forEach(input => input.required = isRequired);
    }

    // Restaura a lista para apenas 1 linha limpa caso o usuário desmarque o checkbox
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
containerInspec.classList.add('is-hidden')

inputOrderInspection.addEventListener('input', () => {
    formCreateOrder.action = '/telaInicial/post-register-order-inspec'
    containerInspec.classList.remove('is-hidden')
    containerMaintanece.classList.add('is-hidden');
})
inputOrderMaintanence.addEventListener('input', () => {
    formCreateOrder.action = '/telaInicial/post-register-order-maintenance'
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

console.log(inputDateStop)
containerDataParada.classList.add('is-hidden')
inputDateStop.addEventListener('input', () => {
    if (!inputDateStop.checked) {
        containerDataParada.classList.add('is-hidden')
    }
    else {
        containerDataParada.classList.remove('is-hidden')
    }
})