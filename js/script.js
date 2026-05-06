/* ==================== DATOS EMBEBIDOS (sin fetch) ==================== */
const JSON_DATA = {
  "destinatarios": [
    { "nombre": "BUNGE ARGENTINA S.A.", "cuit": "30700869918", "direccion": "EVA PERON Y RUTA 11", "localidad": "PTO GRAL SAN MARTIN", "ruca": "23820", "provincia": "SANTA FE" },
    { "nombre": "CARGILL SACI", "cuit": "30506792165", "direccion": "IRIGOYEN Y BAJ QUEBRACHO", "localidad": "PTO GRAL SAN MARTIN", "ruca": "25594", "provincia": "SANTA FE" },
    { "nombre": "CARGILL SACI", "cuit": "30506792165", "direccion": "AV ROMULO MONTAGNI Y C. DEL PARANA", "localidad": "ALVEAR", "ruca": "22976", "provincia": "SANTA FE" },
    { "nombre": "COFCO INTERNATIONAL ARGENTINA SA", "cuit": "33506737449", "direccion": "ROCA Y CUBA", "localidad": "PTO GRAL SAN MARTIN", "ruca": "512428", "provincia": "SANTA FE" },
    { "nombre": "COFCO INTERNATIONAL ARGENTINA SA", "cuit": "33506737449", "direccion": "AVDA BRIGADIER LOPEZ S/N", "localidad": "TIMBUES", "ruca": "408254", "provincia": "SANTA FE" },
    { "nombre": "LDC ARGENTINA SA", "cuit": "30526712729", "direccion": "RUTA 21 KM 278", "localidad": "GRAL LAGOS", "ruca": "21030", "provincia": "SANTA FE" },
    { "nombre": "LDC ARGENTINA SA", "cuit": "30526712729", "direccion": "Brigadier E. López 9508", "localidad": "TIMBUES JOSE MARIA", "ruca": "23981", "provincia": "SANTA FE" },
    { "nombre": "MOLINOS AGRO S.A.", "cuit": "30715118773", "direccion": "BINELLI 398", "localidad": "SAN LORENZO", "ruca": "408411", "provincia": "SANTA FE" },
    { "nombre": "RENOVA", "cuit": "30709590894", "direccion": "AV BRIGADIER LOPEZ 10500", "localidad": "TIMBUES", "ruca": "518477", "provincia": "SANTA FE" },
    { "nombre": "VICENTIN SA", "cuit": "30500959629", "direccion": "URIBURU 3364", "localidad": "ROSARIO", "ruca": "22387", "provincia": "SANTA FE" },
    { "nombre": "VICENTIN SA", "cuit": "30500959629", "direccion": "CALLE 11 Y SCAPIGLIATTI", "localidad": "SAN LORENZO", "ruca": "25567", "provincia": "SANTA FE" },
    { "nombre": "MOLINOS AGRO S.A.", "cuit": "33506737449", "direccion": "RUTA NAC 98 KM 224,5", "localidad": "BANDERA", "ruca": "", "provincia": "SANTIAGO DEL ESTERO" },
    { "nombre": "MOLINOS CABANELLAS Y CIA SACI", "cuit": "30500813896", "direccion": "3 DE FEBRERO 576", "localidad": "MACIEL", "ruca": "", "provincia": "SANTA FE" },
    { "nombre": "OLEAGINOSA MORENO", "cuit": "33502232229", "direccion": "", "localidad": "", "ruca": "", "provincia": "" },
    { "nombre": "BUNGE ARGENTINA S.A", "cuit": "30700869918", "direccion": "Ruta Nacional 1V09 km 336", "localidad": "SAN JERóNIMO SUD", "ruca": "21334", "provincia": "SANTA FE", "sufijo": "SJS" },
    { "nombre": "AGD SA", "cuit": "30502874353", "direccion": "CAMINO PUBLICO", "localidad": "TIMBUES", "ruca": "523969", "provincia": "SANTA FE" },
    { "nombre": "AGD SA", "cuit": "30502874353", "direccion": "AV PERON 1100", "localidad": "CERES", "ruca": "22819", "provincia": "SANTA FE" }
],
  "intervinientes": [
    { "nombre": "AGROQUIMICOS DEL NORTE SA", "cuit": "30708362235" },
    { "nombre": "AGROCORREDORA CEREALES SA", "cuit": "30708599014" },
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

/* ==================== PANTALLA DE CARGA ==================== */
(function() {
    const progressFill = document.getElementById('progress-fill');
    const porcentajeSpan = document.getElementById('porcentaje');
    const overlay = document.getElementById('loading-overlay');
    const app = document.getElementById('app-container');
    const truck = document.querySelector('.truck-svg');

    let progress = 0;
    const interval = 20;
    const step = 100 / (2500 / interval);

    function updateTruck(pct) {
        const container = truck.parentElement;
        const maxLeft = container.offsetWidth - truck.offsetWidth;
        truck.style.left = (pct / 100) * maxLeft + 'px';
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
    const list = document.createElement('ul');
    list.className = 'autocomplete-list';
    wrapper.appendChild(list);
    let currentFocus = -1;

    function renderList(val) {
        list.innerHTML = '';
        currentFocus = -1;
        if (!val) {
            wrapper.classList.remove('active-dropdown');
            return;
        }

        const matches = dataSource.filter(item =>
            (item.nombre + ' ' + (item.localidad || '') + ' ' + (item.ruca || ''))
                .toUpperCase()
                .includes(val.toUpperCase())
        ).slice(0, 20);

        if (matches.length === 0) {
            wrapper.classList.remove('active-dropdown');
            return;
        }

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

        wrapper.classList.add('active-dropdown');

        if (list.children.length > 0) {
            currentFocus = 0;
            list.children[0].classList.add('active');
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

        list.innerHTML = '';
        currentFocus = -1;
        wrapper.classList.remove('active-dropdown');
    }

    input.addEventListener('input', function() {
        const val = this.value.trim();
        if (!val) {
            list.innerHTML = '';
            currentFocus = -1;
            wrapper.classList.remove('active-dropdown');
            return;
        }
        renderList(val);
    });

    input.addEventListener('keydown', function(e) {
        const items = list.querySelectorAll('li');
        if (!items.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); currentFocus = Math.min(currentFocus+1, items.length-1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); currentFocus = Math.max(currentFocus-1, 0); }
        else if (e.key === 'Enter') { e.preventDefault(); if (currentFocus>=0) items[currentFocus].dispatchEvent(new Event('mousedown')); return; }
        else if (e.key === 'Escape') { list.innerHTML = ''; currentFocus = -1; wrapper.classList.remove('active-dropdown'); return; }
        items.forEach(i => i.classList.remove('active'));
        if (items[currentFocus]) items[currentFocus].classList.add('active');
    });

    input.addEventListener('blur', function() {
        setTimeout(() => { list.innerHTML = ''; currentFocus = -1; wrapper.classList.remove('active-dropdown'); }, 150);
    });
}

initAllAutocompletes();
/* ==================== CUPOS DINÁMICOS ==================== */
let cupoCounter = 1;
const cuposContainer = document.getElementById('cupos-container');

function crearCupoRow(numero) {
    const row = document.createElement('div');
    row.className = 'cupo-row';
    row.innerHTML = `
        <div class="input-box">
            <label class="label-rol">Alfanumérico Cupo ${numero}:</label>
            <input type="text" placeholder="EJ: VIC466860...">
        </div>
        <button type="button" class="btn-remove-cupo no-pdf" title="Eliminar cupo">&times;</button>
    `;
    row.querySelector('.btn-remove-cupo').addEventListener('click', () => {
        row.remove();
        actualizarNumeracion();
    });
    return row;
}

function actualizarNumeracion() {
    const filas = cuposContainer.querySelectorAll('.cupo-row');
    filas.forEach((fila, i) => {
        fila.querySelector('label').textContent = `Alfanumérico Cupo ${i + 1}:`;
    });
    cupoCounter = filas.length + 1;
}

cuposContainer.appendChild(crearCupoRow(cupoCounter++));
document.getElementById('agregar-cupo').addEventListener('click', () => {
    cuposContainer.appendChild(crearCupoRow(cupoCounter++));
});

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


/* ==================== GENERACIÓN DE PDF ==================== */
async function descargar() {
    const html2canvas = window.html2canvas;
    const jspdfLib = window.jspdf;
    const jsPDF = jspdfLib ? jspdfLib.jsPDF : null;

    if (!html2canvas || !jsPDF) {
        alert('Error: Librerías no cargadas...');
        return;
    }

    const boton = document.querySelector('.btn-descargar');
    if (boton) boton.style.display = 'none';

    const original = document.getElementById('pdf-content');
    const clon = original.cloneNode(true);
    clon.querySelectorAll('.no-pdf, .autocomplete-list, .active-dropdown').forEach(el => el.remove());

    const originalInputs = Array.from(original.querySelectorAll('input, select'));
    const clonInputs = Array.from(clon.querySelectorAll('input, select'));

    originalInputs.forEach((input, i) => {
        const clone = clonInputs[i];
        if (!clone) return;
        const span = document.createElement('span');
        span.className = 'pdf-input-value';
        span.textContent = input.value || '\u00A0';
        clone.replaceWith(span);
    });

    clon.style.cssText = 'position:fixed;top:0;left:0;width:794px;background:#f0f2f5;z-index:-1;opacity:1;';
    clon.classList.add('pdf-render-mode');
    document.body.appendChild(clon);

    await new Promise(r => setTimeout(r, 300));

    try {
        // 👉 Reducir la escala de 2 a 1.5 (o 1.2 si aún no entra)
        const canvas = await html2canvas(clon, {
            scale: 1.5,          // antes 2, ahora más comprimido
            useCORS: true,
            backgroundColor: '#f0f2f5',
            logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.92); // calidad JPEG ajustable
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();  // 210mm
        const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
        const margin = 5; // márgenes pequeños

        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Si la imagen es más alta que la página, forzamos a que ocupe toda la altura disponible
        let finalHeight = imgHeight;
        if (imgHeight > pageHeight - margin * 2) {
            finalHeight = pageHeight - margin * 2;
            // Recalcular el ancho para mantener la proporción
            // (pero preferimos mantener el ancho completo y dejar que se escale)
        }

        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, finalHeight);

        // 👉 Eliminamos el bucle while, solo una página
        pdf.save('Cupo_AgroquimicosNorte.pdf');
    } catch (error) {
        console.error(error);
        alert('Error al generar PDF.');
    } finally {
        document.body.removeChild(clon);
        if (boton) boton.style.display = '';
    }
}
