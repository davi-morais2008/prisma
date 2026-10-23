from database.conexao import conectar


def buscar_perfil(cpf):
    """
    Busca o perfil de um usuário específico juntamente com suas especialidades agrupadas.

    Parâmetros:
        cpf (str): O CPF do usuário a ser buscado.

    Retorna:
        dict/tuple: Dados do usuário (cpf, nome, email, especialidades) ou None se não encontrado.
    """
    conexao, cursor = conectar()

    query = """
        SELECT 
            usuarios.cpf, 
            usuarios.nome, 
            usuarios.email, 
            GROUP_CONCAT(especialidades.especialidade SEPARATOR ', ') AS especialidades 
        FROM usuarios
        LEFT JOIN tecnicos_especialidades 
            ON usuarios.cpf = tecnicos_especialidades.cpf
        LEFT JOIN especialidades 
            ON tecnicos_especialidades.id_especialidade = especialidades.id_especialidade
        WHERE usuarios.cpf = %s
        GROUP BY usuarios.cpf, usuarios.nome, usuarios.email
    """

    cursor.execute(query, (cpf,))
    resposta = cursor.fetchone()

    cursor.close()
    conexao.close()

    #o "GROUP_CONCAT" traz todas as especialidades do usuário em um só campo.
    #o "LEFT JOIN" é como se fosse um inner join, mas não dá erro quando não tem informações no campo, porque ele está só ao lado da tabela, e não DENTRO dela como o "INNER JOIN"


    return resposta
