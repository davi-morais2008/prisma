from database.conexao import conectar

def buscar_usuario(usuario=False):
    """
    Busca todos os usuários cadastrados no banco de dados juntamente com suas respectivas especialidades.

    Retorna:
        Lista de tuplas contendo os dados dos usuários 
            (cpf, nome, sobrenome, email, especialidade).
    """

    conexao, cursor = conectar()
    if usuario:
        cursor.execute("""SELECT 
    IF(
        EXISTS (SELECT 1 FROM usuarios WHERE cpf = %s), 
        (SELECT cpf FROM usuarios WHERE cpf = %s), 
        (SELECT email FROM usuarios WHERE email = %s)
    ) AS resultado;""", (usuario[0], usuario[0], usuario[1]))
        
        resposta = cursor.fetchall()
        return(resposta)
    cursor.execute("""SELECT usuarios.cpf, usuarios.status_usuario, usuarios.nome, usuarios.email, usuarios.senha, especialidades.especialidade FROM usuarios
                      LEFT JOIN tecnicos_especialidades 
                        ON usuarios.cpf = tecnicos_especialidades.cpf
                      LEFT JOIN especialidades 
                        ON tecnicos_especialidades.id_especialidade = especialidades.id_especialidade""")
    resposta = cursor.fetchall()
    conexao.commit()
    conexao.close()

    return resposta


def atualizar_usuario(cpf, nome,  email):
    """
    Altera as informações de um usuário no banco de dados.

    Parâmetros:
        cpf (str): CPF do usuário que será atualizado.
        nome (str): Novo nome.
        email (str): Novo email.

    Retorna:
        bool: True se a atualização foi realizada com sucesso, False em caso de erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute("""
            UPDATE usuarios 
            SET nome = %s,  email = %s
            WHERE cpf = %s
        """, (nome, email, cpf))
        
        conexao.commit()
        return True
    except Exception as e:
        print(f"Erro ao atualizar: {e}")
        conexao.rollback() #retorna o banco de dados para o que estava antes de dar algum erro.
        return False
    finally:
        conexao.close()
        

def inativar_usuario(cpf,status_usuario):
    """
    Altera as informações de um usuário no banco de dados.

    Parâmetros:
        cpf (str): CPF do usuário que será atualizado.
        status_usuario (str): Novo status "Ativo" ou "Inativo".


    Retorna:
        bool: True se a atualização foi realizada com sucesso, False em caso de erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute("""
            UPDATE usuarios 
            SET status_usuario = %s
            WHERE cpf = %s
        """, (cpf,))
        
        conexao.commit()
        return True
    except Exception as e:
        print(f"Erro ao atualizar: {e}")
        conexao.rollback()
        return False
    finally:
        conexao.close()