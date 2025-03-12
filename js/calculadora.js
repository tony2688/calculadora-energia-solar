/*!
* UV Energía Solar - Calculadora
* Archivo específico para la funcionalidad de la calculadora solar
*/

// Inicializar la calculadora cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initCalculadora();
});

// Función principal de inicialización
function initCalculadora() {
    // Referencias a elementos del DOM
    const metodocalculo = document.getElementById('metodocalculo');
    const electrodomesticosSection = document.getElementById('electrodomesticosSection');
    const facturaSection = document.getElementById('facturaSection');
    const listaElectro = document.getElementById('listaElectro');
    const resultados = document.getElementById('resultados');
    const calcularBtn = document.getElementById('calcularBtn');
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    const whatsappButton = document.getElementById('whatsappButton');
    
    // Verificar si los elementos existen
    if (!metodocalculo) {
        console.log('Calculadora no encontrada en esta página');
        return;
    }
    
    console.log('Inicializando calculadora solar');
    
    // Categorías de electrodomésticos con sus variantes
    const categoriasElectrodomesticos = {
        "Refrigeración": [
            { nombre: "Refrigerador pequeño (150-200L)", potencia: 200 },
            { nombre: "Refrigerador mediano (250-350L)", potencia: 350 },
            { nombre: "Refrigerador grande (>400L)", potencia: 500 },
            { nombre: "Congelador horizontal", potencia: 400 },
            { nombre: "Congelador vertical", potencia: 450 }
        ],
        "Climatización": [
            { nombre: "Aire acondicionado 9000 BTU", potencia: 900 },
            { nombre: "Aire acondicionado 12000 BTU", potencia: 1200 },
            { nombre: "Aire acondicionado 18000 BTU", potencia: 1800 },
            { nombre: "Aire acondicionado 24000 BTU", potencia: 2400 },
            { nombre: "Ventilador de techo", potencia: 70 },
            { nombre: "Ventilador de pie", potencia: 50 },
            { nombre: "Calefactor eléctrico pequeño", potencia: 1000 },
            { nombre: "Calefactor eléctrico grande", potencia: 2000 }
        ],
        "Cocina": [
            { nombre: "Microondas", potencia: 1200 },
            { nombre: "Horno eléctrico", potencia: 2000 },
            { nombre: "Tostadora", potencia: 800 },
            { nombre: "Cafetera", potencia: 900 },
            { nombre: "Licuadora", potencia: 400 },
            { nombre: "Batidora", potencia: 300 },
            { nombre: "Procesador de alimentos", potencia: 500 },
            { nombre: "Hervidor eléctrico", potencia: 1500 }
        ],
        "Lavado": [
            { nombre: "Lavadora carga frontal", potencia: 500 },
            { nombre: "Lavadora carga superior", potencia: 450 },
            { nombre: "Secadora de ropa", potencia: 2500 },
            { nombre: "Lavavajillas", potencia: 1500 }
        ],
        "Entretenimiento": [
            { nombre: "TV LED 32\"", potencia: 50 },
            { nombre: "TV LED 42-50\"", potencia: 100 },
            { nombre: "TV LED >55\"", potencia: 150 },
            { nombre: "Consola de videojuegos", potencia: 150 },
            { nombre: "Equipo de sonido", potencia: 200 },
            { nombre: "Reproductor DVD/Blu-ray", potencia: 40 }
        ],
        "Informática": [
            { nombre: "Computadora de escritorio", potencia: 200 },
            { nombre: "Monitor", potencia: 30 },
            { nombre: "Laptop", potencia: 60 },
            { nombre: "Impresora", potencia: 30 },
            { nombre: "Router WiFi", potencia: 10 },
            { nombre: "Cargador de celular", potencia: 5 }
        ],
        "Iluminación": [
            { nombre: "Bombilla LED", potencia: 10 },
            { nombre: "Bombilla fluorescente", potencia: 20 },
            { nombre: "Lámpara de escritorio", potencia: 15 },
            { nombre: "Tira de luces LED", potencia: 25 }
        ],
        "Otros": [
            { nombre: "Aspiradora", potencia: 1000 },
            { nombre: "Plancha", potencia: 1200 },
            { nombre: "Secador de pelo", potencia: 1800 },
            { nombre: "Bomba de agua", potencia: 750 }
        ]
    };
    
    // Cambiar entre métodos de cálculo
    if (metodocalculo) {
        metodocalculo.addEventListener('change', function() {
            if (this.value === 'electrodomesticos') {
                electrodomesticosSection.classList.remove('hidden');
                facturaSection.classList.add('hidden');
            } else {
                electrodomesticosSection.classList.add('hidden');
                facturaSection.classList.remove('hidden');
            }
        });
    }
    
    // Cargar categorías en el selector
    const categoriasSelect = document.getElementById('categoriasSelect');
    if (categoriasSelect) {
        for (const categoria in categoriasElectrodomesticos) {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categoriasSelect.appendChild(option);
        }
        
        // Actualizar electrodomésticos cuando cambia la categoría
        categoriasSelect.addEventListener('change', function() {
            const electroSelect = document.getElementById('electroSelect');
            electroSelect.innerHTML = '<option value="">-- Seleccionar --</option>';
            
            if (this.value) {
                const electrodomesticos = categoriasElectrodomesticos[this.value];
                electrodomesticos.forEach(electro => {
                    const option = document.createElement('option');
                    option.value = electro.potencia;
                    option.textContent = `${electro.nombre} (${electro.potencia}W)`;
                    electroSelect.appendChild(option);
                });
                
                // Añadir opción personalizada
                const customOption = document.createElement('option');
                customOption.value = 'custom';
                customOption.textContent = 'Otro (especificar)';
                electroSelect.appendChild(customOption);
            }
        });
    }
    
    // Agregar listeners a los botones
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularSistema);
    }
    
    if (reiniciarBtn) {
        reiniciarBtn.addEventListener('click', limpiarFormulario);
    }
}

