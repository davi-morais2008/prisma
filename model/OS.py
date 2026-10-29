from database.conexao import conectar

def cadastrar_ordem_servico(id_maquina: int, descricao: str, cpf: str, tipo_manutencao: str, descricao_problema: str, data_parada: str, previsao_inicio_manutencao: str, previsao_termino_manutencao: str):
    """
    Cadastra uma nova ordem de serviço no banco de dados.

    Parâmetros:
        id_maquina (int): ID da máquina associada.
        descricao_problema (str): 
        cpf (str): CPF do responsável pela OS.
        tipo_manutencao (str): Tipo de manutenção (ex: Preventiva, Corretiva).
        descricao_problema (str): Descrição do problema relatado.
        data_parada (str/date): Data da parada da máquina.
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
        cpf,
        tipo_manutencao, 
        descricao_problema, 
        data_parada, 
        data_prev_inicio_manutencao, 
        data_prev_termino_manutencao) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    ''', (id_maquina, descricao, cpf,  tipo_manutencao, descricao_problema, data_parada, previsao_inicio_manutencao, previsao_termino_manutencao))
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
    try:
        cursor.execute('''
            SELECT 
                os.id_ordem,
                tm.tipo_maquina AS nome_maquina,
                m.numero_patrimonio,
                f.falha,
                u.nome AS tecnico_responsavel,
                os.status_ordem,
                os.tipo_manutencao,
                os.descricao_problema,
                os.data_parada,
                os.data_prev_inicio_manutencao,
                os.data_prev_termino_manutencao,
                os.data_inicio_manutencao,
                os.data_termino_manutencao
            FROM ordens_servicos os
            INNER JOIN maquinas m ON os.id_maquina = m.id_maquina
            INNER JOIN tipos_maquinas tm ON m.id_tipo_maquina = tm.id_tipo_maquina
            LEFT JOIN falhas f ON os.id_falha = f.id_falha
            LEFT JOIN usuarios u ON os.cpf = u.cpf
            WHERE status_ordem <> %s
            ORDER BY id_ordem;
        ''', ("Finalizada",))
        resposta = cursor.fetchall()
        return resposta
    finally:
        cursor.close()
        conexao.close()


def atribuir_ordem_servico(cpf:str, id:int) -> bool:
    """
    Atualiza o responsável (CPF) por uma Ordem de Serviço existente no banco de dados.

    Parâmetros:
        cpf (str): CPF do técnico/usuário que assumirá a OS.
        id (int): ID da ordem de serviço (id_ordem) a ser alterada.

    Retorna:
        bool: True se a alteração for gravada com sucesso, False em caso de falha.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute('''UPDATE ordens_servicos SET cpf = %s WHERE id_ordem = %s;''', (cpf, id))
        conexao.commit()
        conexao.close()
        return True
    except:
        return False
    