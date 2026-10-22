from flask import Flask, render_template, request, redirect, session, flash, jsonify
from model.login import login_usuario
from model.buscar_finalizado import buscar_os_finalizado
from model.buscar_finalizado_individual import buscar_os_finalizado_ind
from model.usuario import buscar_usuario
app = Flask(__name__)

app.secret_key = 'PRISMA_maintence'


@app.route("/telaInicial")
def pagina_inicial():
    return render_template("telaInicial.html")

@app.route("/historico")

def pagina_historico():
    OSfinalizado = buscar_os_finalizado()
    return render_template("historico.html", OSfinalizado = OSfinalizado)

@app.route("/api/get/info_manutencao/<int:id_ordem>", methods=["GET"])

def api_get_info_manutencao(id_ordem):
    try:
        informacoes = buscar_os_finalizado_ind(id_ordem)
        return jsonify(informacoes), 200
    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)}), 500

@app.route('/')

@app.route('/login')
def pagina_login():
    return render_template('cadastroLogin.html')

@app.route('/recuperacaoSenha', methods = ['GET'])
def pagina_recuperar_senha():
    return render_template('recuperacaoSenha.html')

@app.route('/maquinas', methods = ['GET'])
def pagina_maquinas():
    return render_template('maquinas.html')

@app.route('/usuarios', methods = ['GET'])
def pagina_usuarios():
    return render_template('usuarios.html')

@app.route('/usuarios/api_get/users')
def api_get_users():
    try:
        usuarios = buscar_usuario()
        return jsonify(usuarios), 200
    except Exception as e:
            return jsonify({"status": "erro", "mensagem": str(e)}), 500

    
@app.route('/calendario')
def pagina_calendario():
    return render_template('calendario.html')

app.run(host="0.0.0.0", port=8080, debug=True)