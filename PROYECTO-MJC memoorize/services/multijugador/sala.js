let displaySala = document.getElementById('configuraciones');

// Variable para almacenar el último valor de `cupo`
let ultimoCupo = null;

// Función para obtener datos de la sala y detectar cambios
function actualizarSala() {
    fetch('../../../resources/multijugador/sala.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id: '' // Envía el ID necesario para identificar la sala
        })
    })
    .then(response => response.json())
    .then(data => {
        const nuevoCupo = data[0].cupo; // Nuevo valor retornado del servidor

        // Verifica si hay un cambio en el valor de `cupo`
        if (nuevoCupo !== ultimoCupo) {
            console.log(`Nuevo cupo detectado: ${nuevoCupo}`); // Imprime el nuevo valor
            ultimoCupo = nuevoCupo; // Actualiza el valor almacenado

            // Actualiza el contenido HTML
            displaySala.innerHTML = `
                <p><strong>Sala:</strong> ${data[0].nombre || 'No disponible'}</p>
                <p><strong>código:</strong> ${data[0].codigo || 'No disponible'}</p>
                <p><strong>Dificultad:</strong> ${data[0].dificultad || 'No disponible'}</p>
                <p><strong>Rondas:</strong> ${data[0].rondas || 'No disponible'}</p>
                <p><strong>Capacidad:</strong> ${nuevoCupo}/${data[0].capacidad || 'No disponible'}</p>
            `;
        }
    })
    .catch(error => console.error('Error:', error));

    let displayParticipantes = document.getElementById('players')

    fetch('../../../resources/multijugador/participantes.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id: '' // Envía el ID necesario para identificar la sala
        })
    })
    .then(response => response.json())
    .then(data => {
        displayParticipantes.innerHTML = '';
        
        data.forEach(element => {
            displayParticipantes.innerHTML+=`
            <div class="avatar" title="Avatar 1">
                <img src="../../../img/avatar/${element.imagen}" alt="Avatar 1">
                <div class="avatar-name">${element.nickName}</div>
            </div>
            `;
        });
    })
    .catch(error => console.error('Error:', error));
}

setInterval(actualizarSala, 5000);

actualizarSala();


