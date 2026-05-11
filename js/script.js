/* ==================== DATOS EMBEDIDOS (sin fetch) ==================== */
const JSON_DATA = {
  destinatarios: [
    { "nombre": "BUNGE ARGENTINA S.A.", "cuit": "30700869918", "direccion": "RUTA NACIONAL 98 KM 229", "localidad": "BANDERA", "ruca": "403629", "provincia": "SANTIAGO DEL ESTERO" },
    { "nombre": "BUNGE ARGENTINA S.A.", "cuit": "30700869918", "direccion": "EVA PERON Y RUTA 11", "localidad": "PTO GRAL SAN MARTIN", "ruca": "23820", "provincia": "SANTA FE" },
    { "nombre": "CARGILL SACI", "cuit": "30506792165", "direccion": "IRIGOYEN Y BAJ QUEBRACHO", "localidad": "PTO GRAL SAN MARTIN", "ruca": "25594", "provincia": "SANTA FE" },
    { "nombre": "CARGILL SACI", "cuit": "30506792165", "direccion": "AV ROMULO MONTAGNI Y C. DEL PARANA", "localidad": "ALVEAR", "ruca": "22976", "provincia": "SANTA FE" },
    { "nombre": "CARGILL SACI", "cuit": "30506792165", "direccion": "RUTA 21 KM 4", "localidad": "BANDERA", "ruca": "20973", "provincia": "SANTIAGO DEL ESTERO" },
    { "nombre": "COFCO INTERNATIONAL ARGENTINA SA", "cuit": "33506737449", "direccion": "ROCA Y CUBA", "localidad": "PTO GRAL SAN MARTIN", "ruca": "512428", "provincia": "SANTA FE" },
    { "nombre": "COFCO INTERNATIONAL ARGENTINA SA", "cuit": "33506737449", "direccion": "AVDA BRIGADIER LOPEZ S/N", "localidad": "TIMBUES", "ruca": "408254", "provincia": "SANTA FE" },
    { "nombre": "COFCO INTERNATIONAL ARGENTINA SA", "cuit": "33506737449", "direccion": "RUTA NACIONAL 98 KM 212", "localidad": "GUARDIA ESCOLTA", "ruca": "400543", "provincia": "SANTIAGO DEL ESTERO" },
    { "nombre": "LDC ARGENTINA SA", "cuit": "30526712729", "direccion": "RUTA 21 KM 278", "localidad": "GRAL LAGOS", "ruca": "21030", "provincia": "SANTA FE" },
    { "nombre": "LDC ARGENTINA SA", "cuit": "30526712729", "direccion": "Brigadier E. López 9508", "localidad": "TIMBUES JOSE MARIA", "ruca": "23981", "provincia": "SANTA FE" },
    { "nombre": "MOLINOS AGRO S.A.", "cuit": "30715118773", "direccion": "BINELLI 398", "localidad": "SAN LORENZO", "ruca": "408411", "provincia": "SANTA FE" },
    { "nombre": "RENOVA", "cuit": "30709590894", "direccion": "AV BRIGADIER LOPEZ 10500", "localidad": "TIMBUES", "ruca": "518477", "provincia": "SANTA FE" },
    { "nombre": "VICENTIN SA", "cuit": "30500959629", "direccion": "URIBURU 3364", "localidad": "ROSARIO", "ruca": "22387", "provincia": "SANTA FE" },
    { "nombre": "VICENTIN SA", "cuit": "30500959629", "direccion": "CALLE 11 Y SCAPIGLIATTI", "localidad": "SAN LORENZO", "ruca": "25567", "provincia": "SANTA FE" },
    { "nombre": "MOLINOS AGRO S.A.", "cuit": "30715118773", "direccion": "RUTA NAC 98 KM 224,5", "localidad": "BANDERA", "ruca": "", "provincia": "SANTIAGO DEL ESTERO" },
    { "nombre": "MOLINOS CABANELLAS Y CIA SACI", "cuit": "30500813896", "direccion": "3 DE FEBRERO 576", "localidad": "MACIEL", "ruca": "", "provincia": "SANTA FE" },
    { "nombre": "OLEAGINOSA MORENO", "cuit": "33502232229", "direccion": "", "localidad": "", "ruca": "", "provincia": "" },
    { "nombre": "BUNGE ARGENTINA S.A", "cuit": "30700869918", "direccion": "Ruta Nacional 1V09 km 336", "localidad": "SAN JERóNIMO SUD", "ruca": "21334", "provincia": "SANTA FE", "sufijo": "SJS" },
    { "nombre": "AGD SA", "cuit": "30502874353", "direccion": "J.J.Castelli esquina B. Estanislao Lopez", "localidad": "TIMBUES", "ruca": "523969", "provincia": "SANTA FE" },
    { "nombre": "AGD SA", "cuit": "30502874353", "direccion": "CAMINO PUBLICO (S/N)", "localidad": "TIMBUES", "ruca": "22819", "provincia": "SANTA FE" },
    { "nombre": "AGD SA", "cuit": "30502874353", "direccion": "AV PERON 1100", "localidad": "CERES", "ruca": "22819", "provincia": "SANTA FE" }
],
  
  "intervinientes": [
    { "nombre": "AGROQUIMICOS DEL NORTE SA", "cuit": "30708362235" },
    { "nombre": "AGROCORREDORA CEREALES SA", "cuit": "30708599014" },
    { "nombre": "AMAGGI ARGENTINA S.A.", "cuit": "30711615519" }
    { "nombre": "ENTREGAS SERDEN SRL", "cuit": "30707844759" },
    { "nombre": "ARGENTRADING SA", "cuit": "30711629048" },
    { "nombre": "INTAGRO SA", "cuit": "30663290262" },
    { "nombre": "ATANOR SCA", "cuit": "30500658912" },
    { "nombre": "ADAMA ARG SA", "cuit": "30686529289" },
    { "nombre": "MONSANTO ARGENTINA S.R.L", "cuit": "30503508725" },
    { "nombre": "MARTINO Y CIA S A", "cuit": "30556991835" }
  ]
};

