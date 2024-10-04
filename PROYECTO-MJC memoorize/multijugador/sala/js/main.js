const user = localStorage.getItem('user');

let display = document.getElementById('result');

let codigoSala=generateCode();
console.log(codigoSala)

if (user == 1) {
    display.innerHTML = `
    <div class="sala">
        <div class="col-12">
            <img class="logo" src="../../img/logo/multijugador.png" alt="...">
            <div class="codigoSala">
                <input class="input" type="number" id="codigoSala" maxlength="5" minlength="5" placeholder="codigo de la sala">
            </div>
            <div class="btnComparar">
                <button id="comparar">Ingresar a la Sala</button>
            </div>
        </div>
    </div>
    `;
} else if (user == 2) {
    display.innerHTML = `
    <div class="sala">
        <div class="col-12">
            <img class="logo" src="../../img/logo/multijugador.png" alt="...">
            <div class="codigoSala">
                <input class="input" type="number" id="codigoSala" maxlength="5" minlength="5" placeholder="codigo de la sala">
            </div>
            <div class="btnComparar">
                <button id="comparar">Ingresar a la Sala</button>
            </div>
        </div>
    </div>
    `;
} else {
    display.innerHTML = 'Error: no se ha especificado un usuario.';
}

let btnComparar=document.getElementById('comparar');

btnComparar.addEventListener('click',function() {
    let codigoUser=document.getElementById('codigoSala').value;
    let modalError= new bootstrap.Modal(document.getElementById('msgError'));
    let modalDisplay= document.querySelector('.modal-body');

    if(codigoUser == codigoSala){
        display.innerHTML=`
        se ingreso el codigo correcto
        `;
    }else{
        modalDisplay.innerHTML=`el codigo que ingresaste no pertenece a ninguna sala`;
    }
    modalError.show()
})
    

function generateCode(){
    let codigo;

    // Generar un número aleatorio entre 10000 y 99999
    let generate = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    codigo = generate;

    return codigo;
}