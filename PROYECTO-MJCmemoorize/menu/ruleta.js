// Función para abrir el modal
function openModal() {
    document.getElementById("modalRuleta").style.display = "flex";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("modalRuleta").style.display = "none";
}

// Función para girar la ruleta
function girarRuleta() {
    const ruleta = document.getElementById("ruleta");
    const resultado = document.getElementById("resultado");

    // Genera un ángulo aleatorio para que la ruleta se detenga en un punto específico
    const totalSegmentos = 8;
    const gradosPorSegmento = 360 / totalSegmentos;
    const aleatorio = Math.floor(Math.random() * totalSegmentos); // Elige un segmento aleatorio
    const anguloDetencion = 360 * 5 + aleatorio * gradosPorSegmento; // Gira 5 vueltas completas

    ruleta.style.transform = `rotate(${anguloDetencion}deg)`;

    // Determina el premio al que apunta el indicador
    setTimeout(() => {
        const premio = `Premio ${aleatorio + 1}`;
        resultado.textContent = `¡Felicidades! Ganaste: ${premio}`;
    }, 4000); // Tiempo coincide con la duración de la animación
}

// Cierra el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("modalRuleta");
    if (event.target === modal) {
        closeModal();
    }
}
