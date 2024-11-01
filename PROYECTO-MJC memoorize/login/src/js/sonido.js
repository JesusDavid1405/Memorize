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
document.querySelector('.btnLogin').addEventListener('mouseenter', () => {
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
<<<<<<< HEAD
document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordField = document.getElementById("contraseñaLogin");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.src = "../img/icon/password.png"; // Cambia al icono de ojo abierto
    } else {
        passwordField.type = "password";
        eyeIcon.src = "../img/icon/candado1.png"; // Cambia al icono de contraseña cerrado
    }
});
=======
>>>>>>> 4256f72e766f7249d879250eddccbff65d440012
