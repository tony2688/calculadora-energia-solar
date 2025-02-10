document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('metodocalculo').addEventListener('change', function() {
        document.getElementById('facturaSection').classList.toggle('hidden', this.value !== 'factura');
        document.getElementById('electrodomesticosSection').classList.toggle('hidden', this.value !== 'electrodomesticos');
    });

    inicializarElectrodomesticos();
    agregarElectro(); // Añade el primer electrodoméstico al cargar la página
});

const CONFIG = {
    eficiencia: 0.85,
    voltajeBaterias: 24,
    profundidadDescarga: 0.5,
    diasAutonomia: 2,
    potenciaPanel: 400,
    hsp: 4.5
};

const electroData = {
    "Afeitadora": { potencia: 5, horas: 0.5 },
    "Aire acondicionado de 2200 frigorías F/C": { potencia: 1350, horas: 8 },
    "Aire acondicionado de 3500 frigorías F/C": { potencia: 2150, horas: 8 },
    "Aire acondicionado de 4500 frigorías F/C": { potencia: 2800, horas: 8 },
    "Aire acondicionado de 2200 frigorías F/C - Inverter": { potencia: 877.5, horas: 8 },
    "Aire acondicionado de 3500 frigorías F/C - Inverter": { potencia: 1397.5, horas: 8 },
    "Aire acondicionado de 4500 frigorías F/C - Inverter": { potencia: 1820, horas: 8 },
    "Anafe vitrocerámica con hornalla de 120 mm de diámetro": { potencia: 750, horas: 1 },
    "Anafe vitrocerámica con hornalla de 140 mm de diámetro": { potencia: 1250, horas: 1 },
    "Anafe vitrocerámica con hornalla de 175 mm de diámetro": { potencia: 1500, horas: 1 },
    "Anafe vitrocerámica con hornalla de 200 mm de diámetro": { potencia: 1800, horas: 1 },
    "Anafe vitrocerámica con hornalla de 215 mm de diámetro": { potencia: 2110, horas: 1 },
    "Anafe vitrocerámica con hornalla de 220 mm de diámetro": { potencia: 2350, horas: 1 },
    "Anafe resistivo con hornalla de 150 mm de diámetro": { potencia: 1000, horas: 1 },
    "Anafe resistivo con hornalla de 190 mm de diámetro": { potencia: 2000, horas: 1 },
    "Aspiradora": { potencia: 1200, horas: 0.5 },
    "Batidora de mano": { potencia: 300, horas: 0.5 },
    "Bomba de agua de 1/2 HP": { potencia: 380, horas: 1 },
    "Bomba de agua de 3/4 HP": { potencia: 570, horas: 1 },
    "Cafetera de filtro eléctrica": { potencia: 900, horas: 0.5 },
    "Caloventilador chico c/termostato": { potencia: 1500, horas: 2 },
    "Cargador de celular genérico": { potencia: 5, horas: 2 },
    "Computadora (sólo la CPU)": { potencia: 200, horas: 4 },
    "Extractor de aire para cocina o baño - 80 m3/hora": { potencia: 12, horas: 2 },
    "Extractor de aire para cocina o baño - 200 m3/hora": { potencia: 20, horas: 2 },
    "Extractor de aire para cocina o baño - 1200 m3/hora": { potencia: 50, horas: 2 },
    "Estufa halógena de 3 velas c/termostato": { potencia: 1500, horas: 2 },
    "Estufa de cuarzo c/termostato": { potencia: 1500, horas: 2 },
    "Freezer": { potencia: 250, horas: 24 },
    "Heladera": { potencia: 150, horas: 24 },
    "Heladera con freezer": { potencia: 200, horas: 24 },
    "Heladera con freezer - Inverter": { potencia: 200, horas: 24 },
    "Horno eléctrico de 25 a 30 litros c/termostato": { potencia: 1500, horas: 1 },
    "Horno eléctrico de 73 litros c/termostato, para empotrar": { potencia: 2450, horas: 1 },
    "Lámpara de bajo consumo de 11W": { potencia: 11, horas: 4 },
    "Lámpara de bajo consumo de 15W": { potencia: 15, horas: 4 },
    "Lámpara de bajo consumo de 20W": { potencia: 20, horas: 4 },
    "Lámpara halógena de 100 W": { potencia: 100, horas: 4 },
    "Lámpara halógena de 40 W": { potencia: 40, horas: 4 },
    "Lámpara halógena de 60 W": { potencia: 60, horas: 4 },
    "Lámpara LED de 5 W": { potencia: 5, horas: 4 },
    "Lámpara LED de 9 W": { potencia: 9, horas: 4 },
    "Lámpara LED de 11 W": { potencia: 11, horas: 4 },
    "Lavarropas automático de 5 kg con calentamiento de agua": { potencia: 2500, horas: 1 },
    "Lavarropas automático de 5 kg": { potencia: 500, horas: 1 },
    "Lavarropas semi-automático de 5 kg": { potencia: 200, horas: 1 },
    "Lavavajilla para 12 cubiertos": { potencia: 1500, horas: 1 },
    "Licuadora de mano o de pie": { potencia: 600, horas: 0.5 },
    "Lustraspiradora": { potencia: 800, horas: 0.5 },
    "Microondas": { potencia: 800, horas: 0.5 },
    "Minicomponentes": { potencia: 60, horas: 2 },
    "Monitor LED de 19\"": { potencia: 22, horas: 4 },
    "Notebook": { potencia: 22, horas: 4 },
    "Pava eléctrica de 1,7 litros": { potencia: 2000, horas: 0.5 },
    "Plancha": { potencia: 1500, horas: 0.5 },
    "Planchita de pelo o buclera": { potencia: 40, horas: 0.5 },
    "Radiador eléctrico mediano c/termostato": { potencia: 1500, horas: 2 },
    "Reproductor de DVD": { potencia: 15, horas: 2 },
    "Secador de cabellos": { potencia: 2000, horas: 0.5 },
    "Secarropas a calor": { potencia: 950, horas: 1 },
    "Secarropas centrífugo": { potencia: 380, horas: 1 },
    "Televisor color de tubo fluorescente de 21\"": { potencia: 75, horas: 4 },
    "Televisor color de tubo fluorescente de 25\"": { potencia: 155, horas: 4 },
    "Televisor color de tubo fluorescente de 29\" a 34\"": { potencia: 175, horas: 4 },
    "Televisor LED de 40\"": { potencia: 180, horas: 4 },
    "Televisor LED 24\"": { potencia: 40, horas: 4 },
    "Televisor LED 32\" a 50''": { potencia: 90, horas: 4 },
    "Termotanque eléctrico c/termostato": { potencia: 1500, horas: 2 },
    "Tostadora": { potencia: 950, horas: 0.5 },
    "Tubo fluorescente de 18 W": { potencia: 18, horas: 4 },
    "Tubo fluorescente de 36 W": { potencia: 36, horas: 4 },
    "Tubo fluorescente de 58 W": { potencia: 58, horas: 4 },
    "Ventilador de techo": { potencia: 60, horas: 4 },
    "Ventilador de pie": { potencia: 90, horas: 4 },
    "Vitroconvector 54 x 57 cm c/termostato": { potencia: 1000, horas: 2 },
    "Vitroconvector 86 x 58 cm c/termostato": { potencia: 2000, horas: 2 }
};

