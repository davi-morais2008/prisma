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
        renderizarGrafico('meuGrafico', dados.os_por_mes, 'Total de Ordens nos últimos meses', '#2213ff');
        renderizarGrafico('falhasGrafico', dados.falhas_quantidade, 'Maiores índices de Falhas', '#ff0000');

    } catch (erro) {
        console.error('Erro ao carregar dados do dashboard:', erro);
    }
}

function atualizarKPIs(kpis) {
    if (!kpis) return;
    
    const elTotalOs = document.getElementById('kpi-total');
    const elOsRest = document.getElementById('kpi-resto');
    const elOsConcluidas = document.getElementById('kpi-concluidas')
    const elMaqTotal = document.getElementById('kpi-maqtotal');
    const elTotalParada = document.getElementById('kpi-totalparada');
    const elTotalAtiva = document.getElementById('kpi-totalativa');
    const elTotalFalha = document.getElementById('kpi-totalfalha');

    if (elTotalOs) elTotalOs.textContent = kpis.total_os;
    if (elOsRest) elOsRest.textContent = kpis.os_pendentes;
    if (elOsConcluidas) elOsConcluidas.textContent = (kpis.total_os - kpis.os_pendentes)
    if (elMaqTotal) elMaqTotal.textContent = kpis.maquinas_ativas;
    if (elTotalParada) elTotalParada.textContent = kpis.maquinas_paradas;
    if (elTotalAtiva) elTotalAtiva.textContent = (kpis.maquinas_ativas - kpis.maquinas_paradas);
    if (elTotalFalha) elTotalFalha.textContent = kpis.falhas_computadas;
}

export function renderizarGrafico(nomeGrafico, dadosGrafico, mensagem, cor) {
    if (!dadosGrafico) {
        console.error("Dados do gráfico inválidos ou indefinidos.");
        return;
    }

    const canvas = document.getElementById(nomeGrafico);
    if (!canvas) {
        console.error(`Elemento <canvas id=${nomeGrafico}> não foi encontrado no HTML.`);
        return;
    }

    // Verifica se a biblioteca Chart.js foi carregada no navegador
    if (typeof Chart === 'undefined') {
        console.error("A biblioteca Chart.js não foi carregada! Verifique a tag <script> do CDN no HTML.");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destrói o gráfico anterior caso já exista para evitar sobreposição
    const graficoExistente = Chart.getChart(canvas);
    if (graficoExistente) {
        graficoExistente.destroy();
    }

    // Obtém variáveis de cor do CSS com fallback para valores padrão
    const estiloComputado = getComputedStyle(document.documentElement);
    const corTexto = estiloComputado.getPropertyValue('--color-text-primary').trim() || '#333333';

    nomeGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dadosGrafico.labels,
            datasets: [{
                label: mensagem,
                data: dadosGrafico.valores,
                backgroundColor: cor,
                borderRadius: 6,
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: corTexto,
                        font: { weight: '600' },
                        fontSize: 10
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