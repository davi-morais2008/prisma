from flask import Flask, render_template, request, redirect, session, flash, jsonify, url_for
from model.login import login_usuario
from model.buscar_finalizado import buscar_os_finalizado
from model.buscar_finalizado_individual import buscar_os_finalizado_ind
from model.OS import consultar_ordem_servico
from model.usuario import buscar_usuario
from model.recuperarSenha import atualizar_senha_usuario, buscar_usuario_por_email
from model.consultaMaquinas import consultar_maquinas
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
from werkzeug.security import generate_password_hash
from model.maquina import cadastrar_maquina, atualizar_maquina, consulta_tipo_maquinas, deletar_maquina, atualizar_editar_maquina
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
@app.route('/recuperacaoSenha', methods=['GET', 'POST'])
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
    tipos_maquinas = consulta_tipo_maquinas()
    return render_template('maquinas.html', maquinas = maquinas, tipos_maquinas = tipos_maquinas)


@app.route('/maquinas/api_request_machines', methods = ['GET'])
def maquinas_api_get():
    maquinas = consultar_maquinas()
    return jsonify(maquinas), 200

@app.route('/maquinas/post_register_machine', methods = ['POST'])
def maquinas_post_register():
    avatar_file = request.files.get("avatar-upload")
    type_machine = request.form.get("type-machine")
    number_machine = request.form.get("number-machine")
    model_machine = request.form.get("model-machine")
    location_machine = request.form.get("location-machine")
    production_time = request.form.get("production-time")
    total_hours = request.form.get("total-hours")
    accumulated_cost = request.form.get("accumulated-cost")
    parts_changed = request.form.get("parts-changed")
    downtime = request.form.get("downtime")
    manual_file = request.files.get("manual-upload")
    status_machine = request.form.get("status-machine")
    scheduled_date = request.form.get("scheduled-date")
    cadastrar_maquina(type_machine, int(number_machine), model_machine, location_machine, "TESTE", status_machine)
    return redirect('/maquinas')

@app.route('/maquinas/api_delete_machines', methods = ['POST'])
def maquinas_delete_machines():
    id_machine = request.get_json()
    deletar_maquina(int(id_machine['id']))
    return jsonify({"status": "sucesso", "mensagem": "Máquina Deletada!"}), 200

@app.route('/maquinas/update_machines', methods = ['POST'])
def maquinas_update_machines(id):
    avatar_file = request.files.get("edit-machine-img")
    type_machine = request.form.get("edit-type")
    number_machine = request.form.get("edit-patrimony")
    production_time = request.form.get("edit-prod-time")
    total_hours = request.form.get("edit-work-hours")
    accumulated_cost = request.form.get("edit-cost")
    parts_changed = request.form.get("edit-parts")
    downtime = request.form.get("edit-stop-time")
    manual_file = request.files.get("manual-upload")
    status_machine = request.form.get("edit-maintance-status")
    scheduled_date = request.form.get("edit-maintance-date")

    atualizar_editar_maquina(
        id,
        type_machine,
        number_machine,
        production_time,
        total_hours,
        accumulated_cost,
        parts_changed,
        downtime,
        status_machine,
        scheduled_date
    )

    return redirect('/maquinas')



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