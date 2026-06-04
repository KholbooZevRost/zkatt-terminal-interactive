import './escritorio.css';

export function iniciarComponenteEscritorio(contenedorMaestro) {
    // Montamos la interfaz de escritorio clásico estilo Windows 95 / OS Alienígena
    contenedorMaestro.innerHTML = `
        <div id="pantalla-escritorio-retro">
            <div class="crt-scanlines-escritorio"></div>
            
            <div class="grid-escritorio">
                <div class="nodo-carpeta" id="archivo-conexion-gaia">
                    <div class="icon-folder"></div>
                    <span>GAIA_DATA.txt</span>
                </div>
            </div>

            <div id="ventana-mensaje-retro" style="display: none;">
                <div class="barra-titulo-ventana">
                    <span class="titulo-txt">GAIA_LINK_DECRYPTOR.EXE</span>
                    <button id="cerrar-ventana-retro">X</button>
                </div>
                <div class="cuerpo-ventana">
                    <p id="texto-autor-retro"></p>
                </div>
            </div>
        </div>
    `;

    const archivoGaia = contenedorMaestro.querySelector('#archivo-conexion-gaia');
    const ventanaMensaje = contenedorMaestro.querySelector('#ventana-mensaje-retro');
    const cerrarBtn = contenedorMaestro.querySelector('#cerrar-ventana-retro');
    const textoAutor = contenedorMaestro.querySelector('#texto-autor-retro');

    // Mensaje de lore cifrado/descifrado que unifica ambos mundos
    const mensajeGaia = `[ CONNECTIVITY PROTOCOL ESTABLISHED ]\n⏣ ⎈ ⍎ ⍕ ⍙ ⍚ ⍛ ⍜\n------------------------------------\nORIGEN: PLANETA GAIA // CORE MATE\nDESTINO: PLANETA TIERRA // TERMINAL ZRC\n\n> DESCIFRANDO ENLACE DE DATOS...\n> TRADUCCIÓN COMPLETADA CON ÉXITO:\n\n"Los canales de biomasa cuántica se han estabilizado. El puente entre dimensiones se mantiene firme. No estamos aislados en la red."\n\n> zrc_root: puente_activo // frecuencia_estable.`;

    // Abrir ventana al hacer click sobre el archivo de texto
    archivoGaia.addEventListener('click', () => {
        if (ventanaMensaje.style.display !== 'block') {
            ventanaMensaje.style.display = 'block';
            textoAutor.innerHTML = ''; 
            escribirEfectoMaquina(0);
        }
    });

    // Cerrar la ventana del sistema operativo
    cerrarBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click interactúe con el fondo del escritorio
        ventanaMensaje.style.display = 'none';
    });

    // Tu función nativa antigua de máquina de escribir adaptada de forma modular
    function escribirEfectoMaquina(indice) {
        if (indice < mensajeGaia.length) {
            let caracter = mensajeGaia.charAt(indice);
            textoAutor.innerHTML += (caracter === '\n') ? '<br>' : caracter;
            setTimeout(() => escribirEfectoMaquina(indice + 1), 30);
        }
    }
}