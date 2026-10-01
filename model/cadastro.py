
from database.conexao import conectar



def cadastrar_usuario(cpf:str, nome:str, sobrenome:str, email:str, senha:str) -> bool:
    """
    Cadastra um novo usuário na tabela 'usuarios' do banco de dados.

    Parâmetros:
        cpf (str): CPF do usuário.
        nome (str): Primeiro nome do usuário.
        sobrenome (str): Sobrenome do usuário.
        email (str): Endereço de e-mail do usuário.
        senha (str): Senha de acesso do usuário.

    Retorna:
        bool: True se o cadastro foi realizado com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute('''INSERT INTO usuarios(cpf, nome, sobrenome, email, senha)
          VALUES(%s, %s, %s, %s, %s)''', (cpf, nome, sobrenome, email, senha))
        conexao.commit()
        conexao.close()
        return True
    except:
        return False


