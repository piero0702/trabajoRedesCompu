from flask import Flask, request, jsonify
import speedtest
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/speedtest', methods=['POST'])
def run_speedtest():
    data = request.json
    num_tests = data['num_tests']
    
    # Crear un objeto Speedtest
    st = speedtest.Speedtest()
    
    # Listas para almacenar las velocidades de descarga y subida
    download_speeds = []
    upload_speeds = []
    
    for _ in range(num_tests):
        # Medir la velocidad de descarga y subida
        download_speed = st.download() / 1_000_000  # Convertir a Mbps
        upload_speed = st.upload() / 1_000_000  # Convertir a Mbps
        
        # Redondear las velocidades a 2 decimales
        download_speed = round(download_speed, 2)
        upload_speed = round(upload_speed, 2)
        
        print(f"Download Speed Test {_ + 1}: {download_speed} Mbps") 
        print(f"Upload Speed Test {_ + 1}: {upload_speed} Mbps") 
        
        # Agregar las velocidades a las listas
        download_speeds.append(download_speed)
        upload_speeds.append(upload_speed)
    
    # Calcular los KPIs de descarga y subida
    avg_download_speed = np.mean(download_speeds)
    avg_upload_speed = np.mean(upload_speeds)
    
    # Convertir los datos a un DataFrame de pandas
    df = pd.DataFrame({
        'Test Number': list(range(1, num_tests + 1)),
        'Download Speed (Mbps)': download_speeds,
        'Upload Speed (Mbps)': upload_speeds
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
    fig_kpis.update_layout(
        title='Panel de KPIs',
        grid={'rows': 1, 'columns': 2, 'pattern': "independent"}
    )
    kpis_html = fig_kpis.to_html(full_html=False)

    # Gráfico de barras comparando velocidades promedio de descarga y subida
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
    
    # Convertir gráficos a HTML
    download_hist_html = fig_download_hist.to_html(full_html=False)
    upload_hist_html = fig_upload_hist.to_html(full_html=False)
    speeds_time_html = fig_speeds_time.to_html(full_html=False)
    avg_speeds_html = fig_avg_speeds.to_html(full_html=False)
    
    response = {
        "download_hist": download_hist_html,
        "upload_hist": upload_hist_html,
        "speeds_time": speeds_time_html,
        "avg_speeds": avg_speeds_html,
        "avg_download_speed": avg_download_speed,
        "avg_upload_speed": avg_upload_speed,
        "kpis": kpis_html
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
