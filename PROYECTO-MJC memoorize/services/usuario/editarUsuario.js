
let btnActualizar = document.getElementById('actualizar');

btnActualizar.addEventListener('click', function() {
    let personalInfo = document.getElementById('descripcion').value; 
    console.log(personalInfo);

    fetch('../resources/usuario/editarPerfil.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            personalInfo: personalInfo
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
    })
    .catch(error => {'Error:', error});
});
