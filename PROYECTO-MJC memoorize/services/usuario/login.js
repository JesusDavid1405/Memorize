let btnIniciar = document.getElementById('iniciarSesion')

btnIniciar.addEventListener('click', function() {
    let pantalla = document.getElementById('response');
    var modal = new bootstrap.Modal(document.getElementById('modal'));

    let correo = document.getElementById('emailLogin').value;
    let contraseña = document.getElementById('contraseñaLogin').value;

    fetch('../resources/usuario/login.php', {
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
        if (data.status && data.status === 'error') {
            pantalla.innerHTML = data.message;
            modal.show();
        } else {
            localStorage.setItem('usuario', data.usuarioId);
            window.location.href = '../interfaz/index.html  ';  // Redirige solo si el login fue exitoso
        }
    })
    .catch(error => console.error('Error:', error));
});
