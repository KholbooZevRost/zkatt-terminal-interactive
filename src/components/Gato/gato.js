import './gato.css';
import { iniciarComponenteTerminal } from '../Terminal/terminal.js';
export function iniciarComponenteGato(contenedorMaestro) {
    
    // ==========================================================================
    // [Sección 01] INDEPENDENCIA DE VARIABLES GLOBALES Y MÁQUINA DE ESTADOS
    // ==========================================================================
    let estadoActual = 'ESPERA'; // Estados del Bot: 'ESPERA', 'DIALOGO', 'HOSTIL', 'TERMINAL'
    let bucleTerminalId = null;

    // Variables físicas oculares para la interpolación lineal (LERP Turbo)
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let currentWidth = 0.2, currentHeight = 1.0, currentConvergence = 0.0; 
    let estaEnZonaActiva = false, estaSobreLaNariz = false;

    // ==========================================================================
    // [Sección 02] INYECCIÓN DEL VECTOR REAL SVG Y ARQUITECTURA DOM BASE
    // ==========================================================================
    contenedorMaestro.innerHTML = `
        <div id="pantalla-blanca">
            <div class="contenedor-katt">
                
                <div id="caja-dialogo-nodo"></div>

                <svg viewBox="0 0 8 8" class="gato-svg" id="gato-interactivo">
                    <defs>
                        <clipPath id="corte-ojo-izq">
                            <rect x="2" y="3" width="1" height="1" id="mask-rect-izq" />
                        </clipPath>
                        <clipPath id="corte-ojo-der">
                            <rect x="5" y="3" width="1" height="1" id="mask-rect-der" />
                        </clipPath>
                    </defs>

                    <g fill="#000000">
                        <rect x="2" y="1" width="1" height="1" />
                        <rect x="5" y="1" width="1" height="1" />
                        <rect x="2" y="2" width="4" height="1" />
                        <rect x="1" y="3" width="1" height="1" />
                        <rect x="3" y="3" width="2" height="1" />
                        <rect x="6" y="3" width="1" height="1" />
                        <rect x="1" y="4" width="6" height="1" />
                        <rect x="2" y="5" width="4" height="1" />
                    </g>
                    
                    <rect x="2" y="3" width="1" height="1" class="ojo-base" id="base-izq" />
                    <rect x="2.4" y="3" width="0.2" height="1" fill="#000000" clip-path="url(#corte-ojo-izq)" class="iris" id="iris-izq" />
                    
                    <rect x="5" y="3" width="1" height="1" class="ojo-base" id="base-der" />
                    <rect x="5.4" y="3" width="0.2" height="1" fill="#000000" clip-path="url(#corte-ojo-der)" class="iris" id="iris-der" />
                </svg>

                <h1 class="titulo-sistema" id="brand-text">Z.KATT // KOBLET</h1>
            </div>
        </div>
    `;

    // RE-MAPEO Y CAPTURA DE NODOS ELEMENTAL (Corrige el error de uiDialogo null)
    const irisIzq = contenedorMaestro.querySelector('#iris-izq');
    const irisDer = contenedorMaestro.querySelector('#iris-der');
    const baseIzq = contenedorMaestro.querySelector('#base-izq');
    const baseDer = contenedorMaestro.querySelector('#base-der');
    const maskRectIzq = contenedorMaestro.querySelector('#mask-rect-izq');
    const maskRectDer = contenedorMaestro.querySelector('#mask-rect-der');
    const gatoSvg = contenedorMaestro.querySelector('#gato-interactivo');
    const cajaDialogoNodo = contenedorMaestro.querySelector('#caja-dialogo-nodo');
    const pantallaBlanca = contenedorMaestro.querySelector('#pantalla-blanca');
    const brandText = contenedorMaestro.querySelector('#brand-text');

// ==========================================================================
    // [Sección 03] FASE 1 Y 2: SALUDO FELINO, DOS OLAS LENTAS Y APARICIÓN DE GOLPE
    // ==========================================================================
    function dispararDialogoGato() {
        if (estadoActual !== 'ESPERA') return; 
        estadoActual = 'DIALOGO';

        // FASE 1: Inicialización de la viñeta en negro absoluto con la tipografía Courier de máquina.
        cajaDialogoNodo.innerHTML = `
            <div class="dialogo-terminal-3d" id="bunker-estatico-3d" style="position: absolute; bottom: 128px; left: 50%; transform: translateX(-50%); perspective: 1000px; width: 85%; max-width: 345px; z-index: 100; box-sizing: border-box;">
                <style>
                    /* Colita negra unificada con el cuerpo del gato */
                    .cara-frontal::before {
                        content: ""; position: absolute; bottom: -11px; left: 50%; transform: translateX(-50%);
                        border-width: 11px 11px 0; border-style: solid; border-color: #000000 transparent; z-index: 99;
                    }
                    .cara-frontal::after {
                        content: ""; position: absolute; bottom: -9px; left: 50%; transform: translateX(-50%);
                        border-width: 9px 9px 0; border-style: solid; border-color: #000000 transparent; z-index: 100;
                    }
                    
                    /* Contenedor mecánico encargado de la rotación geométrica */
                    .tarjeta-dual-3d {
                        width: 100%; position: relative; transform-style: preserve-3d;
                        transition: transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1);
                        cursor: pointer;
                    }
                    
                    /* Reglas de hover dinámicas controladas desde JavaScript */
                    .tarjeta-dual-3d.tilt-derecha:not(.estado-volteado) {
                        transform: rotateY(14deg) rotateX(4deg);
                    }
                    .tarjeta-dual-3d.estado-volteado.tilt-izquierda {
                        transform: rotateY(166deg) rotateX(-4deg);
                    }
                    
                    /* Clase de activación que ejecuta el giro completo de 180 grados */
                    .tarjeta-dual-3d.estado-volteado {
                        transform: rotateY(180deg);
                    }
                    
                    /* Fondo negro absoluto sólido para máxima cohesión con el pixel art */
                    .cara-dual {
                        width: 100%; backface-visibility: hidden; border-radius: 4px;
                        box-sizing: border-box; background: #000000; border: 2px solid #222222;
                        padding: 14px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
                    }
                    .cara-frontal {
                        position: relative; z-index: 2; transform: rotateY(0deg);
                    }
                    .cara-posterior {
                        position: absolute; top: 0; left: 0; height: 100%; transform: rotateY(180deg);
                        display: flex; flex-direction: column; gap: 8px; justify-content: center; padding: 10px 14px;
                        background: #000000;
                        border: 2px solid #0d3819 !important;
                        box-shadow: inset 0 0 12px rgba(0, 255, 85, 0.15), 0 4px 15px rgba(0, 0, 0, 0.6);
                    }
                    
                    /* Tipografía Console Frente: Mantenida perfecta e intacta */
                    .texto-sistema-hud {
                        margin: 0; text-align: left; 
                        font-family: 'Courier New', Courier, monospace !important;
                        font-size: 13.5px !important; 
                        font-weight: bold !important; 
                        letter-spacing: 0px !important; 
                        line-height: 1.3 !important;
                        color: #e2f7eb !important;
                        -webkit-font-smoothing: antialiased;
                    }
                </style>

                <div class="tarjeta-dual-3d" id="tarjeta-dialogo-3d">
                    <div class="cara-dual cara-frontal">
                        <p id="texto-typing" class="texto-sistema-hud">
                            ᚛ ¡Miau!<span class="ola-puntos"><span>.</span><span>.</span><span>.</span></span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // FASE 2: Inyección del texto largo y activación de controladores analógicos a los 2.4 segundos.
        setTimeout(() => {
            const textoTerminal = contenedorMaestro.querySelector('#texto-typing');
            const tarjeta = contenedorMaestro.querySelector('#tarjeta-dialogo-3d');
            const bunkerEstatico = contenedorMaestro.querySelector('#bunker-estatico-3d');
            
            if (textoTerminal && tarjeta && bunkerEstatico) {
                textoTerminal.innerText = "᚛ Qué criatura tan osada. Interrumpir la frecuencia de un señor gato... Asumiré que no te presentas con las manos vacías. Confío en que, al menos, tuviste la decencia de traer algo para mi deleite, ¿verdad?";
                
                // Inyección limpia de las opciones estables en el reverso del letrero.
                tarjeta.insertAdjacentHTML('beforeend', `
                    <div class="cara-dual cara-posterior" id="opciones-nodo">
                        <button class="btn-opcion-hud" id="opcion-a">
                            ᚛ Sí. Supongo que traje algo.
                        </button>
                        <button class="btn-opcion-hud" id="opcion-b">
                            ᚛ No. No sé qué esperas de mí.
                        </button>
                    </div>
                `);
                
                // DETECTOR ASIMÉTRICO DE MOVIMIENTO (HOVER CONDICIONAL CON FILTRO PERIMETRAL)
                tarjeta.addEventListener('mousemove', function calibrarInclinacion(e) {
                    const rect = bunkerEstatico.getBoundingClientRect();
                    const clickEnBoton = e.target.closest('.btn-opcion-hud');
                    
                    if (tarjeta.classList.contains('estado-volteado')) {
                        if (clickEnBoton) {
                            tarjeta.classList.remove('tilt-izquierda');
                            return;
                        }
                        
                        const esBordeIzquierdo = (e.clientX >= rect.left) && (e.clientX <= rect.left + 50);
                        if (esBordeIzquierdo) {
                            tarjeta.classList.add('tilt-izquierda');
                        } else {
                            tarjeta.classList.remove('tilt-izquierda');
                        }
                    } else {
                        const esMitadDerecha = e.clientX >= (rect.left + rect.width / 2);
                        if (esMitadDerecha) {
                            tarjeta.classList.add('tilt-derecha');
                        } else {
                            tarjeta.classList.remove('tilt-derecha');
                        }
                    }
                });
                
                tarjeta.addEventListener('mouseleave', function limpiarMatriz() {
                    tarjeta.classList.remove('tilt-derecha', 'tilt-izquierda');
                });
                
                // CONTROL DIRECCIONAL DE CLICS SEGMENTADOS EN BORDES
                tarjeta.addEventListener('click', function ejecutarGiroMatriz(e) {
                    const rect = bunkerEstatico.getBoundingClientRect();
                    const clickEnBoton = e.target.closest('.btn-opcion-hud');
                    
                    if (tarjeta.classList.contains('estado-volteado')) {
                        const esBordeIzquierdo = (e.clientX >= rect.left) && (e.clientX <= rect.left + 50);
                        if (!clickEnBoton && esBordeIzquierdo) {
                            tarjeta.classList.remove('estado-volteado', 'tilt-izquierda');
                        }
                    } else {
                        const esMitadDerecha = e.clientX >= (rect.left + rect.width / 2);
                        if (esMitadDerecha) {
                            tarjeta.classList.add('estado-volteado');
                            tarjeta.classList.remove('tilt-derecha');
                            asociarEventosDecisiones();
                        }
                    }
                });
            }
            
        }, 2400);
    }
    gatoSvg.addEventListener('click', dispararDialogoGato);

    // ==========================================================================
    // [Sección 04] ASIGNADOR DE EVENTOS DE BRANCHING (TOMA DE DECISIONES)
    // ==========================================================================
    function asociarEventosDecisiones() {
        contenedorMaestro.querySelector('#opcion-a').addEventListener('click', ejecutarRutaSi);
        contenedorMaestro.querySelector('#opcion-b').addEventListener('click', ejecutarRutaNo);
    }

    // ==========================================================================
    // [Sección 05] RUTA SÍ: DESTELLO LUMÍNICO Y SECUENCIA DE MÓDULO 2 TERMINAL
    // ==========================================================================
    function ejecutarRutaSi() {
        estadoActual = 'TERMINAL';
        cajaDialogoNodo.innerHTML = ''; // Limpiar UI intermedia
        
        // Lanzamiento del flash rápido en pantalla verde esmeralda
        pantallaBlanca.style.backgroundColor = '#00ff55';
        
        setTimeout(() => {
            pantallaBlanca.style.backgroundColor = ''; // Limpiamos el flash inline style
            
            // Activamos de manera modular el componente del terminal alienígena de Gaia
            iniciarComponenteTerminal(contenedorMaestro);
            
        }, 80); // Duración exacta del pulso cibernético
    }

    // ==========================================================================
    // [Sección 06] MOTOR CORE DE LOGS Y CASCADA DE PROCESOS INFINITOS
    // ==========================================================================
    function iniciarCascadaServidor(nodoConsola) {
        const logsBase = [
            { t: "INITIALIZING Z.KATT SYSTEM KERNEL v4.8.2...", c: "linea-exito" },
            { t: "CONNECTING TO KOBLET REMOTE SERVER CORE...", c: "linea-comando" },
            { t: "SECURE HANDSHAKE COMPLETED // STATUS: OK", c: "linea-exito" },
            { t: "LOADING FELINE INTERACTION ALGORITHMS...", c: "linea-comando" },
            { t: "WARNING: HIGH CURIROSITY DETECTED IN QUADRANT 3", c: "linea-alerta" },
            { t: "OVERRIDING SECURITY PROTOCOLS... [STAG-02]", c: "linea-comando" },
            { t: "ALLOCATING BUFFER MEMORY AT ADDRESS 0x7FFF56D0", c: "linea-comando" },
            { t: "DOWNLOADING CATNIP DATA PACKETS [============>] 100%", c: "linea-exito" },
            { t: "MOUNTING PARTITION /dev/feline_soul ON /media/root", c: "linea-comando" },
            { t: "CRITICAL: SYSTEM TEMPTATION LEVEL EXCEEDED 94%", c: "linea-critica" },
            { t: "BYPASSING FIREWALL LOG... SUCCESS.", c: "linea-exito" },
            { t: "COMPILING LERP_TURBO INTERPOLATION MATHEMATICS...", c: "linea-comando" },
            { t: "READY FOR OPERATIONS. ENJOY THE TERMINAL RUNTIME.", c: "linea-exito" }
        ];

        let indexLog = 0;

        function volcarLineas() {
            if (indexLog < logsBase.length) {
                const item = logsBase[indexLog];
                const p = document.createElement('p');
                p.className = `linea-comando ${item.c}`;
                p.innerText = `> ${item.t}`;
                nodoConsola.appendChild(p);
                nodoConsola.scrollTop = nodoConsola.scrollHeight;
                indexLog++;
                bucleTerminalId = setTimeout(volcarLineas, Math.random() * 300 + 100);
            } else {
                ejecutarFlujoInfinito(nodoConsola);
            }
        }
        volcarLineas();
    }

    function ejecutarFlujoInfinito(nodoConsola) {
        function bucle() {
            if (estadoActual !== 'TERMINAL') return;
            const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
            const ram = Math.floor(Math.random() * 900 + 100);
            const p = document.createElement('p');
            p.className = "linea-comando";
            p.innerText = `[SYS_RUN] FETCH_DATA_STREAM // BLOCK_ID: 0x${hex} // PORT_${ram}.. ACTIVE`;
            nodoConsola.appendChild(p);
            
            if (nodoConsola.childNodes.length > 30) nodoConsola.removeChild(nodoConsola.firstChild);
            nodoConsola.scrollTop = nodoConsola.scrollHeight;
            
            bucleTerminalId = setTimeout(bucle, 100);
        }
        bucle();
    }
 // ==========================================================================
    // [Sección 07] RUTA NO: NARRACIÓN SECUENCIAL INTERACTIVA CON PEZ TERMINAL
    // ==========================================================================
    function ejecutarRutaNo() {
        estadoActual = 'HOSTIL';
        
        // 1. Estética Hostil e Inflexión de Pantalla
        baseIzq.classList.add('furia-roja');
        baseDer.classList.add('furia-roja');
        irisIzq.classList.add('furia-roja');
        irisDer.classList.add('furia-roja');
        brandText.classList.add('modo-terminal');
        pantallaBlanca.classList.add('modo-hostil-rojo'); 
        // Inyección con texto apilado
        // Dentro de ejecutarRutaNo()
        // 1.5. Inyección estética de acceso denegado
const contenedorKatt = contenedorMaestro.querySelector('.contenedor-katt');
contenedorKatt.insertAdjacentHTML('afterbegin', `
    <div class="contenedor-candado-denegado">
        <div class="icono-candado">🔒</div>
        <div class="texto-denegado-branding">ACCESO</div>
        <div class="texto-denegado-branding">DENEGADO</div>
    </div>
`);

        // 2. Despliegue de Párpados Negros Fijos
        const corteIzq = contenedorMaestro.querySelector('#corte-ojo-izq');
        const corteDer = contenedorMaestro.querySelector('#corte-ojo-der');
        corteIzq.innerHTML = `<rect x="2" y="3" width="1" height="1" />`; 
        corteDer.innerHTML = `<rect x="5" y="3" width="1" height="1" />`; 
        baseIzq.setAttribute('y', '3'); baseIzq.setAttribute('height', '1');
        baseDer.setAttribute('y', '3'); baseDer.setAttribute('height', '1');

        const parpadoIzq = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        parpadoIzq.setAttribute("x", "2"); parpadoIzq.setAttribute("y", "3");
        parpadoIzq.setAttribute("width", "1"); parpadoIzq.setAttribute("height", "0.4");
        parpadoIzq.setAttribute("fill", "#000000"); parpadoIzq.setAttribute("id", "parpado-negro-izq");

        const parpadoDer = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        parpadoDer.setAttribute("x", "5"); parpadoDer.setAttribute("y", "3");
        parpadoDer.setAttribute("width", "1"); parpadoDer.setAttribute("height", "0.4");
        parpadoDer.setAttribute("fill", "#000000"); parpadoDer.setAttribute("id", "parpado-negro-der");

        gatoSvg.appendChild(parpadoIzq);
        gatoSvg.appendChild(parpadoDer);

        // 📍 CORRECCIÓN MÁXIMA: Eliminamos el contenedor de opciones del sistema de la pantalla baja
        const opcionesNodo = contenedorMaestro.querySelector('#opciones-nodo');
        if (opcionesNodo) opcionesNodo.remove();

        // Capturamos el contenedor principal de la viñeta (El resto de la función sigue intacta...)
        const dialogoTerminal = contenedorMaestro.querySelector('.dialogo-terminal');
dialogoTerminal.classList.add('viñeta-holografica');
        
        if (dialogoTerminal) {
            // 📍 CORRECCIÓN: Añadimos la clase para apagar la colita
            dialogoTerminal.classList.add('estado-narrador');
            

            // ==========================================================================
            // REMOCIÓN QUIRÚRGICA: Se elimina por completo el bloque que alteraba "cajaBurbujaOriginal"
            // Esto evita que el nodo ocupe espacio físico en el Flexbox y mantiene al gato 100% inamovible.
            // ==========================================================================

            // Inyectamos las animaciones del Pez y el indicador de clicks clonando el estilo de image_9b691d.png
            dialogoTerminal.innerHTML = `
                <style>
                    /* Apagamos por completo el borde exterior y el relleno de la colita del gato */
                    .dialogo-terminal.estado-narrador::before,
                    .dialogo-terminal.estado-narrador::after {
                        display: none !important;
                    }
                    @keyframes pezBrillante {
                        0% { text-shadow: 0 0 4px #FFF, 0 0 8px #FF3333; transform: scale(1); }
                        50% { text-shadow: 0 0 16px #FF3333, 0 0 24px #FF3333; transform: scale(1.15) translateY(-2px); }
                        100% { text-shadow: 0 0 4px #FFF, 0 0 8px #FF3333; transform: scale(1); }
                    }
                    @keyframes promptPulsante {
                        0%, 100% { opacity: 0.2; }
                        50% { opacity: 0.9; }
                    }
                    .puerta-pez {
                        display: inline-block;
                        font-size: 26px;
                        cursor: pointer;
                        animation: pezBrillante 1.4s infinite ease-in-out;
                        user-select: none;
                        margin-bottom: 2px;
                    }
                </style>
                
                <div id="narrador-clicks" style="width: 100%; box-sizing: border-box; cursor: pointer;">
                    // Busca esta parte dentro de la inyección HTML de ejecutarRutaNo
                    <p id="texto-consola" style="margin: 0; text-align: left; width: 100%; box-sizing: border-box; color: #FFFFFF; min-height: 48px;"></p>
                    <div id="click-prompt" style="text-align: right; color: #FF3333; font-size: 10px; font-weight: bold; margin-top: 6px; animation: promptPulsante 1.2s infinite; font-family: 'Agency FB', 'Bahnschrift', sans-serif; font-stretch: condensed; letter-spacing: 0.2px;">[ CLICK // TAP ]</div>
                </div>
                
                <div id="zona-puerta-terminal" style="display: none; width: 100%; text-align: center; margin-top: 10px; border-top: 1px dotted #333333; padding-top: 8px; box-sizing: border-box;">
                    <div class="puerta-pez" id="opcion-redencion">🐟</div>
                    <div style="font-family: 'Agency FB', 'Bahnschrift SemiLight Condensed', 'Bahnschrift', 'Arial Narrow', sans-serif; font-stretch: condensed; font-size: 12px; font-weight: bold; color: #777777; letter-spacing: -0.2px; margin-top: 2px;">EJECUTAR PROTOCOLO</div>
                </div>
            `;

            const cajaInteractiva = dialogoTerminal.querySelector('#narrador-clicks');
            const visualTexto = dialogoTerminal.querySelector('#texto-consola');
            const promptClick = dialogoTerminal.querySelector('#click-prompt');
            const seccionPez = dialogoTerminal.querySelector('#zona-puerta-terminal');

            // Las tres estaciones exactas de la narración que solicitaste
            const fragmentos = [
                "[ Z_KATT te mira en completo silencio. ]",
                "[ Sus ojos reflejan decepción y una total indiferencia. Se siente insultado. ]",
                "[ Está esperando una disculpa sincera de tu parte, y en el fondo sabes que la única manera de salir de aquí es alimentándolo. ]"
            ];
            
            let indiceProgreso = 0;

            // Motor de render por palabras para máxima fluidez táctica
            function plasmarTexto() {
                cajaInteractiva.style.pointerEvents = "none"; // Evita clicks accidentales mientras escribe
                visualTexto.innerHTML = "";
                
                const palabras = fragmentos[indiceProgreso].split(" ");
                let p = 0;
                
                function tickPalabra() {
                    if (p < palabras.length) {
                        visualTexto.innerHTML += (p === 0 ? "" : " ") + palabras[p];
                        p++;
                        setTimeout(tickPalabra, 45); 
                    } else {
                        cajaInteractiva.style.pointerEvents = "auto"; // Reactiva la interacción
                        
                        // Si llegamos al tramo final, apagamos el indicador de clicks y revelamos el pez mutante
                        if (indiceProgreso === fragmentos.length - 1) {
                            promptClick.style.display = "none";
                            cajaInteractiva.style.cursor = "default";
                            seccionPez.style.display = "block";
                            
                            // Vinculamos la acción del pez brillante a tu función nativa de Redención
                            dialogoTerminal.querySelector('#opcion-redencion').addEventListener('click', ejecutarRutaSi);
                        }
                    }
                }
                tickPalabra();
            }

            // Manejador del avance de viñeta
            cajaInteractiva.addEventListener('click', () => {
                if (indiceProgreso < fragmentos.length - 1) {
                    indiceProgreso++;
                    plasmarTexto();
                }
            });

            // Arrancamos el primer bloque de inmediato
            mostrarFragmentoInmediato();
            function mostrarFragmentoInmediato() {
                setTimeout(() => { plasmarTexto(); }, 400);
            }
        }
    }
   
    // ==========================================================================
    // [Sección 08] EL DETECTOR DE CUADRANTES ADAPTATIVO POR MATRIZ 5X5
    // ==========================================================================
    const rastrearCursor = (e) => {
        // Cortocircuito: Si la terminal está operando o está enojado, el mouse se ignora
        if (estadoActual === 'TERMINAL' || estadoActual === 'HOSTIL') return;

        const posicionX = e.touches ? e.touches[0].clientX : e.clientX;
        const posicionY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const anchoPantalla = window.innerWidth;
        const altoPantalla = window.innerHeight;
        
        const limiteIzquierdo = anchoPantalla / 5;        
        const limiteDerecho = (anchoPantalla / 5) * 4;     
        
        const mitadPantallaX = anchoPantalla / 2;
        const mitadPantallaY = altoPantalla / 2;
        
        const desviacionX = (posicionX - mitadPantallaX) / mitadPantallaX;
        const desviacionY = (posicionY - mitadPantallaY) / mitadPantallaY;

        const cajaGato = gatoSvg.getBoundingClientRect();
        const dentroDeX = posicionX >= (cajaGato.left + cajaGato.width * 0.35) && posicionX <= (cajaGato.left + cajaGato.width * 0.65);
        const dentroDeY = posicionY >= (cajaGato.top + cajaGato.height * 0.35) && posicionY <= (cajaGato.top + cajaGato.height * 0.65);

        if (posicionX >= limiteIzquierdo && posicionX <= limiteDerecho) {
            estaEnZonaActiva = true;

            if (dentroDeX && dentroDeY) {
                estaSobreLaNariz = true;
                targetX = desviacionX * 0.02;
                targetY = desviacionY * 0.50; 
            } else {
                estaSobreLaNariz = false;
                targetX = desviacionX * 0.3;
                targetY = desviacionY * 0.4;
            }
        } else {
            estaSobreLaNariz = false;
            estaEnZonaActiva = false;
            targetX = 0;
            targetY = 0;
        }
    };

    // ==========================================================================
    // [Sección 09] BUCLE DE RENDIMIENTO FIJACIÓN Y REDES DE RENDER CONTINUO
    // ==========================================================================
    const actualizarFisicasOculares = () => {
        if (estadoActual === 'TERMINAL') return; // Interrupción crítica si el servidor corre

      // MIRADA CLAVADA DE DESDÉN: Si el usuario ofendió a la entidad, las pupilas 
        // se clavan fijas como hilos verticales centrados debajo del párpado negro
        if (estadoActual === 'HOSTIL') {
            currentWidth = 0.20; // Línea vertical perfectamente recta
            currentConvergence = 0.0; 

            // Renderizado estático de la pupila ocupando el área visible inferior (y="3.4" a "4.0")
            irisIzq.setAttribute('width', currentWidth.toString());
            irisIzq.setAttribute('height', '0.60');
            irisIzq.setAttribute('x', (2.4 + currentConvergence).toString());
            irisIzq.setAttribute('y', '3.40');
            
            irisDer.setAttribute('width', currentWidth.toString());
            irisDer.setAttribute('height', '0.60');
            irisDer.setAttribute('x', (5.4 + currentConvergence).toString());
            irisDer.setAttribute('y', '3.40');
            
            requestAnimationFrame(actualizarFisicasOculares);
            return; 
        }

        // Ejecución normal de físicas LERP fluidas
        const factorSuavizado = estaEnZonaActiva ? 0.72 : 0.18;
        currentX += (targetX - currentX) * factorSuavizado;
        currentY += (targetY - currentY) * factorSuavizado;
        
        const targetWidth = estaSobreLaNariz ? 0.55 : 0.20;
        const targetHeight = estaSobreLaNariz ? 0.55 : 1.00;
        const targetConvergence = estaSobreLaNariz ? 0.18 : 0.00; 
        
        currentWidth += (targetWidth - currentWidth) * 0.35; 
        currentHeight += (targetHeight - currentHeight) * 0.11; 
        currentConvergence += (targetConvergence - currentConvergence) * 0.22;
        
        const posicionXIzq = 2.0 + (0.5 - currentWidth / 2) + currentX + currentConvergence;
        const posicionXDer = 5.0 + (0.5 - currentWidth / 2) + currentX - currentConvergence;
        const posicionYCentrada = 3.5 - (currentHeight / 2) + currentY;

        irisIzq.setAttribute('width', currentWidth.toString());
        irisIzq.setAttribute('height', currentHeight.toString());
        irisIzq.setAttribute('x', posicionXIzq.toString());
        irisIzq.setAttribute('y', posicionYCentrada.toString());
        
        irisDer.setAttribute('width', currentWidth.toString());
        irisDer.setAttribute('height', currentHeight.toString());
        irisDer.setAttribute('x', posicionXDer.toString());
        irisDer.setAttribute('y', posicionYCentrada.toString());
        
        requestAnimationFrame(actualizarFisicasOculares);
    };

    // Activación de escuchadores de entorno globales
    window.addEventListener('mousemove', rastrearCursor);
    window.addEventListener('touchmove', rastrearCursor, { passive: true });
    
    // Encendido inicial del bucle biomecánico
    requestAnimationFrame(actualizarFisicasOculares);
}