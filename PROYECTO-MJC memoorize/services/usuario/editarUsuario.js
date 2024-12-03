let btnActualizar = document.getElementById('actualizar');

btnActualizar.addEventListener('click', function() {
    let personalInfo = document.getElementById('personalInfo').value; 

    fetch('../../resourcers/usuario/editarPerfil.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            personalInfo: personalInfo
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if(data.status){
            alert(data.mensaje);
            document.getElementById('editProfileModal').modal('hide');
        } else {
            alert('Error: ' + data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al actualizar el perfil');
    });
});
