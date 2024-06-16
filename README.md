# Proyecto de Monitoreo de Red

Este proyecto utiliza Flask para crear una API web que mide la velocidad de Internet, realiza pings a servidores y visualiza los datos usando Plotly. A continuación se detallan los pasos para configurar e instalar las librerías necesarias.

## Requisitos

Asegúrate de tener instalado Python 3.6 o superior. Puedes descargarlo desde [python.org](https://www.python.org/).

## Instalación

Sigue estos pasos para instalar las librerías necesarias:

1. **Clona el repositorio** (si es necesario):

    ```sh
    git clone https://github.com/tu_usuario/tu_repositorio.git
    cd tu_repositorio
    ```

2. **Crea un entorno virtual** (recomendado):

    ```sh
    python -m venv venv
    ```

3. **Activa el entorno virtual**:

    - En Windows:
    
        ```sh
        venv\Scripts\activate
        ```
    
    - En macOS y Linux:
    
        ```sh
        source venv/bin/activate
        ```

4. **Instala las librerías necesarias**:

    ```sh
    pip install -r requirements.txt
    ```

5. **Archivo `requirements.txt`**:

    Asegúrate de tener un archivo `requirements.txt` con el siguiente contenido:

    ```txt
    flask
    speedtest-cli
    numpy
    pandas
    plotly
    flask-cors
    ping3
    ```

## Uso

1. **Ejecuta la aplicación Flask**:

    ```sh
    python app.py
    ```

2. **Accede a la aplicación**:

    Abre tu navegador web y ve a `http://localhost:5000` para interactuar con la API.

## Librerías Utilizadas

- **Flask**: Microframework para la creación de aplicaciones web.
- **speedtest-cli**: Interfaz de línea de comandos para medir la velocidad de Internet.
- **NumPy**: Librería para el cálculo numérico.
- **Pandas**: Librería para la manipulación y análisis de datos.
- **Plotly**: Librería para crear gráficos interactivos.
- **Flask-CORS**: Extensión de Flask para manejar CORS (Cross-Origin Resource Sharing).
- **ping3**: Librería para realizar pings.

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los pasos descritos en [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
