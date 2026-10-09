from flask import Flask, render_template, request, redirect, session, flash, jsonify

app = Flask(__name__)

app.secret_key = 'PRISMA_maintence'

@app.route("/historico")

def pagina_historico():
    return render_template("historico.html")

@app.route('/login')
def pagina_login():
    return render_template('login.html')

@app.route('/login/post', methods = ['POST'])
def pagina_login_acesso():
    login_usuario = request.form.get('logar_usuario')


    if recuperar_login(login_usuario,senha_usuario):
        session['usuario_logado'] = login_usuario
        return redirect('/admin')
    else:
        flash('Usuário ou senha inválida!')
        flash('Tente Novamente!')
        return redirect('/login')

@app.route('/login/logout')
def logout():
    session = None
    return redirect('/login')


if __name__ == "__main__":

    app.run(host="0.0.0.0", port=8080, debug=True)