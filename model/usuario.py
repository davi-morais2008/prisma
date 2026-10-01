from database.conexao import conectar

def buscar_usuario():
    """
    Busca todos os usuários cadastrados no banco de dados juntamente com suas respectivas especialidades.

    Retorna:
        Lista de tuplas contendo os dados dos usuários 
            (cpf, nome, sobrenome, email, senha, especialidade).
    """

    conexao, cursor = conectar()
    cursor.execute("""SELECT usuarios.cpf, usuarios.nome, usuarios.sobrenome, usuarios.email, usuarios.senha, especialidades.especialidade FROM usuarios
                      INNER JOIN tecnicos_especialidades 
                        ON usuarios.cpf = tecnicos_especialidades.cpf
                      INNER JOIN especialidades 
                        ON tecnicos_especialidades.id_especialidade = especialidades.id_especialidade""")
    resposta = cursor.fetchall()
    conexao.commit()
    conexao.close()

    return resposta