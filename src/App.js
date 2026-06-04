// 1. Traemos al gato desde su módulo (Asegúrate de que la ruta sea la correcta)
import { iniciarComponenteGato } from './components/Gato/gato.js';
// 2. Creamos la función directora y la exportamos
export function iniciarApp(contenedor) {
    
    // Por ahora, la única orden del director es arrancar el componente del gato
    // y dibujarlo dentro del contenedor que le demos.
    iniciarComponenteGato(contenedor);
    
}