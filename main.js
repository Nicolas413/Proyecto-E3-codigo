import "https://cdn.plot.ly/plotly-2.34.0.min.js"; // Importa la librería Plotly
import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación

// --- Configuración inicial ---
document.body.style.cssText = `
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    font-family: Arial, sans-serif;
    margin: 0; 
    padding: 0; 
    background-color: #f4f4f4;
`;

document.body.innerHTML = `
    <div id='visualization-container' style="display: grid; grid-template-columns: 1fr; gap: 20px; width: 90%; max-width: 1200px; margin: 20px auto;">
        <div id='map-container' style="background: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px; overflow: hidden;">
            <div id='map' style="width: 100%; height: 400px;"></div>
            <div id="legend" class="legend-container" style="display: flex; flex-direction: column; align-items: flex-start; padding: 10px;">
                <h4 style="margin-bottom: 10px; font-size: 14px;">Cantidad de Mundiales</h4>
                ${['#e6e6e6', '#f7e55e', '#ffae42', '#6a3d9a'].map((color, i) => `
                    <div class="legend-item" style="display: flex; align-items: center; margin-bottom: 5px;">
                        <div style="width: 20px; height: 20px; background: ${color}; margin-right: 10px; border-radius: 4px;"></div>
                        <span>${i}</span>
                    </div>`).join('')}
            </div>
        </div>
        <div id='dynamicGraph-container' style="background: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px; padding: 10px;">
            <div id='dynamicGraph' style="width: 100%; height: 400px;"></div>
        </div>
    </div>
`;




// --- Gráfico Estático ---
const countries = [
    "Uruguay", "Italy", "France", "Brazil", "Switzerland", "Sweden", 
    "Chile", "United Kingdom", "Mexico", "Germany", "Argentina", 
    "Spain", "USA", "South Korea", "Japan", "South Africa", "Russia", "Qatar"
];
const counts = [1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1];

const staticData = [{
    type: 'choropleth',
    locationmode: 'country names',
    locations: countries,
    z: counts,
    colorscale: [
        [0, 'rgba(255, 255, 255, 0.1)'],
        [0.33, '#f7e55e'],
        [0.66, '#ffae42'],
        [1, '#6a3d9a'],
    ],
    zmin: 0,
    zmax: 3,
    autocolorscale: false,
    showscale: false,
    hoverinfo: 'location+z',
}];

const staticLayout = {
    title: 'Número de Veces que un País ha sido Anfitrión de un Mundial',
    geo: {
        projection: { type: 'robinson' },
        showland: true,
        landcolor: '#e6e6e6',
        showframe: false,
    },
  dragmode: false,
};

Plotly.newPlot('map', staticData, staticLayout);

// --- Gráfico Dinámico ---
const worldCupData = {
    "1930": { "Host": ["Uruguay"], "Attendance": 590549 },
    "1934": { "Host": ["Italy"], "Attendance": 363000 },
    "1938": { "Host": ["France"], "Attendance": 375700 },
    "1950": { "Host": ["Brazil"], "Attendance": 1045246 },
    "1954": { "Host": ["Switzerland"], "Attendance": 768607 },
    "1958": { "Host": ["Sweden"], "Attendance": 819810 },
    "1962": { "Host": ["Chile"], "Attendance": 893172 },
    "1966": { "Host": ["United Kingdom"], "Attendance": 1563135 },
    "1970": { "Host": ["Mexico"], "Attendance": 1603975 },
    "1974": { "Host": ["Germany"], "Attendance": 1865753 },
    "1978": { "Host": ["Argentina"], "Attendance": 1545791 },
    "1982": { "Host": ["Spain"], "Attendance": 2109723 },
    "1986": { "Host": ["Mexico"], "Attendance": 2394031 },
    "1990": { "Host": ["Italy"], "Attendance": 2516215 },
    "1994": { "Host": ["USA"], "Attendance": 3587538 },
    "1998": { "Host": ["France"], "Attendance": 2903477 },
    "2002": { "Host": ["South Korea", "Japan"], "Attendance": 2705337 },
    "2006": { "Host": ["Germany"], "Attendance": 3352605 },
    "2010": { "Host": ["South Africa"], "Attendance": 3178856 },
    "2014": { "Host": ["Brazil"], "Attendance": 3429873 },
    "2018": { "Host": ["Russia"], "Attendance": 3031768 },
    "2022": { "Host": ["Qatar"], "Attendance": 3404252 },
};

const dynamicLayout = {
    title: 'Asistencia en Copas del Mundo',
    xaxis: { title: 'Año' },
    yaxis: { title: 'Asistencia' },
};

// Lógica para actualizar el gráfico dinámico basado en el código ArUco recibido
Protobject.onReceived(country => {
    console.log(`País detectado: ${country}`);

    // Actualiza los valores `z` para resaltar el país detectado
    const updatedCounts = countries.map((c, index) => (c === country ? counts[index] + 0.5 : counts[index]));

    // Datos actualizados para el mapa
    const updatedStaticData = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: countries,
        z: updatedCounts,
        colorscale: [
            [0, '#e6e6e6'],
            [0.33, '#f7e55e'],
            [0.66, '#ffae42'],
            [1, '#6a3d9a'],
        ],
        zmin: 0,
        zmax: 3.5, // Extendemos el rango para incluir el resaltado.
        autocolorscale: false,
        showscale: false,
        hoverinfo: 'location+z',
        marker: {
            line: {
                color: countries.map(c => (c === country ? '#FF0000' : '#FFFFFF')), // Borde rojo para el país detectado.
                width: countries.map(c => (c === country ? 3 : 1)), // Borde más ancho para el país detectado.
            },
        },
    }];

    // Layout actualizado para el mapa
    const updatedStaticLayout = {
        ...staticLayout,
        title: `Número de Veces que un País ha sido Anfitrión - País Detectado: ${country}`,
    };

    // Actualiza el mapa con los datos modificados
    Plotly.react('map', updatedStaticData, updatedStaticLayout);

    // --- Actualización del gráfico dinámico ---
    const years = Object.keys(worldCupData);
    const attendances = years.map(year => worldCupData[year].Attendance);
    const hosts = years.map(year => worldCupData[year].Host);

    const trace = [{
        x: years,
        y: attendances,
        type: 'bar',
        marker: {
            color: years.map(year => 
                hosts[years.indexOf(year)].includes(country) 
                ? 'rgba(55, 128, 191, 0.7)' 
                : 'rgba(169, 169, 169, 0.7)'
            ),
        },
    }];

    // Actualiza el título del gráfico dinámico
    dynamicLayout.title = `Asistencia en Copas del Mundo - ${country}`;

    // Renderiza el gráfico dinámico actualizado
    Plotly.react('dynamicGraph', trace, dynamicLayout);
});

// Ajusta el tamaño automáticamente
window.addEventListener("resize", () => {
    const mapContainer = document.getElementById("map");
    const dynamicGraph = document.getElementById("dynamicGraph");
    const width = Math.min(window.innerWidth * 0.9, 1200);
    mapContainer.style.width = width + "px";
    dynamicGraph.style.width = width + "px";
});