let autoHSP = null;

function inicializarElectrodomesticos() {
    const ubicacionSelect = document.getElementById('ubicacion');
    ubicacionSelect.addEventListener('change', function() {
        if (this.value === 'auto') {
            obtenerHSPAutomatico();
        } else {
            autoHSP = null;
            CONFIG.hsp = parseFloat(this.value);
        }
    });
    CONFIG.hsp = parseFloat(ubicacionSelect.value);
}

async function obtenerHSPAutomatico() {
    if (!navigator.geolocation) {
        mostrarAlerta('error', 'Tu navegador no soporta geolocalización');
        return;
    }
    
    mostrarLoading(true);
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const hsp = await fetchHSPFromAPI(position.coords.latitude, position.coords.longitude);
        autoHSP = hsp;
        CONFIG.hsp = hsp;
        mostrarAlerta('success', `HSP detectado: ${hsp.toFixed(2)}`);
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('error', 'Error obteniendo datos solares: ' + error.message);
        document.getElementById('ubicacion').value = '4.5';
        CONFIG.hsp = 4.5;
    } finally {
        mostrarLoading(false);
    }
}

async function fetchHSPFromAPI(lat, lon) {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    
    const params = new URLSearchParams({
        parameters: 'ALLSKY_SFC_SW_DWN',
        community: 'RE',
        longitude: lon,
        latitude: lat,
        start: startDate.toISOString().split('T')[0].replace(/-/g, ''),
        end: currentDate.toISOString().split('T')[0].replace(/-/g, ''),
        format: 'JSON'
    });

    const response = await fetch(`https://power.larc.nasa.gov/api/temporal/daily/point?${params}`);
    
    if (!response.ok) throw new Error('Error en la API');
    
    const data = await response.json();
    const dailyData = data.properties.parameter.ALLSKY_SFC_SW_DWN;
    
    const values = Object.values(dailyData).map(v => v !== null ? v : 0);
    if (values.length === 0) throw new Error('Sin datos para esta ubicación');
    
    const promedioAnual = values.reduce((a, b) => a + b, 0) / values.length;
    return promedioAnual / 1000; // Convertir de Wh/m²/día a kWh/m²/día
}

