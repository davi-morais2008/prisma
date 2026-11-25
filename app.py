from flask import Flask, render_template, request, redirect, session, flash, jsonify, url_for
from model.login import login_usuario
from model.buscar_finalizado import buscar_os_finalizado, buscar_filtrado
from model.buscar_finalizado_individual import buscar_os_finalizado_ind
from model.OS import consultar_ordem_servico, cadastrar_ordem_servico, filtrar_ordem_servico, destinar_tecnico_os, iniciar_OS, editar_ordem_servico
from model.usuario import buscar_usuario, atualizar_usuario, alterar_status_usuario, buscar_usuario_especialidade
from model.OS_inspec import inserir_ordem_inspecao, consultar_ordens_inspecao, destinar_responsavel_inspecao, editar_ordem_inspecao, finalizar_ordem_inspecao
from model.dashboard import buscar_dados_dashboard
from model.consultaMaquinas import consultar_maquinas, filtrar_maquinas
from model.pecas import inserir_requisicoes_pecas
from model.finalizarOS import finalizar_OS
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
from werkzeug.security import generate_password_hash
from model.maquina import cadastrar_maquina, atualizar_maquina, consulta_tipo_maquinas, deletar_maquina, atualizar_editar_maquina, consulta_setores, consultar_falhas, adicionar_falha, adicionar_tipo_maquina
from model.categorias import (
    listar_tipos_maquina,
    listar_setores,
    listar_falhas,
    inserir_tipo_maquina,
    inserir_setor,
    inserir_falha_por_tipo,
    deletar_tipo_maquina,
    deletar_setor,
    deletar_falha
)
from model.cadastro import cadastrar_usuario
from flask_mail import Mail, Message
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'PRISMA_maintence'

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'gustavocaua934@gmail.com'
app.config['MAIL_PASSWORD'] = 'srqt tyry lwjd qcxh'
app.config['MAIL_DEFAULT_SENDER'] = ('PRISMA', 'gustavocaua934@gmail.com')

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])


@app.context_processor
def inject_user_permissions():
    return {
        'user_rbac': session.get('user_rbac'),
        'user': session.get('user'),
    }


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('user'):
            flash('Por favor, faça login para acessar esta página.', 'warning')
            return redirect(url_for('pagina_login'))
        return f(*args, **kwargs)
    return decorated_function


def roles_required(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not session.get('user'):
                return redirect(url_for('pagina_login'))
            
            user_role = session.get('user_rbac')
            if user_role not in roles:
                flash('Você não tem permissão para acessar este recurso.', 'danger')
                return redirect(url_for('pagina_inicial'))
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator


@app.route('/esqueci-senha', methods=['GET', 'POST'])
@app.route('/recuperacaoSenha', methods=['GET', 'POST'])
def esqueci_senha():
    if request.method == 'POST':
        email = request.form.get('email')
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

        atualizar_senha_usuario(email, senha_hash)

        flash('Sua senha foi alterada com sucesso!', 'success')
        return redirect(url_for('pagina_login'))

    return render_template('redefinir_senha.html', token=token)


@app.route('/painelGeral')
@login_required
@roles_required('admin', 'root')
def painel_geral():
    return render_template('painelGeral.html')


@app.route('/api/dados')
def get_dados():
    try:
        informacoes = buscar_dados_dashboard()
        return jsonify({
            "kpis": {
                "total_os": informacoes["total_os"],
                "finalizada_os": informacoes["finalizada_os"],
                "os_pendentes": informacoes["os_pendentes"],
                "maquinas_ativas": informacoes["maquinas_total"],
                "maquinas_paradas": informacoes["maquinas_paradas"],
                "falhas_computadas": informacoes["falhas_computadas"]
            },
            "os_por_mes": {
                "labels": informacoes["labels_mes"],
                "valores": informacoes["valores_mes"]
            },
            "falhas_quantidade": {
                "labels": informacoes["labels_falha"],
                "valores": informacoes["valores_falha"]
            }
        })
    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)}), 500


@app.route('/logoff')
def logoff():
    session.clear()
    return redirect('/login')


