from database.conexao import conectar

def finalizar_OS(id):
    """
        Função UPDATE para modificar o status de uma OS específica.

        Parâmetros:
            id_ordem(int): Identificador da ordem de serviço

        Retorna:
            bool: True se o cadastro foi realizado com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()

    try:
        cursor.execute("""UPDATE ordens_servicos 
        SET status_ordem = 'Finalizada'
        WHERE id_ordem = %s""", (id,))
        conexao.commit()
        conexao.close()

        return True
    except:
        return False