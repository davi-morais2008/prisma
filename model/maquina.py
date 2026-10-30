from database.conexao import conectar

def cadastrar_maquina(id_tipo_maquina, nmr_patrimonio, modelo_maquina, localizacao, manual_operacao, status_maquina ):

    
    """
    Cadastra uma nova máquina na tabela 'maquinas' do banco de dados.

    Parâmetros:
        id_tipo_maquina (int): ID do tipo da máquina.
        nmr_patrimonio (str): Número do patrimônio da máquina.
        localizacao (str): Localização da máquina.
        manual_operacao (str): Manual de operação da máquina.
        status_maquina (str): Status atual da máquina.

    Retorna:
        bool: True se o cadastro foi realizado com sucesso, False se ocorreu algum erro.
    """
    print(id_tipo_maquina, nmr_patrimonio, localizacao, manual_operacao, status_maquina)
    conexao, cursor = conectar()

    cursor.execute("INSERT INTO maquinas (id_tipo_maquina, numero_patrimonio, modelo_maquina, localizacao, manual_operacao, status_maquina) VALUES (%s, %s, %s, %s, %s, %s)", (id_tipo_maquina, nmr_patrimonio, modelo_maquina, localizacao, manual_operacao, status_maquina))
    conexao.commit()
    conexao.close()


def atualizar_maquina(id):
    """
    Alterna o status de uma máquina no banco de dados entre 'Em Atividade' e 'Parada'.

    Parâmetros:
        id (int): ID da máquina que terá o status atualizado.

    Retorna:
        bool: True se a atualização foi realizada com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute("UPDATE maquinas SET status_maquina = IF (status_maquina = 'Em Atividade', 'Parada', 'Em Atividade') WHERE id_maquina = %s", (id,))
        conexao.commit()
        conexao.close()
        return True
    except:
        return False

def atualizar_editar_maquina(id, tipo_maquina,  modelo_maquina, numero_patrimonio, localizacao, status_maquina):
    """
    Atualiza todos os dados de uma máquina no banco de dados com base no seu ID.

    Parâmetros:
        id (int): ID da máquina.
        tipo_maquina (str): Tipo/Modelo da máquina.
        numero_patrimonio (str/int): Número de patrimônio.
        tempo_producao (float/int): Tempo de produção em horas.
        total_horas (float/int): Total de horas funcionando.
        custo_acumulado (float): Custo acumulado em R$.
        pecas_alteradas (int): Total de peças alteradas.
        tempo_parada (float/int): Tempo de parada em horas.
        status_preventiva (str): Status da manutenção preventiva.
        data_preventiva (str): Data agendada da preventiva.

    Retorna:
        bool: True se a atualização foi realizada com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute( """
            UPDATE maquinas 
            SET id_tipo_maquina = %s,
                modelo_maquina = %s,
                numero_patrimonio = %s,
                localizacao = %s,
                status_maquina = %s
            WHERE id_maquina = %s
        """, (
            tipo_maquina,
            modelo_maquina,
            numero_patrimonio,
            localizacao,
            status_maquina,
            id
        ))
        conexao.commit()
        conexao.close()
        print('CERTOOO')
        return True
    except:
        print("ERRADOOOO")
        return False

def deletar_maquina(id):
    """
    Desativa uma máquina no banco de dados (soft delete), alterando a flag 'is_inativa'
    para preservar o histórico de manutenções.

    Parâmetros:
        id (int): ID da máquina que será inativada.

    Retorna:
        bool: True se a inativação foi realizada com sucesso, False se ocorreu algum erro.
    """
    conexao, cursor = conectar()
    try:
        cursor.execute("UPDATE maquinas SET is_inativa = TRUE WHERE id_maquina = %s", (id,))
        conexao.commit()
        conexao.close()
        return True
    except:
        return False

def consulta_tipo_maquinas():
    """
    Função SELECT para retornar os dados dos tipos das máquinas.

    Retorna:
        Variável "resposta"
    """
    conexao, cursor = conectar()

    cursor.execute("SELECT id_tipo_maquina, tipo_maquina FROM tipos_maquinas")
    resposta = cursor.fetchall()
    conexao.close()

    return resposta