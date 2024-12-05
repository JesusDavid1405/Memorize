let btnCrearSala = document.getElementById('crearSala');

btnCrearSala.addEventListener('click', function() {
    let nombreSala = document.getElementById('nombreSala').value; 
    let numeroPersonas = parseInt(document.getElementById('numeroPersonas').value); 
    let codigoSala = generateCode(); 
    let dificultadSelect= document.getElementById('dificultad');
    let dificultad= dificultadSelect.value;
    let rondas = parseInt(document.getElementById('rondas').value);
    let modalError = new bootstrap.Modal(document.getElementById('msgError'));
    let modalBody = document.querySelector('#msgError .modal-body');

    if (numeroPersonas > 10) {
        modalBody.textContent = 'El número máximo de personas permitido es 10.';
        modalError.show();
        return; // Detener el flujo
    }
    if (rondas  > 5) {
        modalBody.textContent = 'El número de rondas es 5.';
        modalError.show();
        return; // Detener el flujo
    }
    if (!nombreSala || isNaN(numeroPersonas) || isNaN(rondas) || !dificultad) {
        modalBody.textContent = 'Debes ingresar todos los datos para crear tu sala.';
        modalError.show();
        return; // Detener el flujo
    }
    fetch('../../resources/multijugador/crearSala.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            nombreSala: nombreSala,
            codigoSala: codigoSala,
            capacidadSala: numeroPersonas,
            dificultadSala: dificultad,
            rondasSala: rondas
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            modalBody.textContent = data.mensaje; 
            modalError.show(); 
            setTimeout(() => {
                window.location.href = '../../multijugador/sala/estructura/index.php';
            }, 2000);
        } else {
            modalBody.textContent = data.mensaje;
            modalError.show();
        }
    })
    .catch(error => {
        console.error('Error:', error);

        modalBody.textContent = 'Ha ocurrido un error inesperado. Inténtalo nuevamente.';
        modalError.show(); 
    });
});

function generateCode(){
    let codigo;

    let generate = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    codigo = generate;

    return codigo;
}