let destinatariosDB = JSON_DATA.destinatarios;
let intervinientesDB = JSON_DATA.intervinientes;
let dbAll = [...destinatariosDB, ...intervinientesDB];

/* ==================== PANTALLA DE CARGA (CORREGIDA) ==================== */
(function() {
    const progressFill = document.getElementById('progress-fill');
    const porcentajeSpan = document.getElementById('porcentaje');
    const overlay = document.getElementById('loading-overlay');
    const app = document.getElementById('app-container');

    // Nuevo contenedor del camión (debe existir en el HTML actualizado)
    const truckOnBar = document.getElementById('truck-on-bar');
    if (!truckOnBar) {
        console.warn('No se encontró el contenedor #truck-on-bar');
        return;
    }

    // Asegurar que el wrapper de la barra sea relativo para posicionar el camión
    const barWrapper = truckOnBar.parentElement;
    if (barWrapper && getComputedStyle(barWrapper).position === 'static') {
        barWrapper.style.position = 'relative';
    }
    // El contenedor del camión debe ser absoluto para moverlo con left
    truckOnBar.style.position = 'absolute';
    truckOnBar.style.left = '0%';  // inicio

    let progress = 0;
    const interval = 20;
    const duration = 2500; // 2.5 segundos
    const step = 100 / (duration / interval);

    function updateTruck(pct) {
        // Limitar a 95% para que el camión no se salga del borde derecho
        const safe = Math.min(pct, 100);
        truckOnBar.style.left = safe + '%';
    }

    const timer = setInterval(() => {
        progress = Math.min(progress + step, 100);
        progressFill.style.width = progress + '%';
        porcentajeSpan.textContent = Math.floor(progress) + '%';
        updateTruck(progress);

        if (progress >= 100) {
            clearInterval(timer);
            overlay.style.opacity = '0';
            app.style.opacity = '1';
            setTimeout(() => { overlay.style.display = 'none'; }, 600);
        }
    }, interval);
})();

