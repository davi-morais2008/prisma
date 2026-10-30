from database.conexao import conectar

def consultar_maquinas():
    """
    Função SELECT para retornar os dados de TODAS as máquinas.

    Retorna:
        Variável "resposta"
    """
    conexao, cursor = conectar()

    cursor.execute("""SELECT 
    maquinas.id_maquina,
    maquinas.id_tipo_maquina, 
    tipos_maquinas.tipo_maquina, 
    MAX(imagens_maquinas.url_imagem) AS url_imagem, 
    maquinas.modelo_maquina, 
    maquinas.numero_patrimonio, 
    maquinas.localizacao, 
    maquinas.manual_operacao, 
    maquinas.status_maquina, 
    maquinas.is_inativa 
FROM maquinas 
LEFT JOIN tipos_maquinas 
    ON maquinas.id_tipo_maquina = tipos_maquinas.id_tipo_maquina 
LEFT JOIN imagens_maquinas 
    ON maquinas.id_maquina = imagens_maquinas.id_maquina
WHERE maquinas.is_inativa = 0
GROUP BY 
    maquinas.id_maquina, 
    tipos_maquinas.tipo_maquina, 
    maquinas.modelo_maquina, 
    maquinas.numero_patrimonio, 
    maquinas.localizacao, 
    maquinas.manual_operacao, 
    maquinas.status_maquina, 
    maquinas.is_inativa;""")
    
    resposta = cursor.fetchall()
    conexao.close()

    return resposta