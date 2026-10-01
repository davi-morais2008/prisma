from database.conexao import conectar

def cadastrar_maquina(id_tipo_maquina, nmr_patrimonio, localizacao, manual_operacao, status_maquina ):
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
    conexao, cursor = conectar()
    try:
        cursor.execute("INSERT INTO maquinas (id_tipo_maquina, numero_patrimonio, localizacao, manual_operacao, status_maquina) VALUES (%s, %s, %s, %s, %s)", (id_tipo_maquina, nmr_patrimonio, localizacao, manual_operacao, status_maquina))
        conexao.commit()
        conexao.close()
        return True
    except:
        return False