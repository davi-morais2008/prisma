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
from werkzeug.middleware.proxy_fix import ProxyFix
import flask_mail
from model.cadastro import cadastrar_usuario
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'PRISMA_maintence') 
app.config['PREFERRED_URL_SCHEME'] = 'https'
# Configurações do Gmail usando SSL na porta 465 (Compatível com Render)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 8561
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', 'gustavocaua934@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = ('PRISMA', app.config['MAIL_USERNAME'])

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])


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
                with mail.connect() as conn:
                    conn.send(msg)
            except Exception as e:
                # Exibe apenas a mensagem direta do erro no log do Render
                print(f"ERRO EMAIL: {e}", flush=True)
                flash('Erro ao enviar o e-mail. Tente novamente mais tarde.', 'danger')
                return redirect(url_for('esqueci_senha'))

        flash('Se o e-mail estiver cadastrado, você receberá um link de redefinição.', 'info')
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

if __name__ == '__main__':
    # Roda localmente na porta 8080
    app.run(host="0.0.0.0", port=8080, debug=True)