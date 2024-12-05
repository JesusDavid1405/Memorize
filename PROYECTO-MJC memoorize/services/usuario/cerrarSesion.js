let cerrarSesionBtn = document.getElementById('cerrarSesion');
let confirmacion;

cerrarSesionBtn.addEventListener('click', function(){
    confirmacion=true;

    fetch('../resources/usuario/cerrarSesion.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            confirmacion: confirmacion
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status){
            alert(data.mensaje)
        }else{
            alert(data.mensaje)
        }
    })
    .catch(error => {'Error:', error});

    window.location.href="../views/principal.html";
});