/* ==================== AUTOCOMPLETADO ==================== */
function initAllAutocompletes() {
    document.querySelectorAll('.autocomplete-input').forEach(input => {
        if (input.dataset.acInit) return;

        const esDestino = input.id === 'input-destino' || input.id === 'input-destino-entrega';
        let wrapper = input.closest('.autocomplete-wrapper') || input.parentNode;

        if (getComputedStyle(wrapper).position === 'static') {
            wrapper.style.position = 'relative';
        }

        setupAutocomplete(input, esDestino ? destinatariosDB : dbAll, esDestino, wrapper);
        input.dataset.acInit = '1';
    });
}
 
function setupAutocomplete(input, dataSource, esDestino, wrapper) {
    // PORTAL: la lista va al body para escapar de overflow/grid
    const list = document.createElement('ul');
    list.className = 'autocomplete-list';
    list.style.display = 'none';
    document.body.appendChild(list);
    let currentFocus = -1;
 
    function positionList() {
        const rect = input.getBoundingClientRect();
        list.style.position = 'fixed';
        list.style.top    = rect.bottom + 'px';
        list.style.left   = rect.left + 'px';
        list.style.width  = rect.width + 'px';
        list.style.zIndex = '999999';
    }
 
    function hideList() {
        list.innerHTML = '';
        list.style.display = 'none';
        currentFocus = -1;
        wrapper.classList.remove('active-dropdown');
    }
 
    function renderList(val) {
        list.innerHTML = '';
        currentFocus = -1;
        if (!val) { hideList(); return; }
 
let matches = dataSource.filter(item =>
            item.nombre.toUpperCase().startsWith(val.toUpperCase())
        );

        // Para intervinientes (no destino): deduplicar por nombre
        if (!esDestino) {
            const seen = new Set();
            matches = matches.filter(item => {
                if (seen.has(item.nombre.toUpperCase())) return false;
                seen.add(item.nombre.toUpperCase());
                return true;
            });
        }

        matches = matches.sort((a, b) => a.nombre.localeCompare(b.nombre)).slice(0, 20);
 
        if (matches.length === 0) { hideList(); return; }
 
        matches.forEach(item => {
            const li = document.createElement('li');
 
            if (esDestino) {
                let extra = '';
                if (item.localidad) {
                    extra = `<br><small>${item.localidad} – ${item.direccion || ''}</small>`;
                } else if (item.sufijo) {
                    extra = `<br><small>${item.sufijo} – ${item.direccion || ''}</small>`;
                }
                li.style.color = '#333';
                li.style.backgroundColor = '#fff';
                li.innerHTML = `<strong>${item.nombre}</strong>${extra}${item.ruca ? `<br><small>RUCA: ${item.ruca}</small>` : ''}`;
            } else {
                li.textContent = item.nombre;
                li.style.color = '#333';
                li.style.backgroundColor = '#fff';
            }
 
            li.addEventListener('mousedown', e => {
                e.preventDefault();
                selectItem(item);
            });
            list.appendChild(li);
        });
 
        positionList();
        list.style.display = 'block';
        wrapper.classList.add('active-dropdown');
 
        if (list.children.length > 0) {
            currentFocus = -1;
        }
    }
 
    function selectItem(item) {
        let textoVisible = item.nombre;
        if (esDestino) {
            if (item.sufijo) {
                textoVisible = `${item.nombre} (${item.sufijo})`;
            } else if (item.localidad) {
                textoVisible = `${item.nombre} (${item.localidad})`;
            }
        }
        input.value = textoVisible;
 
        const row = input.closest('.interviniente-row');
        if (row) {
            const cuitInput = row.querySelector('.cuit-input');
            if (cuitInput && item.cuit) {
                const digits = String(item.cuit).replace(/\D/g, '');
                let fmt = digits.substring(0,2) + (digits.length>2?'-'+digits.substring(2,10):'') + (digits.length>10?'-'+digits.substring(10,11):'');
                cuitInput.value = fmt;
            }
        }
 
        if (esDestino) {
            document.getElementById('input-ruca').value = item.ruca || '';
            document.getElementById('input-direccion').value = item.direccion || '';
            document.getElementById('input-localidad').value = item.localidad || '';
            document.getElementById('input-provincia').value = item.provincia || '';
            const otro = input.id === 'input-destino' ? document.getElementById('input-destino-entrega') : document.getElementById('input-destino');
            if (otro) otro.value = input.value;
        }
 
        hideList();
    }
 
    input.addEventListener('input', function() {
        const val = this.value.trim();
        if (!val) { hideList(); return; }
        renderList(val);
    });
 
    input.addEventListener('keydown', function(e) {
        const items = list.querySelectorAll('li');
        if (!items.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); currentFocus = Math.min(currentFocus+1, items.length-1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); currentFocus = Math.max(currentFocus-1, 0); }
        else if (e.key === 'Enter') { e.preventDefault(); if (currentFocus>=0) items[currentFocus].dispatchEvent(new Event('mousedown')); return; }
        else if (e.key === 'Escape') { hideList(); return; }
        items.forEach(i => i.classList.remove('active'));
        if (items[currentFocus]) items[currentFocus].classList.add('active');
    });
 
    input.addEventListener('blur', function() {
        setTimeout(hideList, 150);
    });
 
    // Reposicionar al hacer scroll o resize
    window.addEventListener('scroll', () => { if (list.style.display !== 'none') positionList(); }, true);
    window.addEventListener('resize', () => { if (list.style.display !== 'none') positionList(); });
}
 
