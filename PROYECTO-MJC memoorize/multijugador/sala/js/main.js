const rol = localStorage.getItem('rol');
const codigoSala= localStorage.getItem('codigo');
const nombreSala= localStorage.getItem('nombreSala');
const rondas= localStorage.getItem('rondas');
const dificultad= localStorage.getItem('dificultad')

let header = '';
let players = '';
let configuraciones='';

for (let i = 1; i <= 3; i++) { 
    players +=`
        <div class="row">
    `
    for(let e= 1; e<=4; e++){
        players += `
            <div class="col">
                <img src="../../img/imagen${i}.png" alt="">
                <strong>user${i}</strong>
            </div>
        `;
    }
    players+=`</div>`
        
}

header=`
    <p>${nombreSala}</p>
`; 

if (rol == 1){
    configuraciones=`
    dificultad: ${dificultad}
    <br>
    rondas: ${rondas}
    <br>
    codigo: ${codigoSala}
    <br>

    <button id="jugar" class="btn btn-primary">jugar</button>
    `;
} else if (rol == 2) {
    configuraciones=`
    dificultad: ${dificultad}
    <br>
    rondas: ${rondas}
    <br>
    codigo: ${codigoSala}
    
    `;
    
} else {
    display.innerHTML = 'Error: no se ha especificado un usuario.';
}

<<<<<<< HEAD
document.getElementById('configuraciones').innerHTML=configuraciones;
=======
document.getElementById('players').innerHTML=players;
document.querySelector('.header').innerHTML=header;
document.getElementById('configuraciones').innerHTML=configuraciones;

let btnJugar = document.getElementById('jugar');

// Verificar si el botón "Jugar" existe antes de agregar el listener
if (btnJugar) {
    btnJugar.addEventListener('click', async function () {
        // Si necesitas realizar tareas en paralelo, usa Promises o async/await
        await iniciarSala();
        window.location.href = '../cartas/index.html';
    });
}

// Función asíncrona para iniciar la sala, simulando algún proceso adicional
async function iniciarSala() {
    // Simulación de una tarea asíncrona (ej. llamada a una API)
    return new Promise((resolve) => {
        console.log('Iniciando la sala...');
        setTimeout(() => {
            console.log('Sala iniciada');
            resolve();
        }, 2000); // Simula un proceso que tarda 2 segundos
    });
}


>>>>>>> 8f9ea12b2d8e90cfb7a774a0f8db4621be2f4f45
