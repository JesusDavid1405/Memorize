var audio = document.getElementById('miCancion');
var playButton = document.getElementById('playButton');
var isPlaying = false

playButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = `<img class="imgSonido" src="img/icon/noSonido.png" alt="">`;
    } else {
        audio.play();
        playButton.innerHTML =  `<img class="imgSonido" src="img/icon/sonido.png" alt="">`;
    }
    isPlaying = !isPlaying;
});
const sound = new Audio('audio/notification-sound-7062.mp3');

document.querySelector('.button2').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});

document.querySelector('.imgLogo').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});

document.querySelector('.imgSonido').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.querySelector('.avatar-container').addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
});
document.getElementById('toggleInfo').addEventListener('click', function() {
    var avatarContainer = document.getElementById('avatarContainer');
    avatarContainer.classList.toggle('active');
});
document.getElementById('.avatarContainer3').addEventListener('click', function() {
    var avatarContainer = document.getElementById('avatarContainer');
    avatarContainer.classList.toggle('active');
});
document.getElementById('avatar-image').addEventListener('click', function() {
    alert('¡Has hecho clic en el pez!');
});

document.getElementById('toggleInfo').addEventListener('click', function() {
    var avatarContainer = document.getElementById('avatarContainer2');
    avatarContainer.classList.toggle('active'); 
});
