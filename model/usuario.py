from database.conexao import conectar

def buscar_usuario():
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