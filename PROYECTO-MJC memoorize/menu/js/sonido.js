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

