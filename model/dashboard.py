from database.conexao import conectar

def buscar_dados_dashboard():
    conexao, cursor = conectar()

    try:
        # 1. Total de Ordens de Serviço
        cursor.execute("SELECT COUNT(*) AS total FROM ordens_servicos")
        total_os = cursor.fetchone()['total']

        # 2. Ordens em Andamento / Pendentes
        cursor.execute("""
            SELECT COUNT(*) AS total 
            FROM ordens_servicos 
            WHERE status_ordem NOT IN ('Concluída', 'Finalizada', 'Cancelada')
        """)
        os_pendentes = cursor.fetchone()['total']

        # 3. Total de Máquinas Cadastradas
        cursor.execute("SELECT COUNT(*) AS total FROM maquinas")
        maquinas_total = cursor.fetchone()['total']

        # 4. Total de Falhas Registradas
        cursor.execute("SELECT COUNT(*) AS total FROM falhas")
        falhas_total = cursor.fetchone()['total']

        # 5. Gráfico: OS por Mês (agrupadas pela data de início)
        cursor.execute("""
            SELECT 
                DATE_FORMAT(data_inicio_manutencao, '%b') AS mes,
                COUNT(*) AS total
            FROM ordens_servicos
            WHERE data_inicio_manutencao IS NOT NULL
            GROUP BY MONTH(data_inicio_manutencao), mes
            ORDER BY MONTH(data_inicio_manutencao)
            LIMIT 6
        """)
        res_os_mes = cursor.fetchall()

        labels_mes = [row['mes'] for row in res_os_mes] if res_os_mes else ["Jan", "Fev", "Mar"]
        valores_mes = [row['total'] for row in res_os_mes] if res_os_mes else [0, 0, 0]

        conexao.commit()
        conexao.close()

        return {
            "total_os": total_os,
            "os_pendentes": os_pendentes,
            "maquinas_total": maquinas_total,
            "falhas_total": falhas_total,
            "labels_mes": labels_mes,
            "valores_mes": valores_mes
        }

    except Exception as e:
        print(f"Erro ao buscar dados do dashboard: {e}")
        if conexao:
            conexao.close()
        return None