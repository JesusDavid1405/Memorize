var audio = document.getElementById('miCancion');
var playButton = document.getElementById('playButton');
var isPlaying = false

playButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playButton.textContent = 'Reproducir Música';
    } else {
        audio.play();
        playButton.textContent = 'Pausar Música';
    }
    isPlaying = !isPlaying;
});