const user = localStorage.getItem('user');
const codigoSala= localStorage.getItem('codigo');

let modalError= new bootstrap.Modal(document.getElementById('msgError'));
let modalDisplay= document.querySelector('.modal-body');

let display = document.getElementById('result');


console.log(codigoSala)

if (user == 1) {
    display.innerHTML = `
    <div class="col-12">
        <img class="logo" src="../../img/logo/multijugador.png" alt="...">
    <div class="codigoSala">
        <input class="input" type="text" id="nombreSala" placeholder="nombre de la sala">
    </div>
    <div class="btnComparar">
        <button id="crearSala">Crear Sala</button>
    </div>
        
    `;
} else if (user == 2) {
    display.innerHTML = `
    <div class="col-12">
        <img class="logo" src="../../img/logo/multijugador.png" alt="...">
        <div class="codigoSala">
            <input class="input" type="number" id="nombreSala" maxlength="5" minlength="5" placeholder="codigo de la sala">
        </div>
        <div class="btnComparar">
            <button id="comparar">Ingresar a la Sala</button>
        </div>
    </div>
    `;
} else {
    display.innerHTML = 'Error: no se ha especificado un usuario.';
}

/*obtener nombre de la sala*/

let btnCrearSala = document.getElementById('crearSala');


btnCrearSala.addEventListener('click',function(){
    let nombreSala= document.getElementById('nombreSala').value;
    console.log(nombreSala)
    if(nombreSala == null){
        modalDisplay.innerHTML=`
        por favor ingrese un nombre
        `;
        modalError.show()
    }else{
        display.innerHTML=`
        <div class="sala">
            <div class="header">
                <h1>${nombreSala} </h1>
            </div>
            <div class="body-multijugador">
                
            </div>
        </div>
        `;  
    }
    
})

/*unirse*/

let btnComparar=document.getElementById('comparar');
let codigoUser=document.getElementById('codigoSala').value;

btnComparar.addEventListener('click',function() {
    if(codigoUser == codigoSala){
        display.innerHTML=`
        se ingreso el codigo correcto
        `;
    }else{
        modalDisplay.innerHTML=`el codigo que ingresaste no pertenece a ninguna sala`;
        modalError.show()
    }
    
})