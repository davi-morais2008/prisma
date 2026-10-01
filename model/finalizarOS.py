from database.conexao import conectar

def finalizar_OS(id_ordem):
    """
        Função UPDATE para modificar o status de uma OS específica.
    
        Retorna:
            bool: True se o cadastro foi realizado com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()

    try:
        cursor.execute("UPDATE ordens_servicos" \
        "SET status_ordem = %s" \
        "WHERE id_ordem = %s", (1, id_ordem))
        cursor.commit()
        conexao.close()

        return True
    except:
        return False