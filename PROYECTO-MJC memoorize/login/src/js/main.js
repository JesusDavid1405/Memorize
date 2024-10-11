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
            // Este campo se puede omitir si no lo estás usando
            nickName: "", 
            correo: correo,
            contraseña: contraseña
        })
    })
    .then(response => response.json())
    .then(data => {
        // Si hay un error en el servidor
        if (data.error) {
            alert(data.error);
        } else {
            // Verificamos si las credenciales coinciden con alguno de los usuarios
            let encontrado = data.find(usuario => 
                usuario.correo === correo && usuario.contraseña === contraseña
            );

            if (encontrado) {
                // Redirigir si las credenciales son correctas
                window.location.href = '../menu/index.html';
            } else {
                pantalla.innerHTML = 'Los datos ingresados no se encuentran registrados';
            }
        }
    })
    .catch(error => console.error('Error:', error));
});
