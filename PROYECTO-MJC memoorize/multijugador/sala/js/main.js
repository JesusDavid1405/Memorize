const user = localStorage.getItem('user');
const codigoSala= localStorage.getItem('codigo');
const nombreSala= localStorage.getItem('nombreSala')

let modalError= new bootstrap.Modal(document.getElementById('msgError'));
let modalDisplay= document.querySelector('.modal-body');

let header = document.querySelector('.header');
let players = '';  // Definir la variable como cadena vacía para concatenar contenido

for (let i = 1; i <= 3; i++) { 
    players +=`
        <div class="row">
    `
    for(let e= 1; e<=4; e++){
        players += `
            <div class="col">
                <img src="../../img/imagen2.png" alt="">
                <strong>user${i}</strong>
            </div>
        `;
    }
    players+=`</div>`
        
}
console.log(players)

document.getElementById('players').innerHTML=players;

if (user == 1) {
    header.innerHTML=`
        <h1>${nombreSala}</h1>
    `;   
    
} else if (user == 2) {
    header.innerHTML = `
        <h1>${nombreSala} </h1>  
    `;
    
} else {
    display.innerHTML = 'Error: no se ha especificado un usuario.';
}



