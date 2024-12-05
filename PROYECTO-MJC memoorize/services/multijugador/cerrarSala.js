document.addEventListener('DOMContentLoaded', () => {
    const btnSalirSala = document.getElementById('btnSalirSala');

    if (btnSalirSala) {
        btnSalirSala.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la redirección inmediata

            fetch('../../resources/multijugador/cerrarSala.php', { // Ajusta la ruta si es necesario
                method: 'POST',
                credentials: 'include', // Incluye cookies de sesión
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Respuesta al cerrar sala:', data);
                    // Redirige al usuario después de cerrar la sala
                    window.location.href = btnSalirSala.href;
                })
                .catch(error => {
                    console.error('Error al cerrar la sala:', error);
                    // Redirigir incluso si ocurre un error
                    window.location.href = btnSalirSala.href;
                });
        });
    } else {
        console.error("El botón 'btnSalirSala' no se encontró en el DOM.");
    }
});
