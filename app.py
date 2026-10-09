from flask import Flask, render_template, request, redirect, session, flash, jsonify
from model.login import login_usuario
from model.cadastro import cadastrar_usuario


app = Flask(__name__)

app.secret_key = 'PRISMA_maintence'

@app.route("/historico")

def pagina_historico():
    return render_template("historico.html")

@app.route('/')
@app.route('/login')
def pagina_login():
    return render_template('login.html')


@app.route('/login/post', methods = ['POST'])
def pagina_login_tecnico():
    login_do_usuario = request.form.get('cpf')
    senha_do_usuario = request.form.get('senha')
    
    if login_usuario(login_do_usuario,senha_do_usuario): 
        return redirect('/login')



def pagina_cadastro():
    return render_template('cadastro.html')


@app.route('/cadastro')
def pagina_cadastro():
    cadastro_cpf_do_usuario = request.form.get('cpf')
    cadastro_senha_do_usuario = request.form.get('senha')
    cadastro_email_do_usuario = request.form.get('cpf')
    nome_do_usuario = request.form.get('senha')
    sobrenome_do_usuario = request.form.get('senha')
    
    if cadastrar_usuario(login_do_usuario,senha_do_usuario): 
        return redirect('/login')




app.run(host="0.0.0.0", port=8080, debug=True)