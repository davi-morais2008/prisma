from database.conexao import conectar

def login_usuario(cpf, senha):
    conexao, cursor = conectar()
    cursor.execute("SELECT cpf, senha FROM usuarios WHERE cpf = %s AND senha = %s", (cpf, senha ))
    resposta = cursor.fetchone()

    if resposta == None:
        return False
    else: 
        return True