import './escritorio.css';

export function iniciarComponenteEscritorio(contenedorMaestro) {
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

    const mensajeGaia = `[ CONNECTIVITY PROTOCOL ESTABLISHED ]\n⏣ ⎈ ⍎ ⍕ ⍙ ⍚ ⍛ ⍜\n------------------------------------\nORIGEN: PLANETA GAIA // CORE MATE\nDESTINO: PLANETA TIERRA // TERMINAL ZRC\n\n> DESCIFRANDO ENLACE DE DATOS...\n> TRADUCCIÓN COMPLETADA CON ÉXITO:\n\n"Los canales de biomasa cuántica se han estabilizado. El puente entre dimensiones se mantiene firme. No estamos aislados en la red."\n\n> zrc_root: puente_activo // frecuencia_estable.`;

    if (archivoGaia) {
        archivoGaia.addEventListener('click', () => {
            if (ventanaMensaje && ventanaMensaje.style.display !== 'block') {
                ventanaMensaje.style.display = 'block';
                if (textoAutor) textoAutor.innerHTML = ''; 
                escribirEfectoMaquina(0);
            }
        });
    }

    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (ventanaMensaje) ventanaMensaje.style.display = 'none';
        });
    }

    function escribirEfectoMaquina(indice) {
        if (textoAutor && indice < mensajeGaia.length) {
            let caracter = mensajeGaia.charAt(indice);
            textoAutor.innerHTML += (caracter === '\n') ? '<br>' : caracter;
            setTimeout(() => escribirEfectoMaquina(indice + 1), 30);
        }
    }
}