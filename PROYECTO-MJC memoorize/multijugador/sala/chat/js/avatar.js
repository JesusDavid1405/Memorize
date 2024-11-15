document.addEventListener('DOMContentLoaded', function() {
    // Obtener el número de personas
    const numeroPersonas = parseInt(localStorage.getItem('numeroPersonas')) || 1;

    // Contenedor de jugadores
    const playersContainer = document.getElementById('players');

    // Limpiar cualquier avatar existente (en caso de recarga)
    playersContainer.innerHTML = '';

    // Crear los avatares de acuerdo al número de personas
    for (let i = 1; i <= numeroPersonas; i++) {
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('avatar');
        avatarDiv.title = `Avatar ${i}`;

        // Crear la imagen del avatar
        const avatarImg = document.createElement('img');
        avatarImg.src = `../../img/icon/avatar${i}.png`;  // Ruta de la imagen
        avatarImg.alt = `Avatar ${i}`;

        // Crear el nombre del jugador
        const avatarName = document.createElement('div');
        avatarName.classList.add('avatar-name');
        avatarName.textContent = `Jugador ${i}`;

        // Agregar imagen y nombre al contenedor del avatar
        avatarDiv.appendChild(avatarImg);
        avatarDiv.appendChild(avatarName);

        // Añadir el avatar al contenedor de jugadores
        playersContainer.appendChild(avatarDiv);
    }
});
