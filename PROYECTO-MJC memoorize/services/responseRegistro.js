let btnRegistrar = document.getElementById('registrar');

btnRegistrar.addEventListener('click', function() {
    console.log('click');
    let pantalla = document.getElementById('response');
    var modal = new bootstrap.Modal(document.getElementById('modal'));

    // Obtén los valores de los campos del formulario
    let nickName = document.getElementById('nickName').value;
    let correo = document.getElementById('correo').value;
    let contraseña = document.getElementById('contraseña').value;

    // Validar el formato del correo electrónico
    if (!esEmailValido(correo)) {
        pantalla.innerHTML = 'Por favor ingresa un correo electrónico válido.';
        modal.show();
        return;  // Detener la ejecución si el correo no es válido
    }

    // Enviar los datos al servidor con fetch
    fetch('../../resources/logic/registrar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nickName: nickName,
            correo: correo,
            contraseña: contraseña
        })
    })
    .then(response => response.json())
    .then(data => {
        // Muestra el mensaje de respuesta en el modal
        pantalla.innerHTML = data.message;
        modal.show();

        if(data.status === 'success'){
            window.location.href = '../index.html';
        }
    })
    .catch(error => console.error('Error:', error));
});

// Función para validar el formato del correo electrónico
function esEmailValido(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
