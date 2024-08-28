let progressBar = document.getElementById('progress-bar');
let width = 0;

let loadingInterval = setInterval(() => {
    width += 1;
    progressBar.style.width = width + '%';

    if (width >= 100) {
        clearInterval(loadingInterval);
        // Aquí puedes agregar código para iniciar el juego
        console.log("Carga completa. ¡Inicia el juego!");
    }
}, 50); // 50ms intervalos para completar la barra en 5 segundos