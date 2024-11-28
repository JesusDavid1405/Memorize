let btnCrearSala = document.getElementById('crearSala');

btnCrearSala.addEventListener('click', function() {
    let nombreSala = document.getElementById('nombreSala').value; 
    let numeroPersonas = parseInt(document.getElementById('numeroPersonas').value); 
    let codigoSala = generateCode(); 
    let dificultad = document.getElementById('dificultad').value;
    let rondas = parseInt(document.getElementById('rondas').value);

    fetch('../../resources/multijugador/crearSala.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            nombreSala: nombreSala,
            codigoSala: codigoSala,
            capacidadSala: numeroPersonas,
            dificultadSala: dificultad,
            rondasSala: rondas
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status){
            alert(data.mensaje);
            window.location.href='../sala/index.html';
        }
    })
    .catch(error => console.error('Error:', error));
});

function generateCode(){
    let codigo;

    let generate = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    codigo = generate;

    return codigo;
}