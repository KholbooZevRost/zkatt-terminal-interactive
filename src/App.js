import { iniciarComponenteGato } from './components/Gato/gato.js';

export function iniciarApp(contenedor) {
    const divGato = document.createElement('div');
    contenedor.appendChild(divGato);
    iniciarComponenteGato(divGato);
}