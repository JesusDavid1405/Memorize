let btnUnirseSala = document.getElementById('comparar');

btnUnirseSala.addEventListener('click', function() {
    let codigoSala = document.getElementById('codigoSala').value.trim();
    let modalError = new bootstrap.Modal(document.getElementById('msgError'));
    let modalDisplay = document.querySelector('#msgError .modal-body');

    if (codigoSala === "") {
        modalDisplay.innerHTML = "Por favor ingresa un código de sala";
        modalError.show();
    } else {
        let salaExistente = localStorage.getItem('codigoSala'); // Supongamos que guardas el código de la sala al crearla
        if (codigoSala === salaExistente) {
            window.location.href = '../sala/index.html'; // Cambia la URL según sea necesario
        } else {
            modalDisplay.innerHTML = "El código de sala ingresado no es válido";
            modalError.show();
        }
    }
});
