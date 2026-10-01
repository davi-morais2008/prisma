from model.OS import cadastrar_ordem_servico


print(cadastrar_ordem_servico(
    id_maquina=1,
    id_falha=3,
    cpf="12345678900",
    status_os="Pendente",
    tipo_manutencao="Corretiva",
    descricao_problema="Superaquecimento no motor principal durante a operação.",
    data_inicio_manutencao=None,
    data_parada="2026-10-01",
    data_termino_manutencao=None,
    previsao_inicio_manutencao="2026-10-02",
    previsao_termino_manutencao="2026-10-04"
))