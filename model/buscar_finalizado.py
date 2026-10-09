from database.conexao import conectar

def buscar_os_finalizado():
    """
    Função SELECT para retornar TODAS as ordens de serviço finalizadas.

    Retorna:
        Variável "resposta"
    """
    conexao, cursor = conectar()

    cursor.execute("""SELECT maquinas.numero_patrimonio, falhas.falha, usuarios.nome, usuarios.sobrenome, ordens_servicos.tipo_manutencao, ordens_servicos.descricao_problema, ordens_servicos.data_inicio_manutencao, ordens_servicos.data_termino_manutencao FROM db_manutencaods_em.ordens_servicos
        INNER JOIN falhas ON ordens_servicos.id_falha = falhas.id_falha
        INNER JOIN maquinas ON ordens_servicos.id_maquina = maquinas.id_maquina
        INNER JOIN usuarios ON ordens_servicos.cpf = usuarios.cpf
        WHERE status_ordem = %s""", ("Finalizada",))
    resposta = cursor.fetchall()
    conexao.close()

    return resposta