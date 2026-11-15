from database.conexao import conectar


def inserir_ordem_inspecao(id_maquina, cpf, descricao_inspecao, data_inspec):
    conexao, cursor = conectar()


    
    cursor.execute("""
        INSERT INTO ordem_inspecao (id_maquina, cpf, descricao_inspecao, data_inspec)
        VALUES (%s, %s, %s, %s)
    """, (id_maquina, cpf, descricao_inspecao, data_inspec))
    conexao.commit()
    
    id_gerado = cursor.lastrowid
    cursor.close()
    conexao.close()
    return id_gerado


from database.conexao import conectar


def consultar_ordens_inspecao() -> list[dict]:
    """
    Busca e retorna a lista de ordens de inspeção ativas com dados detalhados.

    Relaciona as tabelas 'ordem_inspecao', 'maquinas', 'tipos_maquinas'
    e 'usuarios' para trazer nomes e identificadores legíveis.

    Retorna:
        list[dict]: Lista contendo os dados detalhados das ordens de inspeção.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            SELECT 
                oi.id_ordem_inspecao,
                oi.id_maquina,
                oi.cpf,
                oi.descricao_inspecao,
                oi.data_inspec,
                oi.status_inspecao,
                tm.tipo_maquina AS nome_maquina,
                m.numero_patrimonio,
                u.nome AS nome_solicitante
            FROM ordem_inspecao oi
            INNER JOIN maquinas m ON oi.id_maquina = m.id_maquina
            INNER JOIN tipos_maquinas tm ON m.id_tipo_maquina = tm.id_tipo_maquina
            LEFT JOIN usuarios u ON oi.cpf = u.cpf
            WHERE oi.status_inspecao = TRUE
            ORDER BY oi.id_ordem_inspecao;
        ''')
        resposta = cursor.fetchall()
        return resposta
    finally:
        cursor.close()
        conexao.close()


def destinar_responsavel_inspecao(id_ordem_inspecao: int, cpf_responsavel: str) -> bool:
    """
    Atualiza exclusivamente o responsável (campo 'cpf') de uma Ordem de Inspeção.

    Parâmetros:
        id_ordem_inspecao (int): Identificador da ordem de inspeção a ser atualizada.
        cpf_responsavel (str): CPF do técnico/usuário que assumirá a inspeção.

    Retorna:
        bool: True se o responsável for destinado com sucesso, False em caso de erro.
    """
    conexao, cursor = conectar()

    try:
        cursor.execute('''
            UPDATE ordem_inspecao
            SET cpf = %s
            WHERE id_ordem_inspecao = %s;
        ''', (cpf_responsavel, id_ordem_inspecao))
        conexao.commit()
        return cursor.rowcount > 0

    except Exception as erro:
        conexao.rollback()
        print(f"Erro ao destinar responsável para a Ordem de Inspeção: {erro}")
        return False

    finally:
        cursor.close()
        conexao.close()