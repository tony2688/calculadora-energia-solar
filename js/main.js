document.addEventListener('DOMContentLoaded', () => {
    // Manejo del cambio entre métodos de cálculo
    document.getElementById('metodocalculo').addEventListener('change', function () {
        const isFactura = this.value === 'factura';
        // Alternar la visibilidad de las secciones según el método seleccionado
        document.getElementById('facturaSection').classList.toggle('hidden', !isFactura);
        document.getElementById('electrodomesticosSection').classList.toggle('hidden', isFactura);
        // Reiniciar valores según el método elegido
        if (isFactura) {
            document.getElementById('listaElectro').innerHTML = '';
        } else {
            document.getElementById('consumoMensual').value = '';
        }
    });
    
    agregarElectro(); // Agregar un electrodoméstico por defecto al cargar la página
});

// Configuración de valores predeterminados para el sistema
const CONFIG = {
    eficiencia: 0.85, // Eficiencia del sistema solar
    voltajeBaterias: 24, // Voltaje del banco de baterías
    profundidadDescarga: 0.5, // Nivel máximo de descarga permitido en baterías
    diasAutonomia: 2, // Número de días de autonomía del sistema
    potenciaPanel: 400, // Potencia de cada panel solar en Watts
    hsp: 5.5 // Horas solares pico estándar
};

// Lista de electrodomésticos con su consumo de potencia (W) y horas de uso diarias
const electroData = {
    "Afeitadora": { potencia: 5, horas: 0.5 },
    "Aire acondicionado de 2200 frigorías F/C": { potencia: 1350, horas: 8 },
    "Heladera": { potencia: 150, horas: 24 },
    "Microondas": { potencia: 800, horas: 0.5 },
    "Plancha": { potencia: 1500, horas: 0.5 },
    "Televisor LED 40\"": { potencia: 180, horas: 4 },
};

let autoHSP = null; // Variable para almacenar las horas solares pico si se detecta automáticamente

// Función para agregar un nuevo electrodoméstico a la lista de cálculo
function agregarElectro() {
    const nuevoElectro = document.createElement('div');
    nuevoElectro.className = 'appliance-card';
    nuevoElectro.innerHTML = `
        <select class="input-field" onchange="actualizarHorasPredeterminadas(this)">
            <option value="">Seleccionar dispositivo</option>
            ${Object.entries(electroData).map(([key, val]) => `
                <option value="${key}">${key} (${val.potencia}W)</option>
            `).join('')}
        </select>
        <input type="number" class="input-field" placeholder="Horas" min="0">
        <input type="number" class="input-field" placeholder="Cantidad" min="1" value="1">
        <button class="delete-btn" onclick="eliminarElectro(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </button>
        <div class="error-message"></div>
    `;
    document.getElementById('listaElectro').appendChild(nuevoElectro);
}

// Función para eliminar un electrodoméstico de la lista
function eliminarElectro(boton) {
    const cards = document.querySelectorAll('.appliance-card');
    if (cards.length > 1) {
        boton.closest('.appliance-card').remove();
    } else {
        mostrarAlerta('error', 'Debe haber al menos un electrodoméstico');
    }
}

// Función para restablecer los valores del formulario
function limpiarCampos() {
    document.getElementById('consumoMensual').value = '';
    document.getElementById('ubicacion').value = '5.5';
    document.getElementById('metodocalculo').value = 'factura';
    document.getElementById('listaElectro').innerHTML = '';
    agregarElectro(); // Agregar un electrodoméstico inicial
    document.querySelectorAll('.result-value').forEach(e => e.textContent = '-');
    document.getElementById('facturaSection').classList.remove('hidden');
    document.getElementById('electrodomesticosSection').classList.add('hidden');
    mostrarAlerta('success', 'Campos restablecidos');
}

// Función para actualizar las horas predeterminadas según el electrodoméstico seleccionado
function actualizarHorasPredeterminadas(select) {
    const card = select.closest('.appliance-card');
    const horasInput = card.querySelector('input[placeholder="Horas"]');
    const electro = electroData[select.value];
    if (electro) horasInput.value = electro.horas;
}

// Función para mostrar alertas visuales en la interfaz
function mostrarAlerta(tipo, mensaje) {
    const alerta = document.createElement('div');
    alerta.className = `alert-message alert-${tipo}`;
    alerta.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            ${tipo === 'success' ? 
                '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>' :
                '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'}
        </svg>
        ${mensaje}
    `;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 5000);
}