// Mostrar/ocultar campo de potencia personalizada
window.actualizarPotencia = function() {
    const electroSelect = document.getElementById('electroSelect');
    const potenciaCustom = document.getElementById('potenciaCustom');
    
    if (electroSelect.value === 'custom') {
        potenciaCustom.style.display = 'block';
    } else {
        potenciaCustom.style.display = 'none';
    }
};

// Agregar electrodoméstico a la lista
window.agregarElectro = function() {
    // Obtener valores seleccionados
    const electroSelect = document.getElementById('electroSelect');
    const potenciaInput = document.getElementById('potenciaInput');
    const horasUsoInput = document.getElementById('horasUsoInput');
    const listaElectro = document.getElementById('listaElectro');
    
    if (!electroSelect.value) {
        mostrarMensajeError('Por favor, selecciona un electrodoméstico');
        return;
    }
    
    // Usar el valor seleccionado por el usuario
    const nombreElectro = electroSelect.options[electroSelect.selectedIndex].text.split(' (')[0];
    const potencia = electroSelect.value === 'custom' ? potenciaInput.value : electroSelect.value;
    const horasUso = horasUsoInput.value || 5; // Valor por defecto: 5 horas
    
    if (electroSelect.value === 'custom' && (!potenciaInput.value || isNaN(potenciaInput.value))) {
        mostrarMensajeError('Por favor, ingresa una potencia válida');
        return;
    }
    
    // Crear una nueva fila en la tabla
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${nombreElectro}</td>
        <td>${potencia}</td>
        <td>${horasUso}</td>
        <td style="text-align: center;">
            <button type="button" class="remove-appliance" onclick="eliminarElectro(this)">
                <span style="color: #dc3545;">×</span>
            </button>
        </td>
    `;
    
    // Guardar datos para cálculos
    tr.dataset.potencia = potencia;
    tr.dataset.horas = horasUso;
    
    listaElectro.appendChild(tr);
    
    // Resetear los campos
    electroSelect.value = '';
    potenciaInput.value = '';
    horasUsoInput.value = '5';
    const potenciaCustom = document.getElementById('potenciaCustom');
    if (potenciaCustom) potenciaCustom.style.display = 'none';
};

// Eliminar electrodoméstico de la lista
window.eliminarElectro = function(button) {
    const item = button.closest('tr');
    if (item) {
        item.remove();
    }
};

// Calcular sistema solar
window.calcularSistema = function() {
    let consumoDiario = 0;
    
    // Obtener referencias a elementos importantes
    const metodocalculo = document.getElementById('metodocalculo');
    const resultados = document.getElementById('resultados');
    const whatsappButton = document.getElementById('whatsappButton');
    
    if (metodocalculo.value === 'electrodomesticos') {
        // Calcular consumo basado en electrodomésticos
        const electroItems = document.querySelectorAll('#listaElectro tr');
        
        if (electroItems.length === 0) {
            mostrarMensajeError('Por favor, agrega al menos un electrodoméstico');
            return;
        }
        
        electroItems.forEach(item => {
            // Extraer valores directamente de las celdas de la tabla
            const potencia = parseInt(item.cells[1].textContent);
            const horas = parseFloat(item.cells[2].textContent);
            
            if (!isNaN(potencia) && !isNaN(horas)) {
                consumoDiario += (potencia * horas) / 1000; // Convertir a kWh
            }
        });
    } else {
        // Calcular consumo basado en factura
        const consumoMensual = parseFloat(document.getElementById('consumoMensual').value);
        
        if (!consumoMensual || isNaN(consumoMensual)) {
            mostrarMensajeError('Por favor, ingresa un consumo mensual válido');
            return;
        }
        
        consumoDiario = consumoMensual / 30; // Convertir mensual a diario
    }
    
    // Obtener ubicación y factor de radiación solar
    const ubicacion = document.getElementById('ubicacion').value;
    let factorRadiacion = 4.5; // Valor promedio para Argentina
    
    switch (ubicacion) {
        case 'norte':
            factorRadiacion = 5.5;
            break;
        case 'centro':
            factorRadiacion = 4.5;
            break;
        case 'sur':
            factorRadiacion = 3.5;
            break;
    }
    
    // Cálculos del sistema solar
    const potenciaSistema = consumoDiario / factorRadiacion * 1.3; // Factor de seguridad 1.3
    const numeroPaneles = Math.ceil(potenciaSistema / 0.4); // Paneles de 400W
    const capacidadBaterias = consumoDiario * 2 * 1000 / 24; // 2 días de autonomía, convertir a Ah a 24V
    const potenciaInversor = Math.max(2, Math.ceil(potenciaSistema * 1.2)); // Mínimo 2kW, factor de seguridad 1.2
    
    // Verificar que los elementos de resultados existen
    const panelesResultado = document.getElementById('panelesResultado');
    const bateriasResultado = document.getElementById('bateriasResultado');
    const inversorResultado = document.getElementById('inversorResultado');
    
    // Mostrar resultados si los elementos existen
    if (panelesResultado) panelesResultado.textContent = `${numeroPaneles} paneles de 400W`;
    if (bateriasResultado) bateriasResultado.textContent = `${Math.ceil(capacidadBaterias)} Ah a 24V`;
    if (inversorResultado) inversorResultado.textContent = `${potenciaInversor}kW`;
    
    // Mostrar resultados con animación
    if (resultados) {
        resultados.classList.remove('hidden');
        resultados.classList.add('fade-in');
        console.log('Mostrando resultados');
    }
    
    if (whatsappButton) {
        whatsappButton.classList.remove('hidden');
        whatsappButton.classList.add('fade-in');
        console.log('Mostrando botón de WhatsApp');
        
        // Configurar enlace de WhatsApp
        const mensaje = `Hola, estoy interesado en un sistema solar con ${numeroPaneles} paneles, ${Math.ceil(capacidadBaterias)} Ah de baterías y un inversor de ${potenciaInversor}kW. ¿Podrían darme más información?`;
        whatsappButton.href = `https://wa.me/543865586322?text=${encodeURIComponent(mensaje)}`;
    }
    
    // Desplazar a los resultados con animación suave
    if (resultados) {
        resultados.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Registrar en consola para depuración
    console.log('Cálculo completado:', {
        consumoDiario,
        factorRadiacion,
        potenciaSistema,
        numeroPaneles,
        capacidadBaterias,
        potenciaInversor
    });
};

