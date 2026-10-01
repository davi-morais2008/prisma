from database.conexao import conectar

def recuperar_senha(cpf):
    """Função SELECT para retornar o email do usuario logado."""
    conexao, cursor = conectar()

    cursor.execute("SELECT email FROM usuarios WHERE cpf = %s", (cpf,))
    resposta = cursor.fetchall()
    conexao.close()

    if resposta == None:
        return False
    else:
        return True
    
