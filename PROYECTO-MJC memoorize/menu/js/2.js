document.addEventListener('DOMContentLoaded', () => {
        const playerName = localStorage.getItem('playerName') || 'Jugador 1';
        const totalScore = localStorage.getItem('totalScore') || '0';
        const personalInfo = localStorage.getItem('personalInfo') || '';
        const avatarSrc = localStorage.getItem('avatarSrc') || '../img/avatar1.png';

        // Mostrar información cargada
        document.getElementById('playerName').innerText = playerName;
        document.getElementById('totalScore').innerText = totalScore;
        document.getElementById('personalInfoDisplay').innerText = personalInfo;
        document.getElementById('avatar2').src = avatarSrc;

        // Cargar los avatares
        const avatarOptions = document.querySelectorAll('.avatar-option2');
        avatarOptions.forEach(avatar => {
            avatar.addEventListener('click', () => {
                // Cambiar el avatar seleccionado
                const selectedAvatarSrc = avatar.getAttribute('data-avatar');
                document.getElementById('avatar2').src = selectedAvatarSrc;
                localStorage.setItem('avatarSrc', selectedAvatarSrc); // Guardar en localStorage
            });
        });
    });

    // Guardar cambios de perfil
    document.getElementById('saveUsername').addEventListener('click', () => {
        const newUsername = document.getElementById('newUsername').value;
        const personalInfo = document.getElementById('personalInfo').value;

        // Guardar en localStorage
        localStorage.setItem('playerName', newUsername);
        localStorage.setItem('personalInfo', personalInfo);
        
        // Actualizar la interfaz
        document.getElementById('playerName').innerText = newUsername;
        document.getElementById('personalInfoDisplay').innerText = personalInfo;

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        modal.hide();
    });

