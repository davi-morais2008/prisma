
from database.conexao import conectar



def cadastrar_usuario(cpf, nome, sobrenome, email, senha):
    conexao, cursor = conectar()
    try:
        cursor.execute('''INSERT INTO usuarios(cpf, nome, sobrenome, email, senha)
          VALUES(%s, %s, %s, %s, %s)''', (cpf, nome, sobrenome, email, senha))
        conexao.commit()
        conexao.close()
        return True
    except:
        return False


