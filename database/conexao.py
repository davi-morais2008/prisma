import mysql.connector
import os
from dotenv import load_dotenv
load_dotenv()


def conectar(): # Função que conecta o servidor no Banco de Dados armazenado no 

    BD_AMBIENTE = os.getenv("BD_AMBIENTE", "local")

    if BD_AMBIENTE == "local":
        conexao = mysql.connector.connect(
            host = "localhost",
            port = "3306",
            user="root",
            password="root",
            database="db_manutencaoDS_EM"
        )
    elif BD_AMBIENTE == "online":
        conexao = mysql.connector.connect(
            host = os.getenv("BD_HOST"),
            port = os.getenv("BD_PORTA"),
            user=os.getenv("BD_USUARIO"),
            password=os.getenv("BD_SENHA"),
            database=os.getenv("BD_DATABASE")
        )

    cursor = conexao.cursor()

    return conexao, cursor