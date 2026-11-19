from database.conexao import conectar


# ==========================================
# CONSULTAS (PARA EXIBIR NOS CARDS)
# ==========================================

def listar_tipos_maquina():
    conexao, cursor = conectar()
    try:
        cursor.execute('''
            SELECT id_tipo_maquina, tipo_maquina
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
            SELECT id_setor, setor
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
            SELECT id_falha, id_tipo_maquina, falha
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


# ==========================================
# EXCLUSÕES (PARA DELETAR DOS CARDS)
# ==========================================

def deletar_tipo_maquina(id_tipo_maquina: int) -> bool:
    conexao, cursor = conectar()
    try:
        # 1. Remove imagens das máquinas desse tipo
        cursor.execute('''
            DELETE FROM imagens_maquinas
            WHERE id_maquina IN (SELECT id_maquina FROM maquinas WHERE id_tipo_maquina = %s);
        ''', (id_tipo_maquina,))

        # 2. Remove ordens de serviço das falhas e máquinas desse tipo
        cursor.execute('''
            DELETE FROM ordens_servicos
            WHERE id_falha IN (SELECT id_falha FROM falhas WHERE id_tipo_maquina = %s)
               OR id_maquina IN (SELECT id_maquina FROM maquinas WHERE id_tipo_maquina = %s);
        ''', (id_tipo_maquina, id_tipo_maquina))

        # 3. Remove as falhas vinculadas a esse tipo de máquina
        cursor.execute('DELETE FROM falhas WHERE id_tipo_maquina = %s;', (id_tipo_maquina,))

        # 4. Remove as máquinas vinculadas a esse tipo de máquina
        cursor.execute('DELETE FROM maquinas WHERE id_tipo_maquina = %s;', (id_tipo_maquina,))

        # 5. Remove o tipo de máquina
        cursor.execute('DELETE FROM tipos_maquinas WHERE id_tipo_maquina = %s;', (id_tipo_maquina,))

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
        # 1. Remove imagens das máquinas desse setor
        cursor.execute('''
            DELETE FROM imagens_maquinas
            WHERE id_maquina IN (SELECT id_maquina FROM maquinas WHERE id_setor = %s);
        ''', (id_setor,))

        # 2. Remove ordens de serviço das máquinas desse setor
        cursor.execute('''
            DELETE FROM ordens_servicos
            WHERE id_maquina IN (SELECT id_maquina FROM maquinas WHERE id_setor = %s);
        ''', (id_setor,))

        # 3. Remove as máquinas vinculadas a esse setor
        cursor.execute('DELETE FROM maquinas WHERE id_setor = %s;', (id_setor,))

        # 4. Remove o setor
        cursor.execute('DELETE FROM setores WHERE id_setor = %s;', (id_setor,))

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
        # 1. Remove ordens de serviço vinculadas a essa falha
        cursor.execute('DELETE FROM ordens_servicos WHERE id_falha = %s;', (id_falha,))

        # 2. Remove a falha
        cursor.execute('DELETE FROM falhas WHERE id_falha = %s;', (id_falha,))

        conexao.commit()
        return True
    except Exception as e:
        conexao.rollback()
        print(f'ERRO ao deletar falha: {e}')
        return False
    finally:
        cursor.close()
        conexao.close()