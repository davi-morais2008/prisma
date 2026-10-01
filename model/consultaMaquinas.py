from database.conexao import conectar

def consultar_maquinas():
    """
    Função SELECT para retornar os dados de TODAS as máquinas.

    Retorna:
        Variável "resposta"
    """
    conexao, cursor = conectar()

    cursor.execute("SELECT * FROM maquinas")
    resposta = cursor.fetchall()
    conexao.close()

    return resposta