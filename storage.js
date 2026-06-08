// storage.js - Capa de Acceso a Datos (Persistencia) [cite: 482, 483]

/**
 * Guarda el arreglo serializado en el almacenamiento persistente [cite: 495, 496]
 */
export const guardarMotos = (motos) => {
    localStorage.setItem('inventario_motos', JSON.stringify(motos)); // [cite: 496]
};

/**
 * Recupera y deserializa los datos al iniciar la aplicación [cite: 498, 499]
 */
export default () => {
    const data = localStorage.getItem('inventario_motos'); // [cite: 499]
    return data ? JSON.parse(data) : []; // [cite: 499]
};