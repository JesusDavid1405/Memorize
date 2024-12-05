// Actualizar el contenido en el elemento configuraciones
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

    // Manejar el evento del botón "Jugar" solo si existe
    const btnJugar = document.getElementById('jugar');
    if (btnJugar) {
        btnJugar.addEventListener('click', function() {
            const message = document.getElementById('joiningMessage');
            message.style.display = 'flex'; 

            setTimeout(() => {
                message.style.display = 'none';
                window.location.href = '../../../juego3/index.html'; 
            }, 1000); 
        });
    }
};
