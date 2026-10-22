const maintBTN = document.querySelectorAll('.btn_show');
const closeBTN = document.querySelectorAll('.btn_close');
const modalShow = document.getElementById('modal_show');

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

        const resposta = await fetch(`http://127.0.0.1:8080/api/get/info_manutencao/${osID}`,{
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


