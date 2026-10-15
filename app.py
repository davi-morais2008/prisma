from flask import Flask, render_template, request, redirect, session, flash, jsonify
from model.login import login_usuario



app = Flask(__name__)

app.secret_key = 'PRISMA_maintence'

@app.route("/historico")

def pagina_historico():
    return render_template("historico.html")

@app.route('/')
@app.route('/login')
def pagina_login():
    return render_template('cadastroLogin.html')


@app.route('/login/post', methods = ['POST'])
def pagina_login_tecnico():
    login_do_usuario = request.form.get('cpf')
    senha_do_usuario = request.form.get('senha')
    
    if login_usuario(login_do_usuario,senha_do_usuario): 
        return redirect('/login')
    



app.run(host="0.0.0.0", port=8080, debug=True)