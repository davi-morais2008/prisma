from database.conexao import conectar


# ==========================================
# CONSULTAS (PARA EXIBIR NOS CARDS)
# ==========================================

def listar_tipos_maquina():
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            SELECT id_tipo_maquina, tipo_maquina, status_tipo_maquina
            FROM tipos_maquinas
            ORDER BY tipo_maquina ASC;
        ''')
        return cursor.fetchall()
    except Exception as e:
        print(f'ERRO ao listar tipos de máquina: {e}')
        return []
    finally:
        cursor.close()
        conexao.close()


def listar_setores():
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            SELECT id_setor, setor, status_setor
            FROM setores
            ORDER BY setor ASC;
        ''')
        return cursor.fetchall()
    except Exception as e:
        print(f'ERRO ao listar setores: {e}')
        return []
    finally:
        cursor.close()
        conexao.close()


def listar_falhas():
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            SELECT id_falha, id_tipo_maquina, falha, status_falha
            FROM falhas
            ORDER BY falha ASC;
        ''')
        return cursor.fetchall()
    except Exception as e:
        print(f'ERRO ao listar falhas: {e}')
        return []
    finally:
        cursor.close()
        conexao.close()


# ==========================================
# INSERÇÕES (PARA SALVAR DOS MODAIS)
# ==========================================

def inserir_tipo_maquina(tipo_maquina: str) -> bool:
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            INSERT INTO tipos_maquinas (tipo_maquina)
            VALUES (%s);
        ''', (tipo_maquina,))
        conexao.commit()
        return True
    except Exception as e:
        conexao.rollback()
        print(f'ERRO ao cadastrar tipo de máquina: {e}')
        return False
    finally:
        cursor.close()
        conexao.close()


def inserir_setor(setor: str) -> bool:
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            INSERT INTO setores (setor)
            VALUES (%s);
        ''', (setor,))
        conexao.commit()
        return True
    except Exception as e:
        conexao.rollback()
        print(f'ERRO ao cadastrar setor: {e}')
        return False
    finally:
        cursor.close()
        conexao.close()


def inserir_falha_por_tipo(id_tipo_maquina: int, falha: str) -> bool:
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            INSERT INTO falhas (id_tipo_maquina, falha)
            VALUES (%s, %s);
        ''', (id_tipo_maquina, falha))
        conexao.commit()
        return True
    except Exception as e:
        conexao.rollback()
        print(f'ERRO ao cadastrar falha: {e}')
        return False
    finally:
        cursor.close()
        conexao.close()

def deletar_tipo_maquina(id_tipo_maquina: int) -> bool:
    conexao, cursor = conectar()
    try:
        cursor.execute(
            'UPDATE tipos_maquinas SET status_tipo_maquina = %s WHERE id_tipo_maquina = %s;',
            ('Inativado', id_tipo_maquina)
        )
        conexao.commit()
        return True
    except Exception as e:
        conexao.rollback()
        print(f'ERRO ao deletar tipo de máquina: {e}')
        return False
    finally:
        cursor.close()
        conexao.close()


def deletar_setor(id_setor: int) -> bool:
    conexao, cursor = conectar()
    try:
        cursor.execute(
            'UPDATE setores SET status_setor = %s WHERE id_setor = %s;',
            ('Inativado', id_setor)
        )
        conexao.commit()
        return True
    except Exception as e:
        conexao.rollback()
        print(f'ERRO ao deletar setor: {e}')
        return False
    finally:
        cursor.close()
        conexao.close()


def deletar_falha(id_falha: int) -> bool:
    conexao, cursor = conectar()
    try:
        cursor.execute(
            'UPDATE falhas SET status_falha = %s WHERE id_falha = %s;',
            ('Inativado', id_falha)
        )
        conexao.commit()
        return True
    except Exception as e:
        conexao.rollback()
        print(f'ERRO ao deletar falha: {e}')
        return False
    finally:
        cursor.close()
        conexao.close()