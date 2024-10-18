document.addEventListener('DOMContentLoaded', function() {
    let btnRegistrar = document.getElementById('registrar');

    btnRegistrar.addEventListener('click', function() {

        let nickName = document.getElementById('nickName').value;
        let correo = document.getElementById('email').value;
        let contraseña = document.getElementById('contraseña').value;

        let pantalla = document.getElementById("resultado");


        fetch('../../libreria/registrar.php', {
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
            if (data.status === 'success') {

                window.location.href = '../../interfaz/index.html';
            } else {
                pantalla.innerHTML = data.message;
            }
        })
        .catch(error => console.error('Error:', error));
    });
});