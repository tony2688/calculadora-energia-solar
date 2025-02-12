document.addEventListener('DOMContentLoaded', () => {
    // Cambio entre métodos de cálculo
    document.getElementById('metodocalculo').addEventListener('change', function () {
      const isFactura = this.value === 'factura';
      document.getElementById('facturaSection').classList.toggle('hidden', !isFactura);
      document.getElementById('electrodomesticosSection').classList.toggle('hidden', isFactura);
      if (isFactura) {
        document.getElementById('listaElectro').innerHTML = '';
      } else {
        document.getElementById('consumoMensual').value = '';
      }
    });
  
    // Agregar un electrodoméstico por defecto
    agregarElectro();
  
    // Detectar ubicación automáticamente si se selecciona la opción "auto"
    document.getElementById('ubicacion').addEventListener('change', function () {
      if (this.value === 'auto') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              // Aquí podrías calcular el HSP según la latitud/longitud.
              // Por simplicidad, asignamos un valor fijo (puedes ajustarlo).
              autoHSP = 5.0;
              mostrarAlerta('success', 'Ubicación detectada correctamente');
            },
            function (error) {
              mostrarAlerta('error', 'No se pudo detectar la ubicación');
            }
          );
        } else {
          mostrarAlerta('error', 'La geolocalización no es soportada en este navegador');
        }
      }
    });
  });
  
  const CONFIG = {
    eficiencia: 0.85,
    voltajeBaterias: 24,
    profundidadDescarga: 0.5,
    diasAutonomia: 2,
    potenciaPanel: 400,
    hsp: 5.5,
  };
  
  // Lista extendida de electrodomésticos con sus características
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
  
  function agregarElectro() {
    const nuevoElectro = document.createElement('div');
    nuevoElectro.className = 'appliance-card';
    nuevoElectro.innerHTML = `
      <select class="input-field" onchange="actualizarHorasPredeterminadas(this)">
        <option value="">Seleccionar dispositivo</option>
        ${Object.entries(electroData)
          .map(
            ([key, val]) => `
          <option value="${key}">${key} (${val.potencia}W)</option>
        `
          )
          .join('')}
      </select>
      <input type="number" class="input-field" placeholder="Horas" min="0">
      <input type="number" class="input-field" placeholder="Cantidad" min="1">
      <button class="delete-btn" onclick="eliminarElectro(this)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <div class="error-message"></div>
    `;
    document.getElementById('listaElectro').appendChild(nuevoElectro);
  }
  
  function eliminarElectro(boton) {
    const cards = document.querySelectorAll('.appliance-card');
    if (cards.length > 1) {
      boton.closest('.appliance-card').remove();
    } else {
      mostrarAlerta('error', 'Debe haber al menos un electrodoméstico');
    }
  }
  
  function limpiarCampos() {
    document.getElementById('consumoMensual').value = '';
    document.getElementById('ubicacion').value = '5.5';
    document.getElementById('metodocalculo').value = 'factura';
    document.getElementById('listaElectro').innerHTML = '';
    agregarElectro();
    document.querySelectorAll('.result-value').forEach((e) => (e.textContent = '-'));
    document.getElementById('whatsappButton').classList.add('hidden');
    document.getElementById('metodocalculo').dispatchEvent(new Event('change'));
    mostrarAlerta('success', 'Campos restablecidos');
  }
  
  function actualizarHorasPredeterminadas(select) {
    const card = select.closest('.appliance-card');
    const horasInput = card.querySelector('input[placeholder="Horas"]');
    const electro = electroData[select.value];
    if (electro) {
      horasInput.value = electro.horas;
    }
  }
  
  function filtrarElectrodomesticos(termino) {
    document.querySelectorAll('.appliance-card select').forEach((select) => {
      Array.from(select.options).forEach((option) => {
        // Mantener visible la opción por defecto
        if (option.value === "") {
          option.style.display = "block";
        } else {
          option.style.display = option.textContent.toLowerCase().includes(termino.toLowerCase()) ? 'block' : 'none';
        }
      });
    });
  }
  
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
  
  function calcularSistema() {
    let hsp;
    const ubicacionSelect = document.getElementById('ubicacion');
  
    if (ubicacionSelect.value === 'auto') {
      if (!autoHSP) {
        mostrarAlerta('error', 'Primero detecta tu ubicación usando la opción automática');
        return;
      }
      hsp = autoHSP;
    } else {
      hsp = parseFloat(ubicacionSelect.value);
    }
  
    let consumoDiarioWh = 0;
    const metodo = document.getElementById('metodocalculo').value;
  
    if (metodo === 'factura') {
      const consumoMensualKwh = parseFloat(document.getElementById('consumoMensual').value);
      if (isNaN(consumoMensualKwh)) {
        mostrarAlerta('error', 'Ingresa un consumo mensual válido');
        return;
      }
      consumoDiarioWh = (consumoMensualKwh * 1000) / 30;
    } else {
      let consumoTotal = 0;
      document.querySelectorAll('.appliance-card').forEach((card) => {
        const tipo = card.querySelector('select').value;
        const horas = parseFloat(card.querySelector('input[placeholder="Horas"]').value);
        const cantidad = parseFloat(card.querySelector('input[placeholder="Cantidad"]').value);
        if (tipo && !isNaN(horas) && !isNaN(cantidad)) {
          consumoTotal += electroData[tipo].potencia * horas * cantidad;
        }
      });
      consumoDiarioWh = consumoTotal;
    }
  
    // Ajuste del 20% para imprevistos
    consumoDiarioWh *= 1.2;
  
    const paneles = Math.ceil(consumoDiarioWh / (CONFIG.potenciaPanel * hsp * CONFIG.eficiencia));
    const baterias = Math.ceil((consumoDiarioWh * CONFIG.diasAutonomia) / (CONFIG.voltajeBaterias * CONFIG.profundidadDescarga));
    const inversor = Math.ceil(consumoDiarioWh / hsp / 0.8);
  
    document.getElementById('panelesResultado').textContent = `${paneles} x ${CONFIG.potenciaPanel}W`;
    document.getElementById('bateriasResultado').textContent = `${baterias}Ah (${CONFIG.voltajeBaterias}V - ${CONFIG.diasAutonomia} días autonomía)`;
    document.getElementById('inversorResultado').textContent = `${inversor}W`;
  
    // Configurar y mostrar botón de WhatsApp
    const whatsappButton = document.getElementById('whatsappButton');
    const mensaje = `¡Hola! Necesito asesoría para un sistema de:
  - ${paneles} paneles de ${CONFIG.potenciaPanel}W
  - Baterías de ${baterias}Ah
  - Inversor de ${inversor}W`;
    whatsappButton.href = `https://wa.me/5491112345678?text=${encodeURIComponent(mensaje)}`;
    whatsappButton.classList.remove('hidden');
  }
  