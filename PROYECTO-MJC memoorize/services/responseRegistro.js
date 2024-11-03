let btnRegistrar = document.getElementById('registrar');

btnRegistrar.addEventListener('click', function() {
    let pantalla = document.getElementById('response');
    var modal = new bootstrap.Modal(document.getElementById('modal'));

    
    let nickName = document.getElementById('nickName').value;
    let correo = document.getElementById('correo').value;
    let contraseña = document.getElementById('contraseña').value;

    
    if (!nickName || !correo || !contraseña) {
        pantalla.innerHTML = 'Por favor, completa todos los campos.';
        modal.show();
        return;  
    }

    
    if (!esEmailValido(correo)) {
        pantalla.innerHTML = 'Por favor ingresa un correo electrónico válido.';
        modal.show();
        return; 
    }

    
    fetch('../../resources/usuario/logic/registrar.php', {
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
        
        pantalla.innerHTML = data.message;
        modal.show();

        if(data.status === 'success'){
            window.location.href = '../index.html';
        }
    })
    .catch(error => console.error('Error:', error));
});


function esEmailValido(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

