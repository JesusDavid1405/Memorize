let btnIniciar = document.getElementById('iniciarSesion');

btnIniciar.addEventListener('click', function() {
    let correo = document.getElementById('emailLogin').value;
    let contraseña = document.getElementById('contraseñaLogin').value;
    let pantalla = document.getElementById("resultado");

    // Realiza la llamada fetch cuando el botón es presionado
    fetch('../libreria/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            contraseña: contraseña
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log(data.status)
            window.location.href = '../menu/index.html';
        } else {
            // Mostrar mensaje de error si el inicio de sesión falla
            pantalla.innerHTML = data.message;
        }
    })
    .catch(error => console.error('Error:', error));
});