function mostrarLoading(show) {
    const loader = document.getElementById('loading-overlay');
    if (show) {
        if (!loader) {
            const div = document.createElement('div');
            div.id = 'loading-overlay';
            div.className = 'loading-overlay';
            div.innerHTML = `
                <div class="loading-message">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/>
                        <path d="M20 12a8 8 0 0 1-8 8A8 8 0 0 1 12 4V0A12 12 0 0 0 0 12A12 12 0 0 0 12 24A12 12 0 0 0 24 12Z">
                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                        </path>
                    </svg>
                    Calculando HSP según tu ubicación...
                </div>
            `;
            document.body.appendChild(div);
        }
    } else if (loader) {
        loader.remove();
    }
}

function mostrarAlerta(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert-message alert-${type}`;
    alert.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            ${type === 'success' ? 
                '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>' :
                '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'}
        </svg>
        ${message}
    `;
    
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
}

function agregarElectro() {
    const nuevoElectro = document.createElement('div');
    nuevoElectro.className = 'appliance-card';
    nuevoElectro.innerHTML = `
        <select class="input-field" aria-label="Seleccionar electrodoméstico" onchange="actualizarHorasPredeterminadas(this)">
            <option value="">Seleccionar dispositivo</option>
            ${Object.entries(electroData).map(([key, val]) => `
                <option value="${key}">${key} (${val.potencia}W)</option>
            `).join('')}
        </select>
        <input type="number" class="input-field horas" placeholder="Horas/día" min="0">
        <input type="number" class="input-field cantidad" placeholder="Cantidad" min="1" value="1">
        <div class="error-message"></div>
    `;
    document.getElementById('listaElectro').appendChild(nuevoElectro);
}

function actualizarHorasPredeterminadas(select) {
    const card = select.closest('.appliance-card');
    const horasInput = card.querySelector('.horas');
    const electro = electroData[select.value];
    
    if(electro) {
        horasInput.value = electro.horas;
    }
}

function filtrarElectrodomesticos(termino) {
    const select = document.querySelector('.appliance-card:last-child select');
    if (!select) return;

    const options = Array.from(select.options);
    options.forEach(option => {
        const texto = option.textContent.toLowerCase();
        option.style.display = texto.includes(termino.toLowerCase()) ? 'block' : 'none';
    });
}

