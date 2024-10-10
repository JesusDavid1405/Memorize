    document.addEventListener('DOMContentLoaded', function() {
        const musicButton = document.getElementById('musicButton');
        const musicIcon = musicButton.querySelector('img');
        const backgroundMusic = document.getElementById('backgroundMusic');
        let isPlaying = false;
        musicButton.addEventListener('click', function() {
            if (isPlaying) {
                backgroundMusic.pause();
                musicIcon.src = "../img/icon/noSonido.png";
            } else {
                backgroundMusic.play();
                musicIcon.src = "../img/icon/sonido.png";
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
