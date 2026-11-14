from database.conexao import conectar


def inserir_ordem_inspecao(id_maquina, cpf, descricao_inspecao, data_inspec):
    conexao, cursor = conectar()


    
    cursor.execute("""
        INSERT INTO ordem_inspecao (id_maquina, cpf, descricao_inspecao, data_inspec)
        VALUES (%s, %s, %s, %s)
    """, (id_maquina, cpf, descricao_inspecao, data_inspec))
    conexao.commit()
    
    id_gerado = cursor.lastrowid
    cursor.close()
    conexao.close()
    return id_gerado