// Función para limpiar el formulario
window.limpiarFormulario = function() {
    // Restablecer campos
    const metodocalculo = document.getElementById('metodocalculo');
    const consumoMensual = document.getElementById('consumoMensual');
    const ubicacion = document.getElementById('ubicacion');
    const listaElectro = document.getElementById('listaElectro');
    const resultados = document.getElementById('resultados');
    const whatsappButton = document.getElementById('whatsappButton');
    const mensajeError = document.getElementById('mensajeError');
    
    if (metodocalculo) metodocalculo.value = 'factura';
    if (consumoMensual) consumoMensual.value = '';
    if (ubicacion) ubicacion.value = 'centro';
    
    // Limpiar lista de electrodomésticos
    if (listaElectro) {
        listaElectro.innerHTML = '';
    }
    
    // Ocultar resultados
    if (resultados) {
        resultados.classList.add('hidden');
    }
    
    // Ocultar botón de WhatsApp
    if (whatsappButton) {
        whatsappButton.classList.add('hidden');
    }
    
    // Ocultar mensaje de error
    if (mensajeError) {
        mensajeError.classList.add('hidden');
    }
    
    // Mostrar contenedor de consumo mensual y ocultar electrodomésticos
    const electrodomesticosSection = document.getElementById('electrodomesticosSection');
    const facturaSection = document.getElementById('facturaSection');
    
    if (facturaSection) facturaSection.classList.remove('hidden');
    if (electrodomesticosSection) electrodomesticosSection.classList.add('hidden');
    
    console.log('Formulario limpiado');
};

// Función para mostrar mensajes de error
function mostrarMensajeError(mensaje) {
    // Buscar o crear el elemento de mensaje de error
    let mensajeError = document.getElementById('mensajeError');
    
    if (!mensajeError) {
        mensajeError = document.createElement('div');
        mensajeError.id = 'mensajeError';
        mensajeError.className = 'error-message';
        
        // Insertar antes de los resultados
        const resultados = document.getElementById('resultados');
        if (resultados && resultados.parentNode) {
            resultados.parentNode.insertBefore(mensajeError, resultados);
        } else {
            // Si no hay resultados, insertar al final de la calculadora
            const calculadora = document.querySelector('.calculator-section');
            if (calculadora) {
                calculadora.appendChild(mensajeError);
            }
        }
    }
    
    // Mostrar el mensaje con animación
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove('hidden');
    mensajeError.classList.add('fade-in');
    
    // Desplazar al mensaje
    mensajeError.scrollIntoView({ behavior: 'smooth' });
    
    // Registrar en consola para depuración
    console.log('Error mostrado:', mensaje);
}

// Exportar funciones para uso global
window.mostrarMensajeError = mostrarMensajeError;