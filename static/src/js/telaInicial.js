
// Cards das Ordens de Serviço
const workOrders = document.querySelectorAll('.work-order');
const orderModal = document.querySelector('.order-details')
const overlayModal = document.querySelector('#modalOverlay')
const homeOrders = document.querySelector('.home__orders')


// OS INFO CARD
const btnClose = document.querySelector('#btnClose')
const btnEdit = document.querySelector('#btnEdit')
const btnDelete = document.querySelector('#btnDelete')
// const btnFinish = document.querySelector('#btnFinish')

// Imagem
const imagemMaquina = document.querySelector('.order-details__image')

// Informações Primárias
const statusOrdem = document.querySelector('#status_ordem')
const faseManutencao = document.querySelector('#fase_manutencao')
const tipoManutencao = document.querySelector('#tipo_manutencao')
const tecnicoResponsavel = document.querySelector('#tecnico_responsavel')

// Cronograma e Datas
const dataPrevInicio = document.querySelector('#data_prev_inicio_manutencao')
const dataPrevTermino = document.querySelector('#data_prev_termino_manutencao')
const dataParada = document.querySelector('#data_parada')
const dataInicioReal = document.querySelector('#data_inicio')

// Diagnóstico e Falha
const falhaIdentificada = document.querySelector('#falha')
const descricaoProblema = document.querySelector('#desc_problema')

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


// MODAL DE CADASTRO
const bntCreate = document.querySelector('.home__button-register')
// Controle do Modal
const createModal = document.querySelector('#createModal');
const modalOverlay = document.querySelector('#createModalOverlay');
const btnCloseModal = document.querySelector('#btnCancelCreate');
const btnCancelForm = document.querySelector('#btnCancelCreateForm');

// Formulário
const formCreateOrder = document.querySelector('#formCreateOrder');

// Seção 1: Informações Gerais
const inputNumeroPatrimonio = document.querySelector('#create_numero_patrimonio')
const selectTipoManutencao = document.querySelector('#create_tipo_manutencao');
const inputTecnicoResponsavel = document.querySelector('#create_tecnico_responsavel');

// Seção 2: Cronograma e Datas
const inputDataPrevInicio = document.querySelector('#create_data_prev_inicio');
const inputDataPrevTermino = document.querySelector('#create_data_prev_termino');
const inputDataParada = document.querySelector('#create_data_parada');

// Seção 3: Diagnóstico e Falha
const inputFalha = document.querySelector('#create_falha');
const textareaDescProblema = document.querySelector('#create_desc_problema');

// FUNÇÕES RESPONSÁVEIS POR ABRIR E FECHAR O MODAL DE INFORMAÇÃO DAS OS
function openOrderModal() {
    orderModal.classList.add('active')
}
function closeOrderModal() {
    orderModal.classList.remove('active')
}

// FUNÇÕES RESPONSÁVEIS POR ABRIR E FECHAR O MODAL DE EDIÇÃO DAS OS
function openEditModal() {
    editModal.classList.add('active')
}
function closeEditModal() {
    editModal.classList.remove('active')
}

// // FUNÇÕES RESPONSÁVEIS POR ABRIR E FECHAR O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DAS OS
function openDeleteModal() {
    deleteModal.classList.add('active')
}
function closeDeleteModal() {
    deleteModal.classList.remove('active')
}

// FUNÇÕES RESPONSÁVEIS POR ABRIR E FECHAR O MODAL DE CADASTRO DAS OS
function openCreateModal(){
    createModal.classList.add('active')
}
function closeCreateModal(){
    createModal.classList.remove('active')
}

// Função auxiliar para converter e formatar data para PT-BR
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

// abrir modal OS
workOrders.forEach(order => {
    order.addEventListener('click', async (event) => {

        const idOrder = event.currentTarget.getAttribute('id_order');

        const resposta = await fetch(`https://prisma-maintenance.onrender.com/api/get/ordens_servico/`, {
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

                if (os.id_ordem == idOrder) {
                    statusOrdem.textContent = os.status_ordem;
                    faseManutencao.textContent = "Em Execução";
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
// Fechar modal OS
btnClose.addEventListener('click', closeOrderModal)
overlayModal.addEventListener('click', closeOrderModal)
btnDelete.addEventListener('click', openDeleteModal) // abre o modal para confirmar exclusão

// Abrir modal de edição
btnEdit.addEventListener('click', openEditModal)

// Fechar modal de edição
btnCloseUpdate.addEventListener('click', closeEditModal)
overlayUpdate.addEventListener('click', closeEditModal)
btnCancelUpdate.addEventListener('click', closeEditModal)

//abrir modal de cadastro OS
bntCreate.addEventListener('click', openCreateModal)

// Fechar modal de cadastro OS
modalOverlay.addEventListener('click', closeCreateModal)
btnCloseModal.addEventListener('click', closeCreateModal)
btnCancelForm.addEventListener('click', closeCreateModal)

btnCancelDelete.addEventListener('click', closeDeleteModal)
btnCloseDelete. addEventListener('click', closeDeleteModal)
btnConfirmDelete.addEventListener('click', () => {
    closeDeleteModal();
    closeOrderModal();
    //aqui tambem deve ser adicionado a logica de exclusão da OS no BCD
})

