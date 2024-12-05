let btnUnirseSala = document.getElementById('comparar');

btnUnirseSala.addEventListener('click', function() {
    let codigoSala = document.getElementById('codigoSala').value.trim();
    let modalError = new bootstrap.Modal(document.getElementById('msgError'));
    let modalDisplay = document.querySelector('#msgError .modal-body');

    if (codigoSala === "") {
        modalDisplay.innerHTML = "Por favor ingresa un código de sala";
        modalError.show();
    } else {
        // Enviar solicitud al servidor para validar código de sala
        fetch('../../resources/multijugador/compararCodigo.php', {
            method: 'POST',
            body: JSON.stringify({
                codigoSala: codigoSala
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'true') {
                // Código de sala válido, redirigir
                window.location.href = '../../multijugador/sala/estructura/index.php';
            } else {
                // Mostrar mensaje de error
                modalDisplay.innerHTML = data.mensaje;
                modalError.show();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            modalDisplay.innerHTML = "Hubo un error al validar el código de sala";
            modalError.show();
        });
    }
});