from flask import Flask, render_template, request, redirect, session, flash, jsonify, url_for
from model.login import login_usuario
from model.buscar_finalizado import buscar_os_finalizado
from model.buscar_finalizado_individual import buscar_os_finalizado_ind
from model.OS import consultar_ordem_servico, cadastrar_ordem_servico
from model.usuario import buscar_usuario
from model.recuperarSenha import atualizar_senha_usuario, buscar_usuario_por_email
from model.dashboard import buscar_dados_dashboard
from model.consultaMaquinas import consultar_maquinas
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
from werkzeug.security import generate_password_hash
import flask_mail
from model.cadastro import cadastrar_usuario
from flask_mail import Mail, Message


app = Flask(__name__)
app.config['SECRET_KEY'] = 'PRISMA_maintence'

# Configurações do Gmail da empresa
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'gustavocaua934@gmail.com'
app.config['MAIL_PASSWORD'] = 'srqt tyry lwjd qcxh'
app.config['MAIL_DEFAULT_SENDER'] = ('PRISMA', 'gustavocaua934@gmail.com')

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])


@app.route('/esqueci-senha', methods=['GET', 'POST'])
@app.route('/recuperacaoSenha', methods=['GET', 'POST']) # <--- Aceita as duas URLs para a mesma função
def esqueci_senha():
    if request.method == 'POST':
        email = request.form.get('email')

        # Chama a função do model para buscar no banco
        usuario = buscar_usuario_por_email(email)

        if usuario:
            token = serializer.dumps(email, salt='recuperar-senha-salt')
            link_redefinicao = url_for('redefinir_senha', token=token, _external=True)

            msg = Message('Recuperação de Senha - PRISMA', recipients=[email])
            msg.body = f'Acesse o link para redefinir sua senha: {link_redefinicao}\n\nEste link expira em 30 minutos.'
            
            try:
                mail.send(msg)
            except Exception:
                flash('Erro ao enviar o e-mail. Tente novamente mais tarde.', 'danger')
                return redirect(url_for('esqueci_senha'))

        flash('Se o e-mail estiver cadastrado, você receberá um link de redefinção.', 'info')
        return redirect(url_for('esqueci_senha'))

    return render_template('recuperacaoSenha.html')


@app.route('/reset-senha/<token>', methods=['GET', 'POST'])
def redefinir_senha(token):
    try:
        email = serializer.loads(token, salt='recuperar-senha-salt', max_age=1800)
    except SignatureExpired:
        flash('O link expirou. Solicite uma nova recuperação.', 'warning')
        return redirect(url_for('esqueci_senha'))
    except BadTimeSignature:
        flash('Link inválido ou corrompido.', 'danger')
        return redirect(url_for('esqueci_senha'))

    if request.method == 'POST':
        nova_senha = request.form.get('senha')
        senha_hash = generate_password_hash(nova_senha)

        # Chama a função do model para atualizar a senha no banco
        atualizar_senha_usuario(email, senha_hash)

        flash('Sua senha foi alterada com sucesso!', 'success')
        return redirect(url_for('pagina_login'))

    return render_template('redefinir_senha.html', token=token)


@app.route('/painelGeral')
def painel_geral():
    return render_template('painelGeral.html')

@app.route('/api/dados')
def get_dados():
    try:
        informacoes = buscar_dados_dashboard()
        return jsonify({
            "kpis": {
                "total_os": informacoes["total_os"],
                "os_pendentes": informacoes["os_pendentes"],
                "maquinas_ativas": informacoes["maquinas_total"],
                "total_falhas": informacoes["falhas_total"]
            },
            "os_por_mes": {
                "labels": informacoes["labels_mes"],
                "valores": informacoes["valores_mes"]
            }
        })
    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)}), 500

@app.route("/telaInicial")
def pagina_inicial():
    ordem_servico = consultar_ordem_servico()
    return render_template("telaInicial.html", ordem_servico = ordem_servico)

@app.route("/api/get/ordens_servico/", methods=["GET"])
def api_get_ordem():
    try:
        ordens = consultar_ordem_servico()
        return jsonify(ordens), 200
    except Exception as e:
            return jsonify({"status": "erro", "mensagem": str(e)}), 500

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
    flash('Usuário ou Senha INCORRETOS. Tente Novamente!', 'error')
    return redirect('/login')


@app.route('/cadastro/post', methods = ['POST'])
def post_cadastro():
    username = request.form.get("cadastro-nome")
    user_email = request.form.get("cadastro-email")
    user_cpf = request.form.get("cadastro-cpf")
    user_pwd = request.form.get("cadastro-pwd")
    user_confirm_pwd = request.form.get("cadastro-confirmpwd")
    if buscar_usuario((user_cpf, user_email))[0]['resultado'] == user_cpf:
        flash ('Este CPF já está cadastrado no sistema. Tente o Cadastro Novamente!', 'error')
        return redirect('/login')
    if buscar_usuario((user_cpf, user_email))[0]['resultado'] == user_email:
        flash('Este email já está vinculado a uma conta. Tente o Cadastro Novamente!', 'error')
        return redirect('/login')
    if user_pwd != user_confirm_pwd:
        flash('As senhas não correspondem entre si. Tente o Cadastro Novamente!', 'error')
        return redirect('/login')
    try:
        if cadastrar_usuario(user_cpf, username, user_email, user_pwd):
            flash('Efetue o Login para acessar o Sistema', 'sucsses')
            return redirect('/login')
        else:
            flash('Erro ao cadastrar-se. Tente Novamente', 'error')
            return redirect('/login')
    except Exception as e:
        flash('Erro ao cadastrar-se. Tente Novamente', 'error')
    return redirect('/login')
    



@app.route('/maquinas', methods = ['GET'])
def pagina_maquinas():
    maquinas = consultar_maquinas()
    return render_template('maquinas.html', maquinas = maquinas)

@app.route('/maquinas;')



@app.route('/usuarios', methods = ['GET'])
def pagina_usuarios():
    return render_template('usuarios.html')

    
@app.route('/calendario')
def pagina_calendario():
    return render_template('calendario.html')

@app.route('/perfil')
def pagina_perfil():
    return render_template('perfil.html')

app.run(host="0.0.0.0", port=8080, debug=True)