from database.conexao import conectar

def buscar_os_finalizado():
    """
    Função SELECT para retornar TODAS as ordens de serviço finalizadas.

    Retorna:
        Variável "resposta"
    """
    conexao, cursor = conectar()

    cursor.execute("SELECT * FROM ordens_servicos WHERE status_ordem == %s", ("Finalizado",))
    resposta = cursor.fetchall()
    conexao.close()

    return resposta