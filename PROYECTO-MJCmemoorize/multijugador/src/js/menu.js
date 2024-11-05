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

