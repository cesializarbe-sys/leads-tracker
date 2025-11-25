from flask import Flask, render_template, request, redirect
import mysql.connector
from dotenv import load_dotenv
import os

# Cargar variables del archivo .env
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

app = Flask(__name__)

# Conexión a la base de datos
def get_db_connection():
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    return conn

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        telefono = request.form['telefono']
        interes = request.form['interes']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO leads (nombre_completo, correo, telefono, interes) VALUES (%s, %s, %s, %s)",
            (nombre, correo, telefono, interes)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return redirect('/')
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM leads ORDER BY fecha_registro DESC")
    leads = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return render_template('index.html', leads=leads)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)