
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a busca de dados assim que o DOM estiver pronto
    carregarDadosDashboard();
});

let meuGrafico = null;

async function carregarDadosDashboard() {
    try {
        const resposta = await fetch('/api/dados');
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados = await resposta.json();

        // 1. Atualiza os cards de KPI
        atualizarKPIs(dados.kpis);

        // 2. Renderiza ou atualiza o gráfico
        renderizarGrafico(dados.vendas_mensais);

    } catch (erro) {
        console.error('Erro ao carregar dados do dashboard:', erro);
    }
}

function atualizarKPIs(kpis) {
    const elVendas = document.getElementById('kpi-vendas');
    const elClientes = document.getElementById('kpi-clientes');
    const elConversao = document.getElementById('kpi-conversao');

    if (elVendas) elVendas.textContent = `R$ ${kpis.total_vendas}`;
    if (elClientes) elClientes.textContent = kpis.novos_clientes;
    if (elConversao) elConversao.textContent = kpis.taxa_conversao;
}

function renderizarGrafico(dadosGrafico) {
    const canvas = document.getElementById('meuGrafico');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Se já existir uma instância do gráfico, destrói antes de recriar
    if (meuGrafico) {
        meuGrafico.destroy();
    }

    // Obtém as cores primárias do CSS computado para integrar com o tema
    const estiloComputado = getComputedStyle(document.documentElement);
    const corSecundaria = estiloComputado.getPropertyValue('--color-secondary').trim() || '#7c72ff';
    const corTexto = estiloComputado.getPropertyValue('--color-text-primary').trim() || '#333';

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
                        font: {
                            family: 'inherit',
                            weight: '600'
                        }
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
}