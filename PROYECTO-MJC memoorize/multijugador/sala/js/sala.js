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

window.onload = async () => {
    await iniciarSala();
};

document.getElementById('jugar').addEventListener('click', function() {
    const message = document.getElementById('joiningMessage');
    message.style.display = 'flex'; 

    setTimeout(() => {
        message.style.display = 'none';
        window.location.href = '../../juego3/index.html'; 
    }, 1000); 
});

