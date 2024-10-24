document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('musicButton');
    const musicIcon = musicButton.querySelector('img');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;
    
    musicButton.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.src = "../img/musica.png";  
        } else {
            backgroundMusic.play();
            musicIcon.src = "../img/nomusica.png";
        }
        isPlaying = !isPlaying;
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        const music = document.getElementById('backgroundMusic');
        const volumeControl = document.getElementById('volumeControl');
        music.volume = 0.5;  
        volumeControl.addEventListener('input', function() {
            music.volume = volumeControl.value;
        });
    });
    const sound = new Audio('../audio/notification-sound-7062.mp3');

    // Reproducir el sonido 
    document.querySelectorAll('.play-button, .back-button, .tienda .btn, .coin, .play-button2, #playButton, #musicButton, .game-image, #soundButton, .imgSonido, .avatar-option, .avatar-option2').forEach(element => {
        element.addEventListener('mouseenter', () => {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.error('Error al reproducir el sonido:', error);
            });
        });
    });
    function updateCoinCount(newCount) {
        document.getElementById('coin-count').innerText = newCount;
      }
      updateCoinCount(12000);