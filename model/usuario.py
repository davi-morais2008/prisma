from database.conexao import conectar

def buscar_usuario():
    """
    Busca todos os usuários cadastrados no banco de dados juntamente com suas respectivas especialidades.

    Retorna:
        Lista de tuplas contendo os dados dos usuários 
            (cpf, nome, sobrenome, email, especialidade).
    """

    conexao, cursor = conectar()
    cursor.execute("""SELECT usuarios.cpf, usuarios.nome, usuarios.email, usuarios.senha, especialidades.especialidade FROM usuarios
                      INNER JOIN tecnicos_especialidades 
                        ON usuarios.cpf = tecnicos_especialidades.cpf
                      INNER JOIN especialidades 
                        ON tecnicos_especialidades.id_especialidade = especialidades.id_especialidade""")
    resposta = cursor.fetchall()
    conexao.commit()
    conexao.close()

    return resposta


from database.conexao import conectar

def atualizar_usuario(cpf, nome,  email, status_usuario):
    """
    Altera as informações de um usuário no banco de dados.

    Parâmetros:
        cpf (str): CPF do usuário que será atualizado.
        nome (str): Novo nome.
        email (str): Novo email.
        status_usuario (str): Novo status.

    Retorna:
        bool: True se a atualização foi realizada com sucesso, False em caso de erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute("""
            UPDATE usuarios 
            SET nome = %s,  email = %s, status_usuario = %s 
            WHERE cpf = %s
        """, (nome, email, status_usuario, cpf))
        
        conexao.commit()
        return True
    except Exception as e:
        print(f"Erro ao atualizar: {e}")
        conexao.rollback() #retorna o banco de dados para o que estava antes de dar algum erro.
        return False
    finally:
        conexao.close()
