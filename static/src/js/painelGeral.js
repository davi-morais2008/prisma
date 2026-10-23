let meuGrafico = null;

async function carregarDadosDashboard() {
    console.log("Iniciando busca de dados no Flask...");
    try {
        const resposta = await fetch('/api/dados');
        if (!resposta.ok) {
            throw new Error(`Erro no servidor HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log("Dados recebidos da API:", dados);

        // 1. Atualiza os cards de KPI
        atualizarKPIs(dados.kpis);

        // 2. Renderiza o gráfico
        renderizarGrafico(dados.vendas_mensais);

    } catch (erro) {
        console.error('Erro ao carregar dados do dashboard:', erro);
    }
}

function atualizarKPIs(kpis) {
    if (!kpis) return;
    
    const elVendas = document.getElementById('kpi-vendas');
    const elClientes = document.getElementById('kpi-clientes');
    const elConversao = document.getElementById('kpi-conversao');

    if (elVendas) elVendas.textContent = `R$ ${kpis.total_vendas}`;
    if (elClientes) elClientes.textContent = kpis.novos_clientes;
    if (elConversao) elConversao.textContent = kpis.taxa_conversao;
}

function renderizarGrafico(dadosGrafico) {
    if (!dadosGrafico) {
        console.error("Dados do gráfico inválidos ou indefinidos.");
        return;
    }

    const canvas = document.getElementById('meuGrafico');
    if (!canvas) {
        console.error("Elemento <canvas id='meuGrafico'> não foi encontrado no HTML.");
        return;
    }

    // Verifica se a biblioteca Chart.js foi carregada no navegador
    if (typeof Chart === 'undefined') {
        console.error("A biblioteca Chart.js não foi carregada! Verifique a tag <script> do CDN no HTML.");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destrói o gráfico anterior caso já exista para evitar sobreposição
    if (meuGrafico) {
        meuGrafico.destroy();
    }

    // Obtém variáveis de cor do CSS com fallback para valores padrão
    const estiloComputado = getComputedStyle(document.documentElement);
    const corSecundaria = estiloComputado.getPropertyValue('--color-secondary').trim() || '#7c72ff';
    const corTexto = estiloComputado.getPropertyValue('--color-text-primary').trim() || '#333333';

    meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dadosGrafico.labels,
            datasets: [{
                label: 'Vendas Mensais',
                data: dadosGrafico.valores,
                backgroundColor: corSecundaria,
                borderRadius: 6,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: corTexto,
                        font: { weight: '600' }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: corTexto }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: corTexto }
                }
            }
        }
    });

    console.log("Gráfico renderizado com sucesso!");
}

// Garante a execução independente de quando o DOM terminar de carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarDadosDashboard);
} else {
    carregarDadosDashboard();
}