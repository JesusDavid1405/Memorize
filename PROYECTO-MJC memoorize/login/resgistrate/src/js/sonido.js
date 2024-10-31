var audio = document.getElementById('miCancion');
var playButton = document.getElementById('playButton');
var isPlaying = false

playButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = `<img class="imgSonido" src="../../img/icon/noSonido.png" alt="">`;
    } else {
        audio.play();
        playButton.innerHTML =  `<img class="imgSonido" src="../../img/icon/sonido.png" alt="">`;
    }
    isPlaying = !isPlaying;
});

const sound = new Audio('../../audio/notification-sound-7062.mp3');
document.querySelector('#formulario').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('img').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});

document.querySelector('.logoForm img').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});

document.querySelector('#playButton').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('.imgSonido').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('.logoRedes').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('.facebook').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('.gitHub').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('.email').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('.textCrear').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('a').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});