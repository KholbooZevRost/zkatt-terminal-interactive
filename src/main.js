// 1. Importamos a nuestro director desde App.js
import { iniciarApp } from './App.js';

// 2. Buscamos el "terreno vacío" en tu HTML (el div con id "app")
const contenedorPrincipal = document.getElementById('app');

// 3. Le entregamos el terreno al director para que haga su trabajo
iniciarApp(contenedorPrincipal);