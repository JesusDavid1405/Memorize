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

document.addEventListener("DOMContentLoaded", function() {
    const game1 = document.getElementById("game1");
    const desc1 = document.getElementById("desc1");

    const playButton = document.getElementById("playButton");
    const descPlay = document.getElementById("descPlay");

    const usuarioButton = document.getElementById("usuarioBtn");
    const descUsuario = document.getElementById("descUsuario");

    const homeButton = document.getElementById("home");
    const descHome = document.getElementById("descHome");

    const configuracionButton = document.getElementById("configuracionBtn");
    const descConfiguracion = document.getElementById("descConfiguracion");
    
    const game2 = document.getElementById("game2");
    const desc2 = document.getElementById("desc2");

    const game3 = document.getElementById("game3");
    const desc3 = document.getElementById("desc3");

    playButton.addEventListener("mouseenter", function() {
        descPlay.style.display = "block"; 
    });

    playButton.addEventListener("mouseleave", function() {
        descPlay.style.display = "none"; 
    });

    usuarioButton.addEventListener("mouseenter", function() {
        descUsuario.style.display = "block"; 
    });

    usuarioButton.addEventListener("mouseleave", function() {
        descUsuario.style.display = "none"; 
    });

    homeButton.addEventListener("mouseenter", function() {
        descHome.style.display = "block"; 
    });

    homeButton.addEventListener("mouseleave", function() {
        descHome.style.display = "none"; 
    });

    configuracionButton.addEventListener("mouseenter", function() {
        descConfiguracion.style.display = "block"; 
    });

    configuracionButton.addEventListener("mouseleave", function() {
        descConfiguracion.style.display = "none"; 
    });

    game3.addEventListener("mouseenter", function() {
        desc3.style.display = "block";
    });

    game3.addEventListener("mouseleave", function() {
        desc3.style.display = "none";
    });

    game1.addEventListener("mouseenter", function() {
        desc1.style.display = "block";
    });

    game1.addEventListener("mouseleave", function() {
        desc1.style.display = "none";
    });

    game2.addEventListener("mouseenter", function() {
        desc2.style.display = "block";
    });

    game2.addEventListener("mouseleave", function() {
        desc2.style.display = "none";
    });
});
document.getElementById('menuButton').addEventListener('click', function() {
    const submenu = document.getElementById('submenu');
    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
});
