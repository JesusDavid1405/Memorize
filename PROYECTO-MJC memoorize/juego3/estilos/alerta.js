function showExitWarningModal() {
    document.getElementById('exitWarningModal').style.display = 'flex';
}

function hideExitWarningModal() {
    document.getElementById('exitWarningModal').style.display = 'none';
}
function toggleButtons() {
    const buttonContainer = document.querySelector('.button-container');
    if (buttonContainer.style.display === 'none' || buttonContainer.style.display === '') {
        buttonContainer.style.display = 'flex';
    } else {
        buttonContainer.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('musicButton');
    const musicIcon = musicButton.querySelector('img');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeControl = document.getElementById('volumeControl');
    let isPlaying = false;

    musicButton.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.src = "../img/musica.png";  
        } else {
            backgroundMusic.play().catch(error => {
                console.error("Error al intentar reproducir la música:", error);
            });
            musicIcon.src = "../img/nomusica.png";
        }
        isPlaying = !isPlaying;
    });
    volumeControl.addEventListener('input', function() {
        backgroundMusic.volume = volumeControl.value; 
    });


    backgroundMusic.volume = volumeControl.value; 
});
const sound = new Audio('../audio/notification-sound-7062.mp3');

// Reproducir el sonido 
document.querySelectorAll('.card, .card-front, .menu .oculto, .button, .card-back, .board, .card.flipped, .modal, .win, .avatar-option, .avatar-option2').forEach(element => {
    element.addEventListener('mouseenter', () => {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.error('Error al reproducir el sonido:', error);
        });
    });
});