initAllAutocompletes();
 

/* ==================== CUPOS DINÁMICOS ==================== */

const cuposContainer = document.getElementById('cupos-container');
const btnAgregar     = document.getElementById('agregar-cupo');

let cuposData = [{ id: 1, valor: '' }];
let nextId = 2;

function renderCupos() {
    cuposContainer.innerHTML = '';

    const total = cuposData.length;
    const numCols = Math.ceil(total / 3);

    for (let col = 0; col < numCols; col++) {
        const colDiv = document.createElement('div');
        colDiv.className = 'cupos-col';

        for (let fila = 0; fila < 3; fila++) {
            const idx = col * 3 + fila;
            if (idx >= total) break;

            const item = cuposData[idx];

            const cupoWrap = document.createElement('div');
            cupoWrap.className = 'cupo-item-wrap';

            const inputEl = document.createElement('input');
            inputEl.type = 'text';
            inputEl.value = item.valor;
            inputEl.placeholder = 'VIC...';
            inputEl.maxLength = 20;
            inputEl.dataset.id = item.id;
            inputEl.className = 'cupo-code-input';
            inputEl.addEventListener('input', function () {
                const found = cuposData.find(c => c.id === parseInt(this.dataset.id));
                if (found) found.valor = this.value;
            });

            const btnX = document.createElement('button');
            btnX.type = 'button';
            btnX.className = 'btn-remove-cupo no-pdf';
            btnX.textContent = '×';
            btnX.dataset.id = item.id;
            btnX.addEventListener('click', function () {
                if (cuposData.length <= 1) return; // nunca eliminar el último
                cuposData = cuposData.filter(c => c.id !== parseInt(this.dataset.id));
                renderCupos();
            });

            cupoWrap.appendChild(inputEl);
            cupoWrap.appendChild(btnX);
            colDiv.appendChild(cupoWrap);
        }

        // Botón "+" al pie de la última columna si no está llena
        const esUltimaCol = col === numCols - 1;
        const colItemCount = Math.min(3, total - col * 3);
        const colLlena = colItemCount === 3;

        if (esUltimaCol && !colLlena && total < 9) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn-add-cupo-inline no-pdf';
            btn.textContent = '+';
            btn.addEventListener('click', agregarCupo);
            colDiv.appendChild(btn);
        }

        cuposContainer.appendChild(colDiv);
    }

    // Botón "+" como nueva columna cuando la última está llena
    if (total > 0 && total % 3 === 0 && total < 9) {
        const colExtra = document.createElement('div');
        colExtra.className = 'cupos-col cupos-col-add no-pdf';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-add-col';
        btn.textContent = '+';
        btn.addEventListener('click', agregarCupo);
        colExtra.appendChild(btn);
        cuposContainer.appendChild(colExtra);
    }
}

