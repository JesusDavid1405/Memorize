var audio = document.getElementById('miCancion');
var playButton = document.getElementById('playButton');
var isPlaying = false

playButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = `<img class="imgSonido" src="../img/musica.png" alt="">`;
    } else {
        audio.play();
        playButton.innerHTML =  `<img class="imgSonido" src="../img/nomusica.png" alt="">`;
    }
    isPlaying = !isPlaying;
});
const sound = new Audio('../audio/notification-sound-7062.mp3');


document.querySelector('.button2').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});

document.querySelector('.logo').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});

document.querySelector('.imgSonido').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
