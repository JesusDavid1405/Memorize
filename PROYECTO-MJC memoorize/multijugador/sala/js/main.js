const user = localStorage.getItem('user');
const codigoSala= localStorage.getItem('codigo');
const nombreSala= localStorage.getItem('nombreSala');
const rondas= localStorage.getItem('rondas');

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

document.getElementById('players').innerHTML=players;
document.querySelector('.header').innerHTML=header;


if (user == 1) {
    configuraciones=`
    <div>
        <label for="rondas">rondas</label>
        <select id="rondas" name="rondas">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
        </select>
    </div>`;
    
} else if (user == 2) {
    configuraciones=`
    <div>
        rondas ${rondas}
    </div>
    `;
} else {
    display.innerHTML = 'Error: no se ha especificado un usuario.';
}



document.getElementById('configuraciones').innerHTML=configuraciones;