function validarCampos() {
    let valido = true;
    document.querySelectorAll('.error-message').forEach(e => e.style.display = 'none');
    document.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));

    const metodo = document.getElementById('metodocalculo').value;
    
    if(metodo === 'factura') {
        const consumo = document.getElementById('consumoMensual');
        if(!consumo.value || isNaN(consumo.value) || consumo.value <= 0) {
            mostrarError(consumo, 'Ingrese un consumo mensual válido (mayor que 0)');
            valido = false;
        }
    } else {
        const electrodomesticos = document.querySelectorAll('.appliance-card');
        if(electrodomesticos.length === 0) {
            mostrarError(document.getElementById('electrodomesticosSection'), 'Agregue al menos un electrodoméstico');
            valido = false;
        }

        electrodomesticos.forEach((card, index) => {
            const select = card.querySelector('select');
            const horas = card.querySelector('.horas');
            const cantidad = card.querySelector('.cantidad');
            
            if(!select.value) {
                mostrarError(select, `Seleccione un electrodoméstico en el dispositivo #${index + 1}`);
                valido = false;
            }
            if(!horas.value || horas.value <= 0) {
                mostrarError(horas, `Ingrese horas válidas (mayor que 0) para el dispositivo #${index + 1}`);
                valido = false;
            }
            if(!cantidad.value || cantidad.value <= 0) {
                mostrarError(cantidad, `Ingrese cantidad válida (mayor que 0) para el dispositivo #${index + 1}`);
                valido = false;
            }
        });
    }

    return valido;
}

function mostrarError(elemento, mensaje) {
    elemento.classList.add('input-error');
    const errorDiv = elemento.closest('.appliance-card') 
        ? elemento.closest('.appliance-card').querySelector('.error-message')
        : elemento.nextElementSibling;
    
    if(errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
    }
}

function calcularSistema() {
    if(!validarCampos()) return;

    let hsp;
    const ubicacionSelect = document.getElementById('ubicacion');
    
    if(ubicacionSelect.value === 'auto') {
        if(!autoHSP) {
            mostrarAlerta('error', 'Primero detecta tu ubicación usando la opción automática');
            return;
        }
        hsp = autoHSP;
    } else {
        hsp = parseFloat(ubicacionSelect.value);
    }

    if(hsp <= 0) {
        mostrarAlerta('error', 'El valor de HSP no puede ser negativo o cero');
        return;
    }

    let consumoDiarioWh = 0;
    const metodo = document.getElementById('metodocalculo').value;
    
    if(metodo === 'factura') {
        const consumoMensualKwh = parseFloat(document.getElementById('consumoMensual').value);
        if(consumoMensualKwh <= 0) {
            mostrarAlerta('error', 'El consumo mensual debe ser mayor que 0');
            return;
        }
        consumoDiarioWh = (consumoMensualKwh * 1000) / 30;
    } else {
        let consumoTotal = 0;
        document.querySelectorAll('.appliance-card').forEach(card => {
            const tipo = card.querySelector('select').value;
            const horas = parseFloat(card.querySelector('.horas').value);
            const cantidad = parseFloat(card.querySelector('.cantidad').value);
            
            if(horas <= 0 || cantidad <= 0) {
                mostrarAlerta('error', 'Horas y cantidad deben ser mayores que 0');
                return;
            }
            
            consumoTotal += electroData[tipo].potencia * horas * cantidad;
        });
        consumoDiarioWh = consumoTotal;
    }

    if(consumoDiarioWh <= 0) {
        mostrarAlerta('error', 'El consumo diario no puede ser negativo o cero');
        return;
    }

    consumoDiarioWh *= 1.2; // Margen de seguridad 20%

    const paneles = Math.max(0, Math.ceil(consumoDiarioWh / (CONFIG.potenciaPanel * hsp * CONFIG.eficiencia)));
    
    const baterias = Math.max(0, Math.ceil(
        (consumoDiarioWh * CONFIG.diasAutonomia) / 
        (CONFIG.voltajeBaterias * CONFIG.profundidadDescarga)
    ));
    
    const inversor = Math.max(0, Math.ceil(consumoDiarioWh / hsp / 0.8));

    document.getElementById('panelesResultado').textContent = `${paneles} x ${CONFIG.potenciaPanel}W`;
    document.getElementById('bateriasResultado').textContent = `${baterias}Ah (${CONFIG.voltajeBaterias}V)`;
    document.getElementById('inversorResultado').textContent = `${inversor}W`;
}