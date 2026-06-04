(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){e.innerHTML=`
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
    `;let t=e.querySelector(`#archivo-conexion-gaia`),n=e.querySelector(`#ventana-mensaje-retro`),r=e.querySelector(`#cerrar-ventana-retro`),i=e.querySelector(`#texto-autor-retro`);t.addEventListener(`click`,()=>{n.style.display!==`block`&&(n.style.display=`block`,i.innerHTML=``,a(0))}),r.addEventListener(`click`,e=>{e.stopPropagation(),n.style.display=`none`});function a(e){if(e<417){let t=`[ CONNECTIVITY PROTOCOL ESTABLISHED ]
⏣ ⎈ ⍎ ⍕ ⍙ ⍚ ⍛ ⍜
------------------------------------
ORIGEN: PLANETA GAIA // CORE MATE
DESTINO: PLANETA TIERRA // TERMINAL ZRC

> DESCIFRANDO ENLACE DE DATOS...
> TRADUCCIÓN COMPLETADA CON ÉXITO:

"Los canales de biomasa cuántica se han estabilizado. El puente entre dimensiones se mantiene firme. No estamos aislados en la red."

> zrc_root: puente_activo // frecuencia_estable.`.charAt(e);i.innerHTML+=t===`
`?`<br>`:t,setTimeout(()=>a(e+1),30)}}}function t(t){t.innerHTML=`
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
    `;let n=t.querySelector(`#boot-progress-fill`),r=t.querySelector(`#boot-porcentaje-num`),i=t.querySelector(`#log-panic`),a=0,o=setInterval(()=>{a+=Math.floor(Math.random()*3)+2,a>100&&(a=100),r.innerText=a,n.style.width=a+`%`,a>=40&&i&&(i.style.display=`block`),a>=100&&(clearInterval(o),setTimeout(()=>{let n=t.querySelector(`#pantalla-terminal-zrc`);n&&(n.style.opacity=`0`),setTimeout(()=>{e(t)},800)},1e3))},80)}function n(e){let n=`ESPERA`,r=0,i=0,a=0,o=0,s=.2,c=1,l=0,u=!1,d=!1;e.innerHTML=`
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
    `;let f=e.querySelector(`#iris-izq`),p=e.querySelector(`#iris-der`),m=e.querySelector(`#base-izq`),h=e.querySelector(`#base-der`);e.querySelector(`#mask-rect-izq`),e.querySelector(`#mask-rect-der`);let g=e.querySelector(`#gato-interactivo`),_=e.querySelector(`#caja-dialogo-nodo`),v=e.querySelector(`#pantalla-blanca`),y=e.querySelector(`#brand-text`);function b(){n===`ESPERA`&&(n=`DIALOGO`,_.innerHTML=`
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
        `,setTimeout(()=>{let t=e.querySelector(`#texto-typing`),n=e.querySelector(`#tarjeta-dialogo-3d`),r=e.querySelector(`#bunker-estatico-3d`);t&&n&&r&&(t.innerText=`᚛ Qué criatura tan osada. Interrumpir la frecuencia de un señor gato... Asumiré que no te presentas con las manos vacías. Confío en que, al menos, tuviste la decencia de traer algo para mi deleite, ¿verdad?`,n.insertAdjacentHTML(`beforeend`,`
                    <div class="cara-dual cara-posterior" id="opciones-nodo">
                        <button class="btn-opcion-hud" id="opcion-a">
                            ᚛ Sí. Supongo que traje algo.
                        </button>
                        <button class="btn-opcion-hud" id="opcion-b">
                            ᚛ No. No sé qué esperas de mí.
                        </button>
                    </div>
                `),n.addEventListener(`mousemove`,function(e){let t=r.getBoundingClientRect(),i=e.target.closest(`.btn-opcion-hud`);if(n.classList.contains(`estado-volteado`)){if(i){n.classList.remove(`tilt-izquierda`);return}e.clientX>=t.left&&e.clientX<=t.left+50?n.classList.add(`tilt-izquierda`):n.classList.remove(`tilt-izquierda`)}else e.clientX>=t.left+t.width/2?n.classList.add(`tilt-derecha`):n.classList.remove(`tilt-derecha`)}),n.addEventListener(`mouseleave`,function(){n.classList.remove(`tilt-derecha`,`tilt-izquierda`)}),n.addEventListener(`click`,function(e){let t=r.getBoundingClientRect(),i=e.target.closest(`.btn-opcion-hud`);if(n.classList.contains(`estado-volteado`)){let r=e.clientX>=t.left&&e.clientX<=t.left+50;!i&&r&&n.classList.remove(`estado-volteado`,`tilt-izquierda`)}else e.clientX>=t.left+t.width/2&&(n.classList.add(`estado-volteado`),n.classList.remove(`tilt-derecha`),x())}))},2400))}g.addEventListener(`click`,b);function x(){e.querySelector(`#opcion-a`).addEventListener(`click`,S),e.querySelector(`#opcion-b`).addEventListener(`click`,C)}function S(){n=`TERMINAL`,_.innerHTML=``,v.style.backgroundColor=`#00ff55`,setTimeout(()=>{v.style.backgroundColor=``,t(e)},80)}function C(){n=`HOSTIL`,m.classList.add(`furia-roja`),h.classList.add(`furia-roja`),f.classList.add(`furia-roja`),p.classList.add(`furia-roja`),y.classList.add(`modo-terminal`),v.classList.add(`modo-hostil-rojo`),e.querySelector(`.contenedor-katt`).insertAdjacentHTML(`afterbegin`,`
    <div class="contenedor-candado-denegado">
        <div class="icono-candado">🔒</div>
        <div class="texto-denegado-branding">ACCESO</div>
        <div class="texto-denegado-branding">DENEGADO</div>
    </div>
`);let t=e.querySelector(`#corte-ojo-izq`),r=e.querySelector(`#corte-ojo-der`);t.innerHTML=`<rect x="2" y="3" width="1" height="1" />`,r.innerHTML=`<rect x="5" y="3" width="1" height="1" />`,m.setAttribute(`y`,`3`),m.setAttribute(`height`,`1`),h.setAttribute(`y`,`3`),h.setAttribute(`height`,`1`);let i=document.createElementNS(`http://www.w3.org/2000/svg`,`rect`);i.setAttribute(`x`,`2`),i.setAttribute(`y`,`3`),i.setAttribute(`width`,`1`),i.setAttribute(`height`,`0.4`),i.setAttribute(`fill`,`#000000`),i.setAttribute(`id`,`parpado-negro-izq`);let a=document.createElementNS(`http://www.w3.org/2000/svg`,`rect`);a.setAttribute(`x`,`5`),a.setAttribute(`y`,`3`),a.setAttribute(`width`,`1`),a.setAttribute(`height`,`0.4`),a.setAttribute(`fill`,`#000000`),a.setAttribute(`id`,`parpado-negro-der`),g.appendChild(i),g.appendChild(a);let o=e.querySelector(`#opciones-nodo`);o&&o.remove();let s=e.querySelector(`.dialogo-terminal`);if(s.classList.add(`viñeta-holografica`),s){s.classList.add(`estado-narrador`),s.innerHTML=`
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
            `;let e=s.querySelector(`#narrador-clicks`),t=s.querySelector(`#texto-consola`),n=s.querySelector(`#click-prompt`),r=s.querySelector(`#zona-puerta-terminal`),i=[`[ Z_KATT te mira en completo silencio. ]`,`[ Sus ojos reflejan decepción y una total indiferencia. Se siente insultado. ]`,`[ Está esperando una disculpa sincera de tu parte, y en el fondo sabes que la única manera de salir de aquí es alimentándolo. ]`],a=0;function o(){e.style.pointerEvents=`none`,t.innerHTML=``;let o=i[a].split(` `),c=0;function l(){c<o.length?(t.innerHTML+=(c===0?``:` `)+o[c],c++,setTimeout(l,45)):(e.style.pointerEvents=`auto`,a===i.length-1&&(n.style.display=`none`,e.style.cursor=`default`,r.style.display=`block`,s.querySelector(`#opcion-redencion`).addEventListener(`click`,S)))}l()}e.addEventListener(`click`,()=>{a<i.length-1&&(a++,o())}),c();function c(){setTimeout(()=>{o()},400)}}}let w=e=>{if(n===`TERMINAL`||n===`HOSTIL`)return;let t=e.touches?e.touches[0].clientX:e.clientX,a=e.touches?e.touches[0].clientY:e.clientY,o=window.innerWidth,s=window.innerHeight,c=o/5,l=o/5*4,f=o/2,p=s/2,m=(t-f)/f,h=(a-p)/p,_=g.getBoundingClientRect(),v=t>=_.left+_.width*.35&&t<=_.left+_.width*.65,y=a>=_.top+_.height*.35&&a<=_.top+_.height*.65;t>=c&&t<=l?(u=!0,v&&y?(d=!0,r=m*.02,i=h*.5):(d=!1,r=m*.3,i=h*.4)):(d=!1,u=!1,r=0,i=0)},T=()=>{if(n===`TERMINAL`)return;if(n===`HOSTIL`){s=.2,l=0,f.setAttribute(`width`,s.toString()),f.setAttribute(`height`,`0.60`),f.setAttribute(`x`,(2.4+l).toString()),f.setAttribute(`y`,`3.40`),p.setAttribute(`width`,s.toString()),p.setAttribute(`height`,`0.60`),p.setAttribute(`x`,(5.4+l).toString()),p.setAttribute(`y`,`3.40`),requestAnimationFrame(T);return}let e=u?.72:.18;a+=(r-a)*e,o+=(i-o)*e;let t=d?.55:.2,m=d?.55:1,h=d?.18:0;s+=(t-s)*.35,c+=(m-c)*.11,l+=(h-l)*.22;let g=2+(.5-s/2)+a+l,_=5+(.5-s/2)+a-l,v=3.5-c/2+o;f.setAttribute(`width`,s.toString()),f.setAttribute(`height`,c.toString()),f.setAttribute(`x`,g.toString()),f.setAttribute(`y`,v.toString()),p.setAttribute(`width`,s.toString()),p.setAttribute(`height`,c.toString()),p.setAttribute(`x`,_.toString()),p.setAttribute(`y`,v.toString()),requestAnimationFrame(T)};window.addEventListener(`mousemove`,w),window.addEventListener(`touchmove`,w,{passive:!0}),requestAnimationFrame(T)}function r(e){n(e)}r(document.getElementById(`app`));