import { iniciarApp } from './App.js';

const contenedorPrincipal = document.getElementById('app');

if (contenedorPrincipal) {
    iniciarApp(contenedorPrincipal);
} else {
    console.error("No se encontró el contenedor con id 'app'");
}