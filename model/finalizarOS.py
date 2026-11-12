from database.conexao import conectar

def finalizar_OS(id_ordem, desc_manutencao, pecas):
    """
    Finaliza uma OS, salva a descrição da manutenção e insere as peças utilizadas.

    Parâmetros:
        id_ordem (int): Identificador da ordem de serviço.
        desc_manutencao (str): Descrição do serviço realizado.
        pecas (list[dict]): Lista de dicionários contendo 'nome', 'qtd' e 'custo'.

    Retorna:
        bool: True se tudo foi salvo com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()

    try:
        # 1. Atualiza o status e a descrição da manutenção na OS
        cursor.execute("""
            UPDATE ordens_servicos 
            SET status_ordem = 'Finalizada',
                descricao_manutencao = %s
            WHERE id_ordem = %s
        """, (desc_manutencao, id_ordem))

        # 2. Insere cada peça utilizada vinculada ao ID da OS
        if pecas:
            sql_pecas = """
                INSERT INTO pecas (id_ordem, nome_peca, quantidade, custo_peca)
                VALUES (%s, %s, %s, %s)
            """
            valores_pecas = [
                (id_ordem, peca['nome'], peca['qtd'], peca['custo'])
                for peca in pecas
            ]
            cursor.executemany(sql_pecas, valores_pecas)

        conexao.commit()
        return True

    except Exception as erro:
        conexao.rollback()
        print(f"Erro ao finalizar OS: {erro}")
        return False

    finally:
        cursor.close()
        conexao.close()