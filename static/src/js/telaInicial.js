
// Cards das Ordens de Serviço
const workOrders = document.querySelectorAll('.work-order');
const orderModal = document.querySelector('.order-details')
const overlayModal = document.querySelector('#modalOverlay')
const homeOrders = document.querySelector('.home__orders')


// OS INFO CARD
const btnClose = document.querySelector('#btnClose')
const btnEdit = document.querySelector('#btnEdit')
const btnDelete = document.querySelector('#btnDelete')

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
const dataTerminoReal = document.querySelector('#data_termino')

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
                    dataTerminoReal.textContent = formatarDataPT(os.data_termino_manutencao);

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

btnCancelDelete.addEventListener('click', closeDeleteModal)
btnConfirmDelete.addEventListener('click', () => {
    closeDeleteModal();
    closeOrderModal();
    //aqui tambem deve ser adicionado a logica de exclusão da OS no BCD
})

