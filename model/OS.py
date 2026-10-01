from database.conexao import conectar

def cadastrar_ordem_servico(id_maquina: int, id_falha: int, cpf: str, status_os: str, tipo_manutencao: str, descricao_problema: str, data_inicio_manutencao: str, data_parada: str, data_termino_manutencao: str, previsao_inicio_manutencao: str, previsao_termino_manutencao: str):
    """
    Cadastra uma nova ordem de serviço no banco de dados.

    Parâmetros:
        id_maquina (int): ID da máquina associada.
        id_falha (int): ID do tipo de falha relatada.
        cpf (str): CPF do responsável pela OS.
        status_os (str): Status atual da ordem de serviço.
        tipo_manutencao (str): Tipo de manutenção (ex: Preventiva, Corretiva).
        descricao_problema (str): Descrição do problema relatado.
        data_inicio_manutencao (str/date): Data real do início da manutenção.
        data_parada (str/date): Data da parada da máquina.
        data_termino_manutencao (str/date): Data real do término da manutenção.
        previsao_inicio_manutencao (str/date): Data prevista para início.
        previsao_termino_manutencao (str/date): Data prevista para conclusão.

    Retorna:
        bool: True se gravado com sucesso, False em caso de erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute('''
        INSERT INTO ordens_servicos (
        id_maquina,
        id_falha,
        cpf,
        status_ordem,
        tipo_manutencao, 
        descricao_problema, 
        data_inicio_manutencao, 
        data_termino_manutencao, 
        data_parada, 
        data_prev_inicio_manutencao, 
        data_prev_termino_manutencao) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    ''', (id_maquina, id_falha, cpf, status_os, tipo_manutencao, descricao_problema, data_inicio_manutencao, data_termino_manutencao, data_parada, previsao_inicio_manutencao, previsao_termino_manutencao))
        conexao.commit()
        conexao.close()
        return True
    except:
        print('ERROR')
        conexao.close()
        return False



def consultar_ordem_servico() -> list[tuple]:
    """
    Busca e retorna a lista de ordens de serviço com dados detalhados.

    Relaciona as tabelas 'ordens_servicos', 'maquinas', 'tipos_maquinas',
    'falhas' e 'usuarios' para trazer nomes e identificadores legíveis.

    Retorna:
        list[tuple]: Lista de tuplas contendo os dados detalhados das ordens de serviço.
    """
    
    conexao, cursor = conectar()
    cursor.execute('''
    SELECT 
    os.id_ordem,
    tm.tipo_maquina AS nome_maquina,
    m.numero_patrimonio,
    f.falha AS descricao_falha,
    u.nome AS tecnico_responsavel,
    os.status_ordem,
    os.tipo_manutencao,
    os.data_inicio_manutencao
FROM ordens_servicos os
INNER JOIN maquinas m ON os.id_maquina = m.id_maquina
INNER JOIN tipos_maquinas tm ON m.id_tipo_maquina = tm.id_tipo_maquina
INNER JOIN falhas f ON os.id_falha = f.id_falha
INNER JOIN usuarios u ON os.cpf = u.cpf;
''')
    resposta = cursor.fetchall()
    return resposta
