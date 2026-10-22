from database.conexao import conectar


def buscar_usuario_por_email(email):
    conexao, cursor = conectar()
    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
    usuario = cursor.fetchone()
    cursor.close()
    conexao.close()
    return usuario

def atualizar_senha_usuario(email, nova_senha_hash):
    conexao, cursor = conectar()
    cursor.execute("UPDATE usuarios SET senha = %s WHERE email = %s", (nova_senha_hash, email))
    conexao.commit()
    cursor.close()
    conexao.close()