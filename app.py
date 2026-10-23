from flask import Flask, render_template, request, redirect, session, flash, jsonify
from model.login import login_usuario
from model.buscar_finalizado import buscar_os_finalizado
from model.buscar_finalizado_individual import buscar_os_finalizado_ind
from model.usuario import buscar_usuario, 
from model.cadastro import cadastrar_usuario
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

@app.route('/login/post', methods=['POST'])
def post_login():
    usuarios = buscar_usuario()
    usuario = request.form.get('login_cpf')
    senha = request.form.get('login_senha')
    
    for user in usuarios:
        if user['cpf'] == usuario and user['senha'] == senha:
            session['user'] = (usuario, senha)
            return redirect('/telaInicial')
        else:
            flash('Usuário ou Senha INCORRETOS. Tente Novamente!', 'error')
            return redirect('/login')

@app.route('/cadastro/post', methods = ['POST'])
def post_cadastro():
    usuarios = buscar_usuario()
    username = request.form.get("cadastro-nome")
    user_email = request.form.get("cadastro-email")
    user_cpf = request.form.get("cadastro-cpf")
    user_pwd = request.form.get("cadastro-pwd")
    user_confirm_pwd = request.form.get("cadastro-confirmpwd")
    for user in usuarios:
        if user['cpf'] == user_cpf:
            flash ('Este CPF já está cadastro no sistema. Tente o Cadastro Novamente!', 'error')
            return redirect('/login')
        if user['email'] == user_email:
            flash('Este email já está vinculado a uma conta. Tente o Cadastro Novamente!', 'error')
            return redirect('/login')
        elif user_pwd == user_confirm_pwd:
            cadastrar_usuario(user_cpf, username, )




@app.route('/recuperacaoSenha', methods = ['GET'])
def pagina_recuperar_senha():
    return render_template('recuperacaoSenha.html')

@app.route('/maquinas', methods = ['GET'])
def pagina_maquinas():
    return render_template('maquinas.html')

@app.route('/usuarios', methods = ['GET'])
def pagina_usuarios():
    return render_template('usuarios.html')

    
@app.route('/calendario')
def pagina_calendario():
    return render_template('calendario.html')



app.run(host="0.0.0.0", port=8080, debug=True)