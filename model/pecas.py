from database.conexao import conectar

def inserir_requisicoes_pecas(id_ordem, pecas):
    conexao, cursor = conectar()

    valores = [(id_ordem, nome, qtd) for nome, qtd in pecas]

    cursor.executemany("""
        INSERT INTO requisicoes_pecas (id_ordem, nome_peca, quantidade)
        VALUES (%s, %s, %s)
    """, valores)
    conexao.commit()

    cursor.close()
    conexao.close()