function agregarCupo() {
    if (cuposData.length < 6) {
        cuposData.push({ id: nextId++, valor: '' });
        renderCupos();
        // Foco en el último input
        const inputs = cuposContainer.querySelectorAll('.cupo-code-input');
        if (inputs.length) inputs[inputs.length - 1].focus();
    }
}

// Ocultar el botón original (lo reemplazamos con botones inline)
btnAgregar.style.display = 'none';

renderCupos();

/* ==================== FORMATO CUIT ==================== */
document.addEventListener('input', function(e) {
    if (!e.target.classList.contains('cuit-input')) return;
    const el = e.target;
    let digits = el.value.replace(/\D/g, '').slice(0, 11);
    let fmt = digits.substring(0, 2);
    if (digits.length > 2) fmt += '-' + digits.substring(2, 10);
    if (digits.length > 10) fmt += '-' + digits.substring(10, 11);
    el.value = fmt;
});

document.addEventListener('keydown', function(e) {
    if (!e.target.classList.contains('cuit-input')) return;
    const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
});

/* ==================== GENERACIÓN DE PDF CORREGIDO ==================== */

async function descargar() {
    const jspdfLib = window.jspdf;
    const jsPDF = jspdfLib ? jspdfLib.jsPDF : null;
    if (!jsPDF) { alert('Error: jsPDF no cargado.'); return; }

    const boton = document.querySelector('.btn-descargar');
    if (boton) boton.style.display = 'none';

    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const PW = pdf.internal.pageSize.getWidth();
        const PH = pdf.internal.pageSize.getHeight();
        const MX = 10;
        const CW = PW - MX * 2;

        const VERDE = [27, 67, 50], BLANCO = [255, 255, 255], GRIS_B = [224, 224, 224], GRIS_L = [102, 102, 102], NEGRO = [26, 26, 26];

        let y = 6;

        function checkPage(needed) {
            if (y + needed > PH - 15) { pdf.addPage(); y = 15; }
        }

        function sectionHeader(title) {
            checkPage(12);
            pdf.setFillColor(...VERDE);
            pdf.rect(MX, y, CW, 10, 'F');
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(15); 
            pdf.setTextColor(...BLANCO);
            pdf.text(title.toUpperCase(), MX + 4, y + 7);
            y += 10;
        }

        function cardBorder(startY, endY) {
            pdf.setDrawColor(...GRIS_B);
            pdf.setLineWidth(0.3);
            pdf.rect(MX, startY, CW, endY - startY, 'S');
        }

        function val(selector) {
            const el = document.querySelector(selector);
            if (!el) return '';
            if (el.type === 'date' && el.value) {
                const p = el.value.split('-');
                return p[2] + '/' + p[1] + '/' + p[0];
            }
            return el.value || '';
        }

        // --- EXTRACCIÓN DE DATOS ---
        const cliente = val('.cliente-card input');
        const fecha = val('.alfa-fecha input[type="date"]');
        const cuposValores = (typeof cuposData !== 'undefined' ? cuposData : [])
            .map(c => c.valor).filter(v => v).slice(0, 6);

        // 1. CORRECCIÓN INTERVINIENTES: Captura TODO (con y sin autocompletado)
        const interData = Array.from(document.querySelectorAll('.interviniente-row')).map(row => ({
            label: row.querySelector('.label-rol')?.textContent?.trim() || '',
            // Buscamos cualquier input que no sea el CUIT
            nombre: row.querySelector('.input-nombre input')?.value?.trim() || '',
            cuit: row.querySelector('input.cuit-input')?.value?.trim() || ''
        })).filter(i => i.nombre || i.cuit);

        // 2. CORRECCIÓN GRANO Y ESPECIES: Acceso directo por posición de tarjeta
        const cards = document.querySelectorAll('.section-card');
        const cardGrano = cards[2]; // La tercera tarjeta es "03 Grano / Especie"
        
        const grano = cardGrano?.querySelectorAll('select')[0]?.value || '';
        const cosecha = cardGrano?.querySelectorAll('select')[1]?.value || '';
        const ruca = val('#input-ruca');
        const contrato = cardGrano?.querySelector('.row-grid:nth-of-type(2) .input-box:nth-of-type(2) input')?.value || '';
        const obs = cardGrano?.querySelector('.row-grid:nth-of-type(3) input')?.value || '';

        const destino = val('#input-destino-entrega');
        const localidad = val('#input-localidad');
        const direccion = val('#input-direccion');
        const provincia = val('#input-provincia');
        const chasis = val('#input-chasis');
        const acoplado = val('#input-acoplado');

        // --- PROCESAR LOGO ---
        let logoDataUrl = null;
        const logoImg = document.querySelector('.header-logo img');
        if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = logoImg.naturalWidth;
                canvas.height = logoImg.naturalHeight;
                canvas.getContext('2d').drawImage(logoImg, 0, 0);
                logoDataUrl = canvas.toDataURL('image/png');
            } catch(e) { console.warn("Logo no disponible"); }
        }

        // --- HEADER ---
        pdf.setFillColor(...VERDE);
        pdf.rect(MX, y, CW, 30, 'F');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.setTextColor(...BLANCO);
        pdf.text('AGROQUÍMICOS DEL NORTE S.A.', PW / 2, y + 12, { align: 'center' });
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text('SISTEMA DE GESTIÓN DE CARGA', PW / 2, y + 20, { align: 'center' });
        
        if (logoDataUrl) {
            const LH = 18, LW = LH * (logoImg.naturalWidth / logoImg.naturalHeight);
            pdf.addImage(logoDataUrl, 'PNG', MX + CW - LW - 5, y + 3, LW, LH);
        }
        y += 36;

        let sY = y;
        sectionHeader('Cliente / Titular');
        pdf.setFont('helvetica', 'normal'); 
        pdf.setFontSize(7); 
        pdf.setTextColor(...GRIS_L);
        pdf.text('CLIENTE', MX + 3, y + 5);
        pdf.setFont('helvetica', 'bold'); 
        pdf.setFontSize(11); 
        pdf.setTextColor(...NEGRO);
        const cliL = pdf.splitTextToSize((cliente || '—').toUpperCase(), CW - 10);
        pdf.text(cliL, MX + 3, y + 10);
        y += (cliL.length * 5) + 8;
        cardBorder(sY, y); y += 5;

        // --- 01 ALFANUMÉRICOS ---
        sY = y;
        sectionHeader('01  Alfanuméricos');
        // Ajuste de fuente para FECHA
        pdf.setFont('helvetica', 'normal'); 
        pdf.setFontSize(7); 
        pdf.setTextColor(...GRIS_L);
        pdf.text('FECHA', MX + 3, y + 6);
        // Valor de la fecha en negrita y alineado
        pdf.setFont('helvetica', 'bold'); 
        pdf.setFontSize(9); 
        pdf.setTextColor(...NEGRO);
        pdf.text(fecha || '—', MX + 15, y + 6); // Se desplaza un poco a la derecha del label
        const cX = MX + 45, colW = 55;
        pdf.setFontSize(9);
        cuposValores.forEach((v, i) => {
            const col  = Math.floor(i / 3); // columna: 0 o 1
            const fila = i % 3;             // fila: 0, 1 o 2
            pdf.text(v.toUpperCase(), cX + col * colW, y + 6 + fila * 6);
        });
        y += (Math.min(cuposValores.length, 3) * 6) + 6;
        cardBorder(sY, y); y += 5;

        // --- 02 INTERVINIENTES (AJUSTE DE ESPACIADO PARA EVITAR QUE SE PISEN) ---
        if (interData.length > 0) {
            sY = y; sectionHeader('02  Intervinientes');
            interData.forEach(item => {
                checkPage(12);
                pdf.setFontSize(7); pdf.setTextColor(...GRIS_L);
                pdf.setFont('helvetica', 'normal');
                // El label ocupa hasta 65mm
                pdf.text(item.label.toUpperCase(), MX + 3, y + 5);
                
                pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(...NEGRO);
                // El nombre empieza en 72mm (no se pisa con el label)
                const nL = pdf.splitTextToSize(item.nombre.toUpperCase(), 75);
                pdf.text(nL, MX + 72, y + 5); 
                
                pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7);
                pdf.text('CUIT:', MX + 150, y + 5);
                pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9);
                pdf.text(item.cuit || '—', MX + 160, y + 5);
                y += (nL.length * 4.5) + 2;
            });
            y += 2; cardBorder(sY, y); y += 5;
        }

        function drawF(label, value, width, x, curY) {
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(...GRIS_L);
            pdf.text(label.toUpperCase(), x, curY);
            pdf.setFont('helvetica', 'bold'); pdf.setFontSize(10); pdf.setTextColor(...NEGRO);
            const lines = pdf.splitTextToSize((value || '—').toUpperCase(), width - 5);
            pdf.text(lines, x, curY + 4.5);
            return (lines.length * 4.5) + 6;
        }

        // --- 03 GRANO / ESPECIE (DIBUJO) ---
        sY = y; sectionHeader('03  Grano / Especie');
        let hA = drawF('Grano / Especie', grano, CW/2, MX+3, y+5);
        let hB = drawF('RUCA', ruca, CW/2, MX+CW/2+3, y+5);
        y += Math.max(hA, hB);

        hA = drawF('Cosecha', cosecha, CW/2, MX+3, y+2);
        hB = drawF('Contrato Nº', contrato, CW/2, MX+CW/2+3, y+2);
        y += Math.max(hA, hB);

        y += drawF('Observaciones', obs, CW, MX+3, y+2);
        cardBorder(sY, y); y += 5;

        // --- 04 LUGAR DE ENTREGA ---
        sY = y; sectionHeader('04  Lugar de Entrega');
        hA = drawF('Destino', destino, CW/2, MX+3, y+5);
        hB = drawF('Localidad', localidad, CW/2, MX+CW/2+3, y+5);
        y += Math.max(hA, hB);

        hA = drawF('Dirección', direccion, CW/2, MX+3, y+2);
        hB = drawF('Provincia', provincia, CW/2, MX+CW/2+3, y+2);
        y += Math.max(hA, hB);

        y += drawF('Chasis', chasis, CW, MX+3, y+2);
        y += drawF('Acoplado', acoplado, CW, MX+3, y+2);
        cardBorder(sY, y);

        // --- FOOTER ---
        pdf.setFontSize(6.3); pdf.setTextColor(...GRIS_L);
        pdf.text('DOCUMENTO GENERADO PARA AGROQUÍMICOS DEL NORTE S.A. | © 2026 Todos los derechos reservados - Ramiro Stefanutti | +54 385 7488836', PW/2, PH-5, { align: 'center' });

        pdf.save('Cupo_AgroquimicosDelNorte.pdf');

    } catch (e) {
        console.error(e);
        alert('Error: ' + e.message);
    } finally {
        if (boton) boton.style.display = '';
    }
}

function limpiarPagina() {
    const pdfContent = document.getElementById('pdf-content');
    if (!pdfContent) return;

    pdfContent.querySelectorAll('input, select').forEach(el => {
        if (el.type === 'date') {
            el.value = '';
        } else if (el.tagName === 'SELECT') {
            el.selectedIndex = 0;
        } else {
            el.value = '';
        }
    });

    cuposData = [{ id: 1, valor: '' }];
    nextId = 2;
    renderCupos();
}
