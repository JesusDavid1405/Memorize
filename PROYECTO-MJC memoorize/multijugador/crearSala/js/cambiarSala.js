document.addEventListener('DOMContentLoaded', function() {
    let btnCrearSala = document.getElementById('crearSala');

    btnCrearSala.addEventListener('click', function() {
        let nombreSala = document.getElementById('nombreSala').value; 
        let numeroPersonas = parseInt(document.getElementById('numeroPersonas').value); 
        let codigoSala = generateCode(); 
        let dificultad = document.getElementById('dificultad').value;
        let rondas = parseInt(document.getElementById('rondas').value);

        let modalError = new bootstrap.Modal(document.getElementById('msgError'));
        let modalDisplay = document.querySelector('.modal-body');

        if (nombreSala.trim() === "") {
            modalDisplay.innerHTML = `Por favor ingrese un nombre`;
            modalError.show();
        } else if (numeroPersonas > 10) {
            modalDisplay.innerHTML = `El número máximo de personas es 10`;
            modalError.show();    
        } else if (rondas < 1 || rondas > 5) {
            modalDisplay.innerHTML = `El número de rondas debe estar entre 1 y 5`;
            modalError.show();
        } else {
            localStorage.setItem('nombreSala', nombreSala);
            localStorage.setItem('codigoSala', codigoSala);
            localStorage.setItem('numeroPersonas', numeroPersonas);
            localStorage.setItem('dificultad', dificultad);
            localStorage.setItem('rondas', rondas);
            localStorage.setItem('rol', 1);
            
            if (rondas === 5) {
                localStorage.setItem('rondaMasLarga', true);
            } else {
                localStorage.removeItem('rondaMasLarga');
            }

            window.location.href = '../sala/index.html';
        }
    });
});
function generateCode(){
    let codigo;

    let generate = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    codigo = generate;

    return codigo;
}