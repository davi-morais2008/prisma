const maintBTN = document.querySelectorAll('.btn_show');
const closeBTN = document.querySelectorAll('.btn_close');
const modalShow = document.getElementById('modal_show');
const inputTech = document.getElementById('campoPesquisa');
const typeTech = document.getElementById('filtroTipo');
const dateTech = document.getElementById('filtroData');
const limparBTN = document.getElementById('btn_limpar');
const containerCards = document.getElementById('history_cards');

const textType = document.querySelector('#text-type');
const textPatrimony = document.querySelector('#text-patrimony');
const textProd = document.querySelector('#text-prod')
const textError = document.querySelector('#text-error')
const textDate = document.querySelector('#text-date')
const textStart = document.querySelector('#text-start')
const textFinal = document.querySelector('#text-final')

maintBTN.forEach((btn) => {
    btn.addEventListener('click', async () => {

        const osID = btn.getAttribute('id_os');

        const resposta = await fetch(`/api/get/info_manutencao/${osID}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            }}
        );

        if (!resposta.ok){
            alert("ERRO AO CARREGAR INFORMAÇÃO!");
        }

        else{
            const dados = await resposta.json();

            console.log(dados);

            textType.textContent = dados.modelo_maquina
            textPatrimony.textContent = dados.numero_patrimonio
            textProd.textContent = dados.nome
            textError.textContent = dados.descricao_problema
            textDate.textContent = dados.data_parada
            textStart.textContent = dados.data_inicio_manutencao
            textFinal.textContent = dados.data_termino_manutencao        
            
            modalShow.classList.toggle('active');
        }
    })
})

closeBTN.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalShow.classList.toggle('active');
    });
})

document.addEventListener('DOMContentLoaded', () => {

    function aplicarFiltros() {
        const dataSelecionada = dateTech.value;
        const tipoSelecionado = typeTech.value;
        let visiveis = 0;

        containerCards.querySelectorAll('.card__group').forEach(card => {
            const dataCard = card.getAttribute('data-date') || '';
            const tipoCard = card.getAttribute('data-type') || '';

            // 1. Verifica a data (usa startsWith caso venha com horário YYYY-MM-DD HH:MM:SS)
            const bateData = !dataSelecionada || dataCard.startsWith(dataSelecionada);

            // 2. Verifica o tipo
            const bateTipo = !tipoSelecionado || tipoCard === tipoSelecionado;

            // Só exibe se passar nas DUAS condições simultaneamente
            if (bateData && bateTipo) {
                card.style.display = '';
                visiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        const msgVazio = document.getElementById('sem-resultados');
        const flash = document.querySelector('.container-flash');
        
        if (msgVazio) {
                msgVazio.style.display = (visiveis === 0) ? 'flex' : 'none';
            };

        if (flash) {
                msgVazio.style.display = 'none';
        }
}

    // Ambos os inputs disparam a mesma função combinada
    dateTech.addEventListener('change', aplicarFiltros);
    typeTech.addEventListener('change', aplicarFiltros);
});

function enviarFiltros(event) {
    event.preventDefault(); // Evita o recarregamento padrão da página
}

function limparPesquisa() {
    document.getElementById('campoPesquisa').value = '';
    document.getElementById('filtroTipo').value = '';
    document.getElementById('filtroData').value = '';

    containerCards.querySelectorAll('.card__group').forEach(card => {
        card.style = '';
    });
}


limparBTN.addEventListener('click', limparPesquisa);


