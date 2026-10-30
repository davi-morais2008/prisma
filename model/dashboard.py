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
            WHERE status_ordem <> %s AND status_ordem <> %s
        """, ('Finalizada', 'Cancelada'))
        os_pendentes = cursor.fetchone()['total']

        # 3. Total de Máquinas Cadastradas
        cursor.execute("SELECT COUNT(*) AS total FROM maquinas")
        maquinas_total = cursor.fetchone()['total']

        # 4. Total de Falhas Registradas
        cursor.execute("SELECT COUNT(*) AS total FROM maquinas WHERE status_maquina = %s", ("Em Manutenção",))
        maquinas_paradas = cursor.fetchone()['total']

        cursor.execute("SELECT COUNT(*) AS total FROM falhas")
        falhas_computadas = cursor.fetchone()['total']

        # 5. Gráfico: OS por Mês (agrupadas pela data de início)
        cursor.execute("""
                    SELECT 
                        DATE_FORMAT(data_inicio_manutencao, '%b/%y') AS mes,
                        COUNT(*) AS total
                    FROM ordens_servicos
                    WHERE data_inicio_manutencao IS NOT NULL
                    GROUP BY YEAR(data_inicio_manutencao), MONTH(data_inicio_manutencao), mes
                    ORDER BY YEAR(data_inicio_manutencao) ASC, MONTH(data_inicio_manutencao) ASC
                    LIMIT 6
                """)
        res_os_mes = cursor.fetchall()
        
        labels_mes = [row['mes'] for row in res_os_mes] if res_os_mes else ["Jan", "Fev", "Mar"]
        valores_mes = [row['total'] for row in res_os_mes] if res_os_mes else [0, 0, 0]

        cursor.execute("""
            SELECT 
                falhas.falha AS falha,
                COUNT(ordens_servicos.id_ordem) AS total
            FROM ordens_servicos
            INNER JOIN falhas ON ordens_servicos.id_falha = falhas.id_falha
            WHERE ordens_servicos.id_falha IS NOT NULL
            GROUP BY ordens_servicos.id_falha, falhas.falha
            ORDER BY total DESC
            LIMIT 6
        """)
        res_os_falha = cursor.fetchall()

        labels_falha = [row['falha'] for row in res_os_falha] if res_os_falha else ["Sem registros"]
        valores_falha = [row['total'] for row in res_os_falha] if res_os_falha else [0]
        
        conexao.commit()
        conexao.close()

        return {
            "total_os": total_os,
            "os_pendentes": os_pendentes,
            "maquinas_total": maquinas_total,
            "maquinas_paradas": maquinas_paradas,
            "falhas_computadas": falhas_computadas,
            "labels_mes": labels_mes,
            "valores_mes": valores_mes,
            "labels_falha": labels_falha,
            "valores_falha": valores_falha
        }

    except Exception as e:
        print(f"Erro ao buscar dados do dashboard: {e}")
        if conexao:
            conexao.close()
        return None