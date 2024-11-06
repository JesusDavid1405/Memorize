window.addEventListener('load', () => {
    const ship = document.getElementById('ship');
    
    const savedTop = localStorage.getItem('shipTop');
    const savedLeft = localStorage.getItem('shipLeft');

    if (savedTop && savedLeft) {
        ship.style.top = savedTop;
        ship.style.left = savedLeft;
    }
});
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
            musicIcon.src = "../../../img/musica.png";  
        } else {
            backgroundMusic.play().catch(error => {
                console.error("Error al intentar reproducir la música:", error);
            });
            musicIcon.src = "../../../img/nomusica.png";
        }
        isPlaying = !isPlaying;
    });
    volumeControl.addEventListener('input', function() {
        backgroundMusic.volume = volumeControl.value; 
    });


    backgroundMusic.volume = volumeControl.value; 
});

function goToLevel(level) {
    const ship = document.getElementById('ship');
    const levelElement = document.querySelector(`.level.level-${level}`);
    
    const topPosition = levelElement.offsetTop + 'px';
    const leftPosition = levelElement.offsetLeft + 'px';
    
    ship.style.top = topPosition;
    ship.style.left = leftPosition;

    localStorage.setItem('selectedLevel', level);
    localStorage.setItem('shipTop', topPosition);
    localStorage.setItem('shipLeft', leftPosition);

    setTimeout(() => {
        window.location.href = '../rompecabeza 3x3/index.html';
    }, 2000); 
}
function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
