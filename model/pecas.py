from database.conexao import conectar

def inserir_requisicoes_pecas(id_ordem: int, pecas: list[tuple[str, int]]) -> bool:
    """
    Insere um registro individual na tabela 'requisicoes_pecas' para cada peça
    solicitada, vinculando todas ao ID da ordem de serviço recém-criada.
    """
    if not id_ordem or not pecas:
        return False

    conexao, cursor = conectar()
    try:
        valores = [
            (id_ordem, nome, qtd, 'Pendente')
            for nome, qtd in pecas
        ]

        cursor.executemany("""
            INSERT INTO requisicoes_pecas (id_ordem, nome_peca, quantidade, status_requisicao)
            VALUES (%s, %s, %s, %s)
        """, valores)

        conexao.commit()
        return True

    except Exception as erro:
        conexao.rollback()
        print(f"Erro ao inserir requisições de peças para a OS #{id_ordem}: {erro}")
        return False

    finally:
        cursor.close()
        conexao.close()


def consultar_requisicoes_pecas(id_ordem: int | None = None) -> list[dict]:
    """
    Consulta as peças requisitadas na tabela 'requisicoes_pecas'.
    Se 'id_ordem' for informado, filtra apenas as requisições daquela OS;
    caso contrário, retorna todas as requisições cadastradas.
    """
    conexao, cursor = conectar()
    try:
        if id_ordem:
            cursor.execute("""
                SELECT 
                    id_requisicao,
                    id_ordem,
                    nome_peca,
                    quantidade,
                    custo_unitario,
                    status_requisicao
                FROM requisicoes_pecas
                WHERE id_ordem = %s
                ORDER BY id_requisicao ASC
            """, (id_ordem,))
        else:
            cursor.execute("""
                SELECT 
                    id_requisicao,
                    id_ordem,
                    nome_peca,
                    quantidade,
                    custo_unitario,
                    status_requisicao
                FROM requisicoes_pecas
                ORDER BY id_ordem DESC, id_requisicao ASC
            """)

        return cursor.fetchall()

    except Exception as erro:
        print(f"Erro ao consultar requisições de peças: {erro}")
        return []

    finally:
        cursor.close()
        conexao.close()


def atualizar_custos_requisicoes_pecas(ids_requisicao: list[str], custos_unitarios: list[str]) -> None:
    conexao, cursor = conectar()
    try:
        for id_req, custo in zip(ids_requisicao, custos_unitarios):
            if id_req and custo:
                valor_convertido = float(str(custo).replace(',', '.'))
                cursor.execute("""
                    UPDATE requisicoes_pecas
                    SET custo_unitario = %s,
                        status_requisicao = 'Aprovada'
                    WHERE id_requisicao = %s
                """, (valor_convertido, int(id_req)))

        conexao.commit()
    except Exception as erro:
        conexao.rollback()
        print(f"Erro ao atualizar custos das requisições de peças: {erro}")
    finally:
        cursor.close()
        conexao.close()