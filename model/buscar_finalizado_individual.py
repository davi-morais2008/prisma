from database.conexao import conectar

def buscar_os_finalizado_ind(id_ordem):
    """
    Função SELECT para retornar UMA as ordem de serviço que já foi finalizada.

    Retorna:
        Variável "resposta"
    """
    conexao, cursor = conectar()

    cursor.execute("""SELECT maquinas.numero_patrimonio, ordens_servicos.descricao_problema, usuarios.nome, usuarios.sobrenome, ordens_servicos.tipo_manutencao, ordens_servicos.data_parada, ordens_servicos.data_inicio_manutencao, ordens_servicos.data_termino_manutencao FROM db_manutencaods_em.ordens_servicos
        INNER JOIN falhas ON ordens_servicos.id_falha = falhas.id_falha
        INNER JOIN maquinas ON ordens_servicos.id_maquina = maquinas.id_maquina
        INNER JOIN usuarios ON ordens_servicos.cpf = usuarios.cpf
        WHERE status_ordem = %s AND id_ordem = %s""", ("Finalizada", id_ordem))
    resposta = cursor.fetchone()
    conexao.close()

    return resposta