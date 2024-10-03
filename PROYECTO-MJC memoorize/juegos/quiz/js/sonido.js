var audio = document.getElementById('miCancion');
var playButton = document.getElementById('playButton');
var isPlaying = false

playButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = `<img class="imgSonido" src="../img/icon/noSonido.png" alt="">`;
    } else {
        audio.play();
        playButton.innerHTML =  `<img class="imgSonido" src="../img/icon/sonido.png" alt="">`;
    }
    isPlaying = !isPlaying;
});

const volumeControl = document.getElementById('volume');
let iconoVolumen= document.getElementById("iconVolumen")

function updateVolume() {
    audio.volume = volumeControl.value;
    if(audio.volume <= 0){
        iconoVolumen.innerHTML = `<img class="volumen" src="../img/icon/noVolumen.png" alt=""></img>` 
    }else{
          
        iconoVolumen.innerHTML = `<img class="volumen" src="../img/icon/volumen.png" alt=""></img>`
    }
    console.log(audio.volume)
}

volumeControl.addEventListener('input', updateVolume);

updateVolume();


let avatarSeleccionado = '';
function seleccionarAvatar(rutaAvatar) {
    avatarSeleccionado = rutaAvatar;
    document.getElementById('avatarBoton').src = avatarSeleccionado; 
    document.getElementById('avatarPerfil').src = avatarSeleccionado;  
}
function guardarAvatar() {
    const mensajeModalBody = document.getElementById('mensajeModalBody');

    if (avatarSeleccionado !== "") {
        localStorage.setItem('avatarGuardado', avatarSeleccionado);
        
        mensajeModalBody.innerText = "Avatar guardado correctamente!";
        const mensajeModal = new bootstrap.Modal(document.getElementById('mensajeModal'));
        mensajeModal.show();
    } else {
        mensajeModalBody.innerText = "Por favor selecciona un avatar primero.";
        const mensajeModal = new bootstrap.Modal(document.getElementById('mensajeModal'));
        mensajeModal.show();
    }
}
function cargarAvatar() {
    const avatarGuardado = localStorage.getItem('avatarGuardado');
    if (avatarGuardado) {
        document.getElementById('avatarBoton').src = avatarGuardado;  
        document.getElementById('avatarPerfil').src = avatarGuardado;  
    }
}

window.onload = cargarAvatar;

function cerrarSesion() {
    window.location.href = '../login/index.html'; 
}

