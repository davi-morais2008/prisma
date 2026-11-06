from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
from werkzeug.security import generate_password_hash
from werkzeug.middleware.proxy_fix import ProxyFix
import flask_mail
from model.recuperarSenha import atualizar_senha_usuario, buscar_usuario_por_email
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, session, flash, jsonify, url_for

load_dotenv()
app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'PRISMA_maintence') 
app.config['PREFERRED_URL_SCHEME'] = 'https'
# Substitua a configuração da porta e TLS/SSL por esta:
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'gustavocaua934@gmail.com'
app.config['MAIL_PASSWORD'] = 'difk voha efzq rmsj'
app.config['MAIL_DEFAULT_SENDER'] = ('PRISMA', 'gustavocaua934@gmail.com')
app.config['MAIL_DEBUG'] = True

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

@app.route('/', methods=['GET', 'POST'])
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
        return redirect('https://prisma-maintenance.onrender.com/login')

    if request.method == 'POST':
        nova_senha = request.form.get('senha')
        senha_hash = generate_password_hash(nova_senha)

        # Chama a função do model para atualizar a senha no banco
        atualizar_senha_usuario(email, senha_hash)

        flash('Sua senha foi alterada com sucesso!', 'success')
        return redirect(url_for('pagina_login'))

    return render_template('redefinir_senha.html', token=token)


if __name__ == '__main__':
    # Roda localmente na porta 8080
    app.run(host="0.0.0.0", port=8080, debug=True)  