@app.route('/')
@app.route("/telaInicial")
@login_required
def pagina_inicial():
    ordens = consultar_ordem_servico()
    tecnicos = buscar_usuario()
    falhas = consultar_falhas()
    maquinas = consultar_maquinas()
    tipo_maquinas = consulta_tipo_maquinas()
    ordens_inspec = consultar_ordens_inspecao()

    if session.get('user_rbac') == 'root':
        ordens_filtradas = ordens
    else:
        cpf_logado = session.get('user')
        tecnico = next((t for t in tecnicos if t['cpf'] == cpf_logado), None)
        
        if tecnico:
            ordens_filtradas = [
                os for os in ordens 
                if os['tecnico_responsavel'] == tecnico['nome']
            ]
        else:
            ordens_filtradas = []

    if not ordens_filtradas:
        flash("Nenhuma ordem de serviço foi encontrada.", "warning")

    return render_template(
        "telaInicial.html",
        ordens=ordens,
        ordem_servico=ordens_filtradas,
        tecnicos=tecnicos,
        falhas=falhas,
        maquinas=maquinas,
        tipo_maquinas=tipo_maquinas,
        ordens_inspecao = ordens_inspec
    )


@app.route("/telaInicial/filtro/<tipo>", methods=["GET"])
def filtrar_ordens(tipo):
    ordens = filtrar_ordem_servico(tipo)
    tecnicos = buscar_usuario()
    falhas = consultar_falhas()
    maquinas = consultar_maquinas()
    tipo_maquinas = consulta_tipo_maquinas()

    if session.get('user_rbac') == 'root':
        ordens_filtradas = ordens
    else:
        cpf_logado = session.get('user')
        tecnico = next((t for t in tecnicos if t['cpf'] == cpf_logado), None)
        
        if tecnico:
            ordens_filtradas = [
                os for os in ordens 
                if os['tecnico_responsavel'] == tecnico['nome']
            ]
        else:
            ordens_filtradas = []

    if not ordens_filtradas:
        flash(f"Nenhuma ordem de serviço do tipo {tipo} foi encontrada.", "warning")

    return render_template(
        "telaInicial.html",
        ordem_servico=ordens_filtradas,
        tecnicos=tecnicos,
        falhas=falhas,
        maquinas=maquinas,
        tipo_maquinas=tipo_maquinas
    )


@app.route("/api/get/ordens_servico/", methods=["GET"])
def api_get_ordem():
    try:
        ordens_manutencao = consultar_ordem_servico()
        ordens_inspecao = consultar_ordens_inspecao()
        
        return jsonify({
            "ordens_manutencao": ordens_manutencao,
            "ordens_inspecao": ordens_inspecao
        }), 200
    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)}), 500


@app.route("/telaInicial/post-register-order-inspec", methods=["POST"])
def register_os_inspec():
    maquinas = consultar_maquinas()
    nmr_patrimonio = request.form.get('insp_numero_patrimonio')
    date_inspec = request.form.get('insp_data')
    inspec_descricao = request.form.get('insp_descricao')
    solicitante = request.form.get('insp_solicitante')

    id_maquina = None
    for maquina in maquinas:
        if str(maquina['numero_patrimonio']) == str(nmr_patrimonio):
            id_maquina = maquina['id_maquina']

    if id_maquina is None:
        return "Máquina não encontrada com o patrimônio informado", 400

    inserir_ordem_inspecao(id_maquina, solicitante, inspec_descricao, date_inspec)
    return redirect('/telaInicial')


@app.route("/telaInicial/post-register-order-maintenance", methods=["POST"])
def register_os_maintenance():
    maquinas = consultar_maquinas()
    nmr_patrimonio = request.form.get('numero_patrimonio')
    cpf_solicitante = request.form.get('insp_solicitante')
    tec_responsavel = request.form.get('tecnico_responsavel') or None
    tipo_manutencao = request.form.get('tipo_manutencao')
    prev_data_inicio = request.form.get('data_prev_inicio') or None
    prev_data_termino = request.form.get('data_prev_termino') or None
    data_parada = request.form.get('data_parada') or None
    desc_problema = request.form.get('desc_problema')

    id_maquina = None
    for maquina in maquinas:
        if str(maquina['numero_patrimonio']) == str(nmr_patrimonio):
            id_maquina = maquina['id_maquina']

    if id_maquina is None:
        return "Máquina não encontrada com o patrimônio informado", 400

    id_ordem = cadastrar_ordem_servico(
        id_maquina,
        1,
        cpf_solicitante,
        tec_responsavel,
        tipo_manutencao,
        desc_problema,
        data_parada,
        prev_data_inicio,
        prev_data_termino
    )

    if request.form.get('solicitar_pecas') == '1':
        nomes_pecas = request.form.getlist('peca_nome[]')
        quantidades_pecas = request.form.getlist('peca_quantidade[]')

        pecas_validas = [
            (nome.strip(), int(qtd))
            for nome, qtd in zip(nomes_pecas, quantidades_pecas)
            if nome.strip()
        ]

        if pecas_validas:
            inserir_requisicoes_pecas(id_ordem, pecas_validas)

    return redirect('/telaInicial')


@app.route("/telaInicial/finalizar-maintenance/<int:id>", methods=['POST'])
def finish_os(id):
    desc_manutencao = request.form.get('desc_manutencao', '').strip()

    if not desc_manutencao:
        flash('Informe a descrição da manutenção realizada.', 'erro')
        return redirect('/telaInicial')

    finalizar_OS(id, desc_manutencao, '')
    flash('Ordem de serviço finalizada com sucesso!', 'sucesso')
    return redirect('/telaInicial')


@app.route('/telaInicial/finalizar-inspecao/<int:id_inspecao>', methods=['POST'])
def rota_finalizar_inspecao(id_inspecao):
    if 'user' not in session:
        return redirect('/telaInicial')

    sucesso = finalizar_ordem_inspecao(id_inspecao)

    if sucesso:
        flash('Ordem de inspeção finalizada com sucesso!', 'sucesso')
    else:
        flash('Erro ao finalizar a ordem de inspeção.', 'erro')

    return redirect('/telaInicial')

@app.route("/telaInicial/destinar-os-maintenance/<int:id>", methods=['POST'])
def assign_os_maintenance(id):
    cpf_tecnico = request.form.get('tecnico_responsavel')

    destinar_tecnico_os(id, cpf_tecnico)
    return redirect('/telaInicial')

@app.route("/telaInicial/destinar-os-inspec/<int:id>", methods=['POST'])
def assign_os_inspec(id):
    cpf_tecnico = request.form.get('tecnico_responsavel')

    destinar_responsavel_inspecao(id, cpf_tecnico)
    return redirect('/telaInicial')

# @app.route("/telaInicial/iniciar/<int:id>", methods=['POST']) 
# def start_os(id):
#     iniciar_OS(id)
#     return redirect('/telaInicial')

@app.route('/telaInicial/editar-inspecao/<int:id_inspecao>', methods=['POST'])
def rota_editar_inspecao(id_inspecao):
    # Verifica autenticação e permissão administrativa
    if 'user' not in session:
        return redirect(url_for('login'))

    if session.get('user_rbac') not in ['admin', 'root']:
        flash('Você não tem permissão para editar ordens de inspeção.', 'erro')
        return redirect('/telaInicial')

    # Captura os campos enviados pelo #formUpdateInspection
    status_inspecao = request.form.get('status_inspecao', '').strip()
    cpf_tecnico = request.form.get('cpf', '').strip() or None
    data_inspec = request.form.get('data_inspec', '').strip()
    descricao_inspecao = request.form.get('descricao_inspecao', '').strip()

    # Validação básica dos campos obrigatórios
    if not status_inspecao or not data_inspec or not descricao_inspecao:
        flash('Preencha todos os campos obrigatórios da inspeção.', 'erro')
        return redirect('/telaInicial')

    sucesso = editar_ordem_inspecao(
        id_ordem_inspecao=id_inspecao,
        status_inspecao=status_inspecao,
        cpf=cpf_tecnico,
        data_inspec=data_inspec,
        descricao_inspecao=descricao_inspecao
    )

    if sucesso:
        flash('Ordem de inspeção atualizada com sucesso!', 'sucesso')
    else:
        flash('Erro ao atualizar a ordem de inspeção.', 'erro')

    return redirect('/telaInicial')


@app.route("/historico")
@login_required
def pagina_historico():
    OSfinalizado = buscar_os_finalizado()
    print(OSfinalizado)
    if OSfinalizado == []:
        flash("Nenhum histórico encontrado.", "warning")
    return render_template("historico.html", OSfinalizado=OSfinalizado)


@app.route("/api/get/info_manutencao/<int:id_ordem>", methods=["GET"])
def api_get_info_manutencao(id_ordem):
    try:
        informacoes = buscar_os_finalizado_ind(id_ordem)
        return jsonify(informacoes), 200
    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)}), 500

@app.route ("/historico/filtro/usuario", methods=["GET"])
def historico_filtrado():
    nome_usuario = request.args.get("tecnico", "").strip()
    OSfinalizado = buscar_filtrado(nome_usuario)
    if OSfinalizado == []:
        flash("Nenhum histórico encontrado.", "warning")
    return render_template("historico.html", OSfinalizado = OSfinalizado)

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
            if not user.get('status_usuario'):
                flash('Seu cadastro está aguardando aprovação de um administrador ou está inativo.', 'warning')
                return redirect('/login')

            session['user'] = user['cpf']
            session['user_rbac'] = user['rbac']
            return redirect('/telaInicial')

    flash('Usuário ou Senha incorreto. Tente Novamente!', 'error')
    return redirect('/login')


@app.route('/cadastro/post', methods=['POST'])
def post_cadastro():
    username = request.form.get("cadastro-nome")
    user_email = request.form.get("cadastro-email")
    user_cpf = request.form.get("cadastro-cpf")
    user_pwd = request.form.get("cadastro-pwd")
    user_confirm_pwd = request.form.get("cadastro-confirmpwd")
    if buscar_usuario((user_cpf, user_email))[0]['resultado'] == user_cpf:
        flash('Este CPF já está cadastrado no sistema. Tente o Cadastro Novamente!', 'error')
        return redirect('/login')
    if buscar_usuario((user_cpf, user_email))[0]['resultado'] == user_email:
        flash('Este email já está vinculado a uma conta. Tente o Cadastro Novamente!', 'error')
        return redirect('/login')
    if user_pwd != user_confirm_pwd:
        flash('As senhas não correspondem entre si. Tente o Cadastro Novamente!', 'error')
        return redirect('/login')
    try:
        if cadastrar_usuario(user_cpf, username, user_email, user_pwd):
            flash('Cadastro enviado! Aguarde a aprovação de um administrador para acessar o sistema.', 'info')
            return redirect('/login')
        else:
            flash('Erro ao cadastrar-se. Tente Novamente', 'error')
            return redirect('/login')
    except Exception as e:
        flash('Erro ao cadastrar-se. Tente Novamente', 'error')
    return redirect('/login')

@app.route('/maquinas', methods = ['GET'])
@login_required
def pagina_maquinas():
    maquinas = consultar_maquinas()
    tipos_maquinas = consulta_tipo_maquinas()
    setores = consulta_setores()
    return render_template('maquinas.html', maquinas=maquinas, tipos_maquinas=tipos_maquinas, setores=setores)

@app.route('/maquinas/api_request_machines', methods = ['GET'])
def maquinas_api_get():
    maquinas = consultar_maquinas()
    return jsonify(maquinas), 200


@app.route('/maquinas/filtro/<tipo>', methods=["GET"])
def filtro_maquinas(tipo):
    maquinas_filtradas = filtrar_maquinas(tipo)
    tipos_maquinas = consulta_tipo_maquinas()
    
    if not maquinas_filtradas:
        flash(f"Nenhuma máquina do tipo {tipo} foi encontrada.", "warning")

    return render_template("maquinas.html", maquinas=maquinas_filtradas, tipos_maquinas=tipos_maquinas)


@app.route('/maquinas/post_register_machine', methods=['POST'])
@roles_required('admin', 'root')
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
    cadastrar_maquina(type_machine, number_machine, model_machine, location_machine, "TESTE", status_machine)
    return redirect('/maquinas')


@app.route('/maquinas/api_delete_machines', methods=['POST'])
@roles_required('admin', 'root')
def maquinas_delete_machines():
    id_machine = request.get_json()
    deletar_maquina(int(id_machine['id']))
    return jsonify({"status": "sucesso", "mensagem": "Máquina Deletada!"}), 200


@app.route('/maquinas/update_machines', methods=['POST'])
@roles_required('admin', 'root')
def maquinas_update_machines():
    avatar_file = request.files.get("edit-machine-img")
    type_machine = request.form.get("edit-type")
    number_machine = request.form.get("edit-patrimony")
    model_machine = request.form.get("edit-model")
    location_machine = request.form.get('edit-location')
    production_time = request.form.get("edit-prod-time")
    total_hours = request.form.get("edit-work-hours")
    accumulated_cost = request.form.get("edit-cost")
    parts_changed = request.form.get("edit-parts")
    downtime = request.form.get("edit-stop-time")
    manual_file = request.files.get("manual-upload")
    status_machine = request.form.get("edit-maintance-status")
    scheduled_date = request.form.get("edit-maintance-date")
    id_machine = request.form.get('id-machine')

    atualizar_editar_maquina(int(id_machine), type_machine, model_machine, number_machine, location_machine, status_machine)
    return redirect('/maquinas')


@app.route('/maquina/adicionar_falha', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def adicionar_falha_post():
    id_maquina = request.form.get('id_maquina')
    falha = request.form.get('descricao_falha')
    try:
        adicionar_falha(id_maquina, falha)
        flash('Falha adicionada com sucesso', 'success')
    except Exception as e:
        pass
    return redirect('/maquinas')


@app.route('/maquina/adicionar_tipo_maquina', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def adicionar_tipo_maquina_post():
    tipo_maquina = request.form.get('nome_tipo')
    try:
        adicionar_tipo_maquina(tipo_maquina)
        flash('Tipo de Máquina adicionado com sucesso', 'success')
    except Exception as e:
        pass
    return redirect('/maquinas')


# =========================================================
# ROTAS DE CATEGORIAS (LISTAR E ADICIONAR)
# =========================================================

@app.route('/categorias')
@login_required
@roles_required('admin', 'root')
def categorias():
    tipos_maquina = listar_tipos_maquina()
    setores = listar_setores()
    falhas = listar_falhas()

    # Agrupa cada falha dentro do seu respectivo Tipo de Máquina
    for tipo in tipos_maquina:
        tipo['falhas'] = [
            f for f in falhas
            if f['id_tipo_maquina'] == tipo['id_tipo_maquina']
        ]

    return render_template(
        'categorias.html',
        tipos_maquina=tipos_maquina,
        setores=setores
    )


@app.route('/categorias/adicionar_tipo', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def categorias_adicionar_tipo():
    nome_tipo = request.form.get('tipo_maquina')
    if nome_tipo and nome_tipo.strip():
        if inserir_tipo_maquina(nome_tipo.strip()):
            flash('Tipo de máquina cadastrado com sucesso!', 'success')
        else:
            flash('Erro ao cadastrar tipo de máquina.', 'danger')
    return redirect('/categorias')


@app.route('/categorias/adicionar_setor', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def categorias_adicionar_setor():
    nome_setor = request.form.get('setor')
    if nome_setor and nome_setor.strip():
        if inserir_setor(nome_setor.strip()):
            flash('Setor cadastrado com sucesso!', 'success')
        else:
            flash('Erro ao cadastrar setor.', 'danger')
    return redirect('/categorias')


@app.route('/categorias/adicionar_falha', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def categorias_adicionar_falha():
    id_tipo_maquina = request.form.get('id_tipo_maquina')
    nome_falha = request.form.get('falha')
    if id_tipo_maquina and nome_falha and nome_falha.strip():
        if inserir_falha_por_tipo(int(id_tipo_maquina), nome_falha.strip()):
            flash('Falha cadastrada com sucesso!', 'success')
        else:
            flash('Erro ao cadastrar falha.', 'danger')
    return redirect('/categorias')

@app.route('/categorias/deletar_tipo/<int:id_tipo_maquina>', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def categorias_deletar_tipo(id_tipo_maquina):
    if deletar_tipo_maquina(id_tipo_maquina):
        flash('Tipo de máquina excluído com sucesso!', 'success')
    else:
        flash('Não foi possível excluir este tipo de máquina (verifique se existem máquinas ou falhas vinculadas a ele).', 'danger')
    return redirect('/categorias')


@app.route('/categorias/deletar_setor/<int:id_setor>', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def categorias_deletar_setor(id_setor):
    if deletar_setor(id_setor):
        flash('Setor excluído com sucesso!', 'success')
    else:
        flash('Não foi possível excluir este setor (verifique se existem máquinas vinculadas a ele).', 'danger')
    return redirect('/categorias')


@app.route('/categorias/deletar_falha/<int:id_falha>', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def categorias_deletar_falha(id_falha):
    if deletar_falha(id_falha):
        flash('Falha excluída com sucesso!', 'success')
    else:
        flash('Não foi possível excluir esta falha (verifique se existem ordens de serviço vinculadas a ela).', 'danger')
    return redirect('/categorias')  


@app.route('/profile')
@login_required
def pagina_perfil():
    users = buscar_usuario()
    especialidades = buscar_usuario_especialidade(session['user'])
    for user in users: 
        if user['cpf'] == session['user']:
            return render_template('perfil.html', usuario=user, especialidade=especialidades)
    return redirect('/telaInicial')


@app.route('/profile/uptade_information', methods=['POST'])
def pagina_perfil_update():
    nome = request.form.get('user-edit-name')
    email = request.form.get('user-edit-email')
    atualizar_usuario(session['user'], nome, email)
    return redirect('/profile')


@app.route('/usuarios', methods=['GET'])
@login_required
@roles_required('admin', 'root')
def pagina_usuarios():
    lista_de_usuarios = buscar_usuario()
    return render_template('usuarios.html', usuarios=lista_de_usuarios)

@app.route('/calendario')
@login_required
def pagina_calendario():
    return render_template('calendario.html')

@app.route('/usuarios/api_alterar_status', methods=['POST'])
@login_required
@roles_required('admin', 'root')
def api_alterar_status_usuario():
    dados = request.get_json()
    cpf = dados.get('cpf')
    novo_status = dados.get('status')

    try:
        alterar_status_usuario(cpf, novo_status)
        
        if int(novo_status) == 1:
            flash('Usuário ativado e aprovado com sucesso!', 'success')
        else:
            flash('Usuário inativado com sucesso!', 'warning')

        return jsonify({"status": "sucesso", "mensagem": "Status atualizado com sucesso!"}), 200
    except Exception as e:
        flash('Erro ao atualizar o status do usuário.', 'danger')
        return jsonify({"status": "erro", "mensagem": str(e)}), 500
    
@app.route('/api/ordens-servico')
@login_required
def api_ordens_servico():
    ordens = consultar_ordem_servico()
    
    classes_status = {
        "Ativa": "evento-primary",
        "Finalizada": "evento-success",
        "Cancelada": "evento-danger"
    }

    eventos = []
    for os in ordens:
        status = (os.get("status_ordem") or "Ativa").capitalize()
        
        eventos.append({
            "id": os["id_ordem"],
            "title": f"#{os['id_ordem']} - {os['tipo_manutencao']}",
            "start": os["data_prev_inicio_manutencao"].isoformat(),
            "end": os["data_prev_fim_manutencao"].isoformat() if os.get("data_prev_fim_manutencao") else None,
            "className": classes_status.get(status, "evento-primary"),
            "extendedProps": {
                "tipo": os.get("tipo_manutencao"),
                "descricao": os.get("descricao_problema"),
                "status": status
            }
        })

    return jsonify(eventos)


@app.route('/atualizar_ordem/<int:id_ordem>', methods=['POST'])
def atualizar_ordem(id_ordem):
    sucesso = editar_ordem_servico(id_ordem=id_ordem,
            status_ordem=request.form.get('status_ordem'),
            cpf=request.form.get('tecnico_responsavel'),
            fase_manutencao=request.form.get('fase_manutencao'),
            tipo_manutencao=request.form.get('tipo_manutencao'),
            descricao=request.form.get('desc_problema'),
            data_prev_inicio=request.form.get('data_prev_inicio_manutencao'),
            data_prev_termino=request.form.get('data_prev_termino_manutencao'),
            data_parada=request.form.get('data_parada'),
            data_inicio=request.form.get('data_inicio'))

    if sucesso:
        return redirect('/telaInicial')
    else:
        return "Erro ao atualizar ordem de serviço", 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)  