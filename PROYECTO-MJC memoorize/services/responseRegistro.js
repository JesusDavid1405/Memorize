let btnRegistrar = document.getElementById('registrar');

btnRegistrar.addEventListener('click', function() {
    let pantalla = document.getElementById('response');
    var modal = new bootstrap.Modal(document.getElementById('modal'));

    // Obtén los valores de los campos del formulario
    let nickName = document.getElementById('nickName').value;
    let correo = document.getElementById('correo').value;
    let contraseña = document.getElementById('contraseña').value;

    // Enviar los datos al servidor con fetch
    fetch('../../resources/entitys/registrar.php', {
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
    })
    .catch(error => console.error('Error:', error));
});
