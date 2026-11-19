from database.conexao import conectar

def cadastrar_ordem_servico(
    id_maquina,
    id_falha,
    cpf_solicitante,
    cpf_tecnico,
    tipo_manutencao,
    descricao_problema,
    data_parada,
    data_prev_inicio_manutencao,
    data_prev_termino_manutencao
):
    conexao, cursor = conectar()
    try:
        if cpf_tecnico:
            cursor.execute('''
                INSERT INTO ordens_servicos (
                    id_maquina,
                    id_falha,
                    cpf_solicitante,
                    cpf,
                    tipo_manutencao,
                    descricao_problema,
                    data_parada,
                    data_prev_inicio_manutencao,
                    data_prev_termino_manutencao
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
            ''', (
                id_maquina,
                id_falha,
                cpf_solicitante,
                cpf_tecnico,
                tipo_manutencao,
                descricao_problema,
                data_parada,
                data_prev_inicio_manutencao,
                data_prev_termino_manutencao
            ))
        else:
            cursor.execute('''
                INSERT INTO ordens_servicos (
                    id_maquina,
                    id_falha,
                    cpf_solicitante,
                    tipo_manutencao,
                    descricao_problema,
                    data_parada,
                    data_prev_inicio_manutencao,
                    data_prev_termino_manutencao
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
            ''', (
                id_maquina,
                id_falha,
                cpf_solicitante,
                tipo_manutencao,
                descricao_problema,
                data_parada,
                data_prev_inicio_manutencao,
                data_prev_termino_manutencao
            ))

        conexao.commit()
        return cursor.lastrowid
    except Exception as e:
        print(f'ERRO ao cadastrar Ordem de Serviço: {e}')
        return None
    finally:
        cursor.close()
        conexao.close()


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
                m.id_maquina,
                m.numero_patrimonio,
                f.falha,
                u.nome AS tecnico_responsavel,
                os.cpf,
                os.status_ordem,
                os.id_falha,
                os.tipo_manutencao,
                os.descricao_problema,
                os.descricao_manutencao,
                os.fase_manutencao,
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


def filtrar_ordem_servico(tipo:str):
    """Filtra as ordens de serviço pelo tipo de manutenção.

    Parâmetros:
        tipo (str): O tipo de manutenção utilizado como filtro (ex.: 'preventiva', 'corretiva').

    Retorna:
        list[dict]: Lista contendo apenas as ordens de serviço correspondentes ao tipo informado.
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
                m.id_maquina,
                m.id_tipo_maquina,
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
            WHERE tipo_manutencao = %s AND status_ordem <> %s AND status_ordem <> %s
            ORDER BY id_ordem;
        ''', (tipo, 'Finalizada', 'Cancelada'))
        reposta = cursor.fetchall()
        return reposta
    finally:
        cursor.close()
        conexao.close()

def iniciar_OS(id_ordem):
    """
    Atualiza o campo fase_manutencao de uma OS específica para 'Em andamento'.

    Parâmetros:
        id_ordem (int): Identificador da ordem de serviço.

    Retorna:
        bool: True se a atualização foi realizada com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()

    try:
        cursor.execute("""
            UPDATE ordens_servicos 
            SET fase_manutencao = 'Em andamento',
                data_inicio_manutencao = NOW()
            WHERE id_ordem = %s
        """, (id_ordem,))
        conexao.commit()
        return True

    except Exception as erro:
        conexao.rollback()
        print(f"Erro ao iniciar OS: {erro}")
        return False

    finally:
        cursor.close()
        conexao.close()


def destinar_tecnico_os(id_ordem: int, cpf_tecnico: str) -> bool:
    """
    Atualiza exclusivamente o técnico responsável (campo 'cpf') de uma Ordem de Serviço.

    Parâmetros:
        id_ordem (int): Identificador da ordem de serviço a ser atualizada.
        cpf_tecnico (str): CPF do técnico responsável que assumirá a OS.

    Retorna:
        bool: True se o técnico for destinado com sucesso, False em caso de erro.
    """
    conexao, cursor = conectar()

    try:
        cursor.execute('''
            UPDATE ordens_servicos
            SET cpf = %s,
                status_ordem = 'Ativa'
            WHERE id_ordem = %s;
        ''', (cpf_tecnico, id_ordem))
        conexao.commit()
        return cursor.rowcount > 0

    except Exception as erro:
        conexao.rollback()
        print(f"Erro ao destinar técnico para a OS: {erro}")
        return False

    finally:
        cursor.close()
        conexao.close()

def editar_ordem_servico(
    id_ordem: int,
    status_ordem: str,
    fase_manutencao: str,
    tipo_manutencao: str,
    cpf: str | None,
    id_falha: int,
    data_prev_inicio_manutencao: str | None,
    data_prev_termino_manutencao: str | None,
    data_parada: str | None,
    data_inicio_manutencao: str | None,
    descricao_problema: str
) -> bool:
    """
    Atualiza os dados de uma ordem de serviço existente no banco de dados.

    Parâmetros:
        id_ordem (int): Identificador da ordem de serviço a ser atualizada.
        status_ordem (str): Status atual ('Pendente', 'Em Andamento', 'Finalizada', etc.).
        fase_manutencao (str): Fase atual da manutenção.
        tipo_manutencao (str): Tipo ('Corretiva', 'Preventiva', 'Preditiva', etc.).
        cpf (str | None): CPF do técnico responsável (ou None caso não atribuído).
        id_falha (int): Identificador da falha associada.
        data_prev_inicio_manutencao (str | None): Data/hora prevista de início.
        data_prev_termino_manutencao (str | None): Data/hora prevista de término.
        data_parada (str | None): Data/hora da parada da máquina (se houver).
        data_inicio_manutencao (str | None): Data/hora real de início.
        descricao_problema (str): Descrição detalhada do problema.

    Retorna:
        bool: True se a atualização foi concluída com sucesso, False em caso de erro.
    """
    conexao, cursor = conectar()

    try:
        cursor.execute("""
            UPDATE ordens_servicos
            SET status_ordem = %s,
                fase_manutencao = %s,
                tipo_manutencao = %s,
                cpf = %s,
                id_falha = %s,
                data_prev_inicio_manutencao = %s,
                data_prev_termino_manutencao = %s,
                data_parada = %s,
                data_inicio_manutencao = %s,
                descricao_problema = %s
            WHERE id_ordem = %s;
        """, (
            status_ordem,
            fase_manutencao,
            tipo_manutencao,
            cpf if cpf else None,
            id_falha,
            data_prev_inicio_manutencao if data_prev_inicio_manutencao else None,
            data_prev_termino_manutencao if data_prev_termino_manutencao else None,
            data_parada if data_parada else None,
            data_inicio_manutencao if data_inicio_manutencao else None,
            descricao_problema,
            id_ordem
        ))

        conexao.commit()
        return True

    except Exception as erro:
        conexao.rollback()
        print(f"Erro ao editar ordem de serviço #{id_ordem}: {erro}")
        return False

    finally:
        cursor.close()
        conexao.close()