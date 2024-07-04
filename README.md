# README

## Proyecto de Medición de QoS - Grupo 3

### Descripción

Este proyecto tiene como objetivo evaluar la calidad de servicio (QoS) de la conexión a Internet. Para ello, se han desarrollado dos pruebas principales:

1. **Test de Velocidad**: Mide la velocidad de descarga y subida de la conexión.
2. **Test de Latencias**: Mide la latencia y el jitter de la conexión hacia un host específico.

### Estructura del Proyecto

#### Backend

El backend está desarrollado con Flask y proporciona dos rutas principales para realizar las pruebas.

**Archivo: `pruebaGraficas.py`**

- **Rutas**:

  - `/api/speedtest`: Realiza el test de velocidad.
  - `/api/latency`: Realiza el test de latencias.
- **Funciones**:

  - `latencias(count, url)`: Calcula las latencias para una URL dada.
  - `calculoLatencia(arrayLatencias)`: Calcula la latencia promedio, máxima y mínima.
  - `calculoJitterPromedio(arrayLatencias)`: Calcula el jitter promedio.
  - `run_speedtest()`: Ejecuta el test de velocidad y genera gráficos con los resultados.
  - `run_latency()`: Ejecuta el test de latencias y genera gráficos con los resultados.

#### Frontend

El frontend está desarrollado con React y proporciona una interfaz de usuario para ejecutar las pruebas y visualizar los resultados.

**Estructura de Carpetas**:

- `src/routes/testVelocidad/TestVelocidad.jsx`: Componente para el test de velocidad.
- `src/routes/testLatencias/TestLatencias.jsx`: Componente para el test de latencias.
- `src/routes/frontpage/FrontPage.jsx`: Página principal de bienvenida.
- `src/components/header/Header.jsx`: Componente de encabezado común en todas las páginas.
- `src/main.jsx`: Archivo principal para la configuración de rutas y renderizado de la aplicación.

### Configuración y Ejecución

#### Backend

1. Clona el repositorio.
2. Instala las dependencias necesarias:
   ```bash
   pip install flask speedtest-cli numpy pandas plotly flask-cors ping3
   ```
3. Ejecuta el servidor Flask:
   ```bash
   python pruebaGraficas.py
   ```

#### Frontend

1. Clona el repositorio.
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Ejecuta la aplicación React:
   ```bash
   npm run dev
   ```

### Uso

1. **Página de Inicio**:

   - Ruta: `/`
   - Descripción: Página de bienvenida con una breve descripción del proyecto.
2. **Test de Velocidad**:

   - Ruta: `/testVelocidad`
   - Funcionalidad: Permite al usuario especificar el número de pruebas de velocidad a realizar y visualizar los resultados en diferentes gráficos.
3. **Test de Latencias**:

   - Ruta: `/testLatencias`
   - Funcionalidad: Permite al usuario especificar el número de pings y la URL a evaluar, mostrando los resultados en gráficos de latencia y KPIs.

### Ejemplo de Uso

#### Test de Velocidad

1. Navega a `/testVelocidad`.
2. Especifica el número de pruebas a realizar.
3. Haz clic en "Iniciar pruebas".
4. Visualiza los resultados en los gráficos generados.

#### Test de Latencias

1. Navega a `/testLatencias`.
2. Especifica el número de pings y la URL a evaluar.
3. Haz clic en "Iniciar pruebas".
4. Visualiza los resultados en los gráficos generados.

### Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva característica (`git checkout -b nueva-caracteristica`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva característica'`).
4. Empuja la rama (`git push origin nueva-caracteristica`).
5. Crea un nuevo Pull Request.

### Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

¡Gracias por usar nuestro medidor de QoS! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contactarnos.
