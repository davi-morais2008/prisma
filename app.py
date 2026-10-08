from flask import Flask, render_template, request, redirect, session, flash, jsonify

app = Flask(__name__)

app.secret_key = 'PRISMA_maintence'

app.secret_key = 'megamats'

@app.route("/historico")

def pagina_historico():
    return render_template("historico.html")

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=8080, debug=True)