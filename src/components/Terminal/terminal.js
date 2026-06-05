import './terminal.css'; // <- ESTA ES LA LÍNEA QUE FALTABA PARA DARLE EL ESTILO RETRO COMA A COMPUTADORA
import { iniciarComponenteEscritorio } from '../Escritorio/escritorio.js';

export function iniciarComponenteTerminal(contenedorMaestro) {
    // SOLUCIÓN CRÍTICA: Al asignar con '=', eliminamos por completo al gato 
    // y al texto "Z.KATT // KOBLET" del DOM antes de pintar la terminal.
    contenedorMaestro.innerHTML = `
        <div id="pantalla-terminal-zrc">
            <div class="crt-scanlines-gris"></div>
            <div class="interfaz-boot">
                <div class="logo-z">Z</div>
                <div class="subtitulo-zrc">ZRC OPERATING SYSTEM</div>
                
                <div class="barra-carga-retro-container">
                    <div class="barra-carga-retro-fill" id="boot-progress-fill"></div>
                    <div class="rejilla-bloques">
                        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                </div>

                <div class="logs-boot-container">
                    <p class="linea-boot">> ENLACE INTERCEPTADO <span class="cursor-blink">_</span></p>
                    <p class="linea-boot">> S.O. VANGUARDIA: LOCALIZANDO PUNTO DE ANCLAJE...</p>
                    <p class="linea-boot panic-text" id="log-panic" style="display: none;">[KERNEL_PANIC]: STACK_OVERFLOW</p>
                </div>

                <div class="porcentaje-boot"><span id="boot-porcentaje-num">0</span>%</div>
            </div>
        </div>
    `;

    const progressFill = contenedorMaestro.querySelector('#boot-progress-fill');
    const porcentajeNum = contenedorMaestro.querySelector('#boot-porcentaje-num');
    const logPanic = contenedorMaestro.querySelector('#log-panic');

    let progreso = 0;
    const intervaloBoot = setInterval(() => {
        // Incremento constante para emular la barra antigua
        progreso += Math.floor(Math.random() * 3) + 2;
        if (progreso > 100) progreso = 100;

        if (porcentajeNum) porcentajeNum.innerText = progreso;
        if (progressFill) progressFill.style.width = progreso + "%";

        // Activamos el Kernel Panic exactamente cuando pasa el 40%
        if (progreso >= 40 && logPanic) {
            logPanic.style.display = 'block';
        }

        if (progreso >= 100) {
            clearInterval(intervaloBoot);
            setTimeout(() => {
                const pantallaTerminal = contenedorMaestro.querySelector('#pantalla-terminal-zrc');
                if (pantallaTerminal) pantallaTerminal.style.opacity = '0';
                
                setTimeout(() => {
                    iniciarComponenteEscritorio(contenedorMaestro);
                }, 800);
            }, 1000);
        }
    }, 80); 
}