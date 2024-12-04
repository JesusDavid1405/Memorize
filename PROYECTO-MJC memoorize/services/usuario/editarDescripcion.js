
let btnActualizar = document.getElementById('actualizar');

const palabrasGroseras = [
    'idiota', 'tonto', 'estúpido', 'imbécil', 'pendejo', 'cabrón', 'zorra', 'maldito',
    'malnacido', 'desgraciado', 'hijo de puta', 'perra', 'zunga', 'culo', 'mierda',
    'huevón', 'puto', 'joder', 'carajo', 'chingar','gonorrea','hp','sapa','pene','puchaina','vagina','verga',
    'vergas','ano'
];

btnActualizar.addEventListener('click', function() {
    let personalInfo = document.getElementById('descripcion').value; 

    console.log(personalInfo);

    fetch('../resources/usuario/editarPerfil.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            personalInfo: filtrarMensaje(personalInfo)
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
    })
    .catch(error => {'Error:', error});
});

function filtrarMensaje(mensaje) {
    let mensajeFiltrado = mensaje;
    palabrasGroseras.forEach(palabra => {
        const regex = new RegExp(palabra, 'gi'); // Crea una expresión regular para buscar la palabra sin importar mayúsculas/minúsculas
        mensajeFiltrado = mensajeFiltrado.replace(regex, '*'.repeat(palabra.length)); // Reemplaza la palabra por asteriscos
    });
    return mensajeFiltrado;
}