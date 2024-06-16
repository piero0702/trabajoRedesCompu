from flask import Flask, request, jsonify
import speedtest
import numpy as np
import pandas as pd
import socket
from ping3 import ping
import time
import plotly.express as px
import plotly.graph_objects as go
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def measure_latencies(count, url):
    try:
        target = socket.gethostbyname(url)
    except socket.gaierror:
        return None, "URL no válida o no se pudo resolver la dirección."

    latencies = []
    for _ in range(count):
        latencia = ping(target, timeout=2)
        if latencia is not None:
            latencies.append(latencia * 1000)  # Convertir a milisegundos
        time.sleep(1)

    if not latencies:
        return None, "No se pudo obtener latencias."
    return latencies, None

def calculoLatencia(arrayLatencias):
    latenciaPromedio = sum(arrayLatencias) / len(arrayLatencias)
    latenciaMayor = max(arrayLatencias)
    latenciaMenor = min(arrayLatencias)
    return latenciaPromedio, latenciaMayor, latenciaMenor

@app.route('/api/speedtest', methods=['POST'])
def run_speedtest():
    data = request.json
    num_tests = data['num_tests']
    url = data['url']
    
    # Crear un objeto Speedtest
    st = speedtest.Speedtest()
    
    # Listas para almacenar las velocidades de descarga, subida y latencia
    download_speeds = []
    upload_speeds = []
    latencies = []
    acomulador = 0
    
    # Medir latencias
    latencias_medidas, error = measure_latencies(num_tests, url)
    if error:
        return jsonify({"error": error}), 400
    if latencias_medidas is None:
        latencias_medidas = [0] * num_tests  # Asignar 0 en caso de error
    
    for _ in range(num_tests):
        # Medir la velocidad de descarga y subida
        download_speed = st.download() / 1_000_000  # Convertir a Mbps
        upload_speed = st.upload() / 1_000_000  # Convertir a Mbps
        
        # Redondear las velocidades a 2 decimales
        download_speed = round(download_speed, 2)
        upload_speed = round(upload_speed, 2)
        
        acomulador += 1
        print(f"Download de prueba N° {acomulador}: {download_speed} Mbps") 
        print(f"Upload de prueba N° {acomulador}: {upload_speed} Mbps") 
        print(f"Latencia de prueba N° {acomulador}: {latencias_medidas[acomulador - 1]} ms")
        
        # Agregar las velocidades a las listas
        download_speeds.append(download_speed)
        upload_speeds.append(upload_speed)
        latencies.append(latencias_medidas[acomulador - 1])
    
    # Calcular latencias
    latenciaPromedio, latenciaMayor, latenciaMenor = calculoLatencia(latencies)
    
    # Convertir los datos a un DataFrame de pandas
    df = pd.DataFrame({
        'Test Number': list(range(1, num_tests + 1)),
        'Download Speed (Mbps)': download_speeds,
        'Upload Speed (Mbps)': upload_speeds,
        'Latency (ms)': latencies
    })
    
    # Histograma de velocidad de descarga
    fig_download_hist = px.histogram(df, x='Download Speed (Mbps)', title='Histograma de Velocidad de Descarga')
    
    # Histograma de velocidad de subida
    fig_upload_hist = px.histogram(df, x='Upload Speed (Mbps)', title='Histograma de Velocidad de Subida')
    
    # Gráfico de líneas de velocidad de descarga y subida en el tiempo
    fig_speeds_time = go.Figure()
    fig_speeds_time.add_trace(go.Scatter(
        x=df['Test Number'],
        y=df['Download Speed (Mbps)'],
        mode='lines+markers',
        name='Download Speed',
        line=dict(color='blue')
    ))
    fig_speeds_time.add_trace(go.Scatter(
        x=df['Test Number'],
        y=df['Upload Speed (Mbps)'],
        mode='lines+markers',
        name='Upload Speed',
        line=dict(color='purple')
    ))
    fig_speeds_time.update_layout(
        title='Variabilidad de la Velocidad de Internet en el Tiempo',
        xaxis_title='Número de prueba',
        yaxis_title='Velocidad (Mbps)',
        legend_title='Tipo de velocidad'
    )
    
    # Gráfico de barras comparando velocidades promedio de descarga y subida
    avg_download_speed = np.mean(download_speeds)
    avg_upload_speed = np.mean(upload_speeds)
    fig_avg_speeds = go.Figure()
    fig_avg_speeds.add_trace(go.Bar(
        x=['Download Speed', 'Upload Speed'],
        y=[avg_download_speed, avg_upload_speed],
        text=[f'{avg_download_speed:.2f} Mbps', f'{avg_upload_speed:.2f} Mbps'],
        textposition='auto',
        name='Average Speeds'
    ))
    fig_avg_speeds.update_layout(
        title='Velocidades Promedio de Descarga y Subida',
        xaxis_title='Tipo de velocidad',
        yaxis_title='Velocidad (Mbps)'
    )
    
    # Histograma de latencia
    fig_latency_hist = px.histogram(df, x='Latency (ms)', title='Histograma de Latencia')
    
    # Gráfico de cajas (box plot) de latencia
    fig_latency_box = px.box(df, y='Latency (ms)', title='Distribución de la Latencia')
    
    # Gráfico de barras de velocidad máxima, mínima y promedio
    max_download_speed = np.max(download_speeds)
    min_download_speed = np.min(download_speeds)
    max_upload_speed = np.max(upload_speeds)
    min_upload_speed = np.min(upload_speeds)
    fig_max_min_avg_speeds = go.Figure()
    fig_max_min_avg_speeds.add_trace(go.Bar(
        x=['Download Speed', 'Upload Speed'],
        y=[max_download_speed, max_upload_speed],
        text=[f'{max_download_speed:.2f} Mbps', f'{max_upload_speed:.2f} Mbps'],
        textposition='auto',
        name='Max Speed'
    ))
    fig_max_min_avg_speeds.add_trace(go.Bar(
        x=['Download Speed', 'Upload Speed'],
        y=[min_download_speed, min_upload_speed],
        text=[f'{min_download_speed:.2f} Mbps', f'{min_upload_speed:.2f} Mbps'],
        textposition='auto',
        name='Min Speed'
    ))
    fig_max_min_avg_speeds.add_trace(go.Bar(
        x=['Download Speed', 'Upload Speed'],
        y=[avg_download_speed, avg_upload_speed],
        text=[f'{avg_download_speed:.2f} Mbps', f'{avg_upload_speed:.2f} Mbps'],
        textposition='auto',
        name='Avg Speed'
    ))
    fig_max_min_avg_speeds.update_layout(
        title='Velocidades Máxima, Mínima y Promedio de Descarga y Subida',
        xaxis_title='Tipo de velocidad',
        yaxis_title='Velocidad (Mbps)',
        barmode='group'
    )
    
    # Panel de KPIs
    fig_kpis = go.Figure()
    fig_kpis.add_trace(go.Indicator(
        mode="number",
        value=avg_download_speed,
        title={"text": "Velocidad Promedio de Descarga (Mbps)"},
        domain={'row': 0, 'column': 0}
    ))
    fig_kpis.add_trace(go.Indicator(
        mode="number",
        value=avg_upload_speed,
        title={"text": "Velocidad Promedio de Subida (Mbps)"},
        domain={'row': 0, 'column': 1}
    ))
    fig_kpis.add_trace(go.Indicator(
        mode="number",
        value=latenciaPromedio,
        title={"text": "Latencia Promedio (ms)"},
        domain={'row': 1, 'column': 0}
    ))
    fig_kpis.add_trace(go.Indicator(
        mode="number",
        value=latenciaMayor,
        title={"text": "Latencia Máxima (ms)"},
        domain={'row': 1, 'column': 1}
    ))
    fig_kpis.update_layout(
        title='Panel de KPIs',
        grid={'rows': 2, 'columns': 2, 'pattern': "independent"}
    )
    
    # Convertir gráficos a HTML
    download_hist_html = fig_download_hist.to_html(full_html=False)
    upload_hist_html = fig_upload_hist.to_html(full_html=False)
    speeds_time_html = fig_speeds_time.to_html(full_html=False)
    avg_speeds_html = fig_avg_speeds.to_html(full_html=False)
    latency_hist_html = fig_latency_hist.to_html(full_html=False)
    latency_box_html = fig_latency_box.to_html(full_html=False)
    max_min_avg_speeds_html = fig_max_min_avg_speeds.to_html(full_html=False)
    kpis_html = fig_kpis.to_html(full_html=False)
    
    response = {
        "download_hist": download_hist_html,
        "upload_hist": upload_hist_html,
        "speeds_time": speeds_time_html,
        "avg_speeds": avg_speeds_html,
        "latency_hist": latency_hist_html,
        "latency_box": latency_box_html,
        "max_min_avg_speeds": max_min_avg_speeds_html,
        "kpis": kpis_html
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
