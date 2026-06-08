// main.js - Capa de Presentación (Lógica de UI) [cite: 485, 486]
import recuperarMotos, { guardarMotos } from './storage.js';

// Estado global alimentado por nuestra persistencia
let inventario = recuperarMotos();

// Referencias de la interfaz
const formulario = document.getElementById('moto-form');
const inputModelo = document.getElementById('modelo');
const inputPrecio = document.getElementById('precio');
const contenedorInventario = document.getElementById('inventario-container');
const displayTotalMotos = document.getElementById('total-motos');
const displayValorInversion = document.getElementById('valor-inversion');

/**
 * Renderizado Seguro y Procesamiento Cíclico Avanzado [cite: 521, 522]
 */
const renderizarInterfaz = () => {
    // 1. PROCESAMIENTO CÍCLICO: .forEach() para el cálculo de variables acumuladoras 
    let valorTotalInversion = 0;
    inventario.forEach((moto) => {
        valorTotalInversion += parseFloat(moto.precio);
    });

    // 2. TRANSFORMACIÓN: .map() para convertir objetos de datos en nodos del DOM 
    const tarjetasHTML = inventario.map((moto, index) => {
        // Cálculo exacto del 15% de IVA exigido [cite: 525, 551]
        const precioBase = parseFloat(moto.precio);
        const precioFinal = precioBase + (precioBase * 0.15); // [cite: 551]

        // Construcción limpia y segura con createElement (Evita XSS) [cite: 523, 529, 532]
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('moto-card');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-moto');

        const titulo = document.createElement('h4');
        titulo.textContent = moto.modelo;

        const precioTexto = document.createElement('p');
        precioTexto.textContent = Precio + IVA (15%): $${precioFinal.toFixed(2)}; // [cite: 551]

        // Botón de eliminación interactiva [cite: 526, 554, 555]
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.textContent = 'Eliminar';

        // Evento individual mapeado por índice [cite: 534, 555]
        btnEliminar.addEventListener('click', () => {
            inventario.splice(index, 1); // 1. Remover del arreglo [cite: 558]
            guardarMotos(inventario);   // 2. Sincronizar storage [cite: 561]
            renderizarInterfaz();       // 3. Limpiar y refrescar pantalla [cite: 563, 564]
        });

        // Ensamblaje estructural de elementos [cite: 540, 541]
        infoDiv.appendChild(titulo);
        infoDiv.appendChild(precioTexto);
        tarjeta.appendChild(infoDiv);
        tarjeta.appendChild(btnEliminar);

        return tarjeta; // Retorna el nodo DOM completo listo para ser insertado [cite: 548]
    });

    // 3. LIMPIEZA TOTALMENTE SEGURA: Eliminamos nodos hijos sin usar innerHTML destructivo [cite: 530]
    while (contenedorInventario.firstChild) {
        contenedorInventario.removeChild(contenedorInventario.firstChild);
    }

    // 4. INYECCIÓN DINÁMICA: Insertar los elementos DOM generados por el mapa [cite: 541, 548]
    tarjetasHTML.forEach(tarjetaNodo => {
        contenedorInventario.appendChild(tarjetaNodo); // [cite: 541]
    });

    // 5. ACTUALIZACIÓN DE MÉTRICAS EN TIEMPO REAL [cite: 441, 515]
    displayTotalMotos.textContent = inventario.length;
    displayValorInversion.textContent = $${valorTotalInversion.toFixed(2)};
};

/**
 * Escuchador del Formulario de Captura [cite: 433, 505, 506]
 */
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Detiene la recarga nativa de la página

    const modeloValor = inputModelo.value.trim();
    const precioValor = inputPrecio.value.trim();

    // Validación rigurosa de campos vacíos [cite: 436, 508, 509]
    if (modeloValor === '' || precioValor === '') return;

    // Mutación e inclusión del nuevo objeto al arreglo de datos [cite: 342, 511, 512]
    inventario.push({
        modelo: modeloValor,
        precio: precioValor
    });

    guardarMotos(inventario); // Sincroniza con localStorage [cite: 561]
    formulario.reset();       // Blanquea los inputs de la interfaz
    renderizarInterfaz();     // Re-renderiza con el nuevo elemento integrado [cite: 514, 515]
});

// Inicialización de la pantalla en la primera carga [cite: 499, 503]
renderizarInterfaz();