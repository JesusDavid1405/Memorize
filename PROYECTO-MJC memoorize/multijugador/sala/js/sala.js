const rol = localStorage.getItem('rol');
const codigoSala = localStorage.getItem('codigo');
const nombreSala = localStorage.getItem('nombreSala');
const rondas = localStorage.getItem('rondas');
const dificultad = localStorage.getItem('dificultad');

let configuraciones = '';

// Configuración de texto dependiendo del rol
if (rol == 1) {
    configuraciones = `
        Dificultad: ${dificultad}<br><br>
        Rondas: ${rondas}<br><br>    
        Código: ${codigoSala}<br><br>
    `;
} else if (rol == 2) {
    configuraciones = `
        Dificultad: ${dificultad}<br>
        Rondas: ${rondas}<br>
        Código: ${codigoSala}
    `;
} else {
    configuraciones = 'Error: no se ha especificado un usuario.';
}

// Mostrar configuraciones
document.getElementById('configuraciones').innerHTML = configuraciones;

// Función para iniciar la sala
async function iniciarSala() {
    return new Promise((resolve) => {
        console.log('Iniciando la sala...');
        setTimeout(() => {
            console.log('Sala iniciada');
            resolve();
        }, 2000);
    });
}

// Iniciar la sala al cargar la página
window.onload = async () => {
    await iniciarSala();
};

// Evento para el botón "Jugar"

document.getElementById('jugar').addEventListener('click', function() {
    // Mostrar el mensaje
    const message = document.getElementById('joiningMessage');
    message.style.display = 'flex'; // Mostrar el mensaje

    // Ocultar el mensaje después de 1 segundo y redirigir
    setTimeout(() => {
        message.style.display = 'none';
        window.location.href = '../../juego3/index.html'; // Cambia la ruta si es necesario
    }, 1000); // 1000 ms = 1 second
});

