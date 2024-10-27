let btnCrearSala = document.getElementById('crearSala');

btnCrearSala.addEventListener('click', function() {
    let nombreSala = document.getElementById('nombreSala').value;
    let dificultad = document.getElementById('dificultad').value;
    let rondas = parseInt(document.getElementById('rondas').value, 7);

    let modalError = new bootstrap.Modal(document.getElementById('msgError'));
    let modalDisplay = document.querySelector('.modal-body');

    if (nombreSala.trim() === "") {
        modalDisplay.innerHTML = `Por favor ingrese un nombre`;
        modalError.show();
    } else if (rondas < 1 || rondas > 6) {
        modalDisplay.innerHTML = `El número de rondas debe estar entre 1 y 6`;
        modalError.show();
    } else {

        localStorage.setItem('nombreSala', nombreSala);
        localStorage.setItem('dificultad', dificultad);
        localStorage.setItem('rondas', rondas);
        localStorage.setItem('rol', 1);
        // Si es la ronda 6, almacena un indicador de "ronda más larga"
        if (rondas === 6) {
            localStorage.setItem('rondaMasLarga', true);
        } else {
            localStorage.removeItem('rondaMasLarga');
        }

        window.location.href = '../sala/index.html';
    }
});
