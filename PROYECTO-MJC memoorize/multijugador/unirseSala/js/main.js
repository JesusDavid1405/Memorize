let btnComparar=document.getElementById('comparar');

const codigoSala=localStorage.getItem('codigo')
console.log(codigoSala)

btnComparar.addEventListener('click',function() {
    let codigoUser=document.getElementById('codigoSala').value.trim();  
    let modalError= new bootstrap.Modal(document.getElementById('msgError'));
    let modalDisplay= document.querySelector('.modal-body');

    if(codigoUser === ""){
        modalDisplay.innerHTML=`no haz ingresado ningun codigo, por favor ingresa uno`;
        modalError.show()
    }else if(codigoUser === codigoSala){

        let rondas = localStorage.getItem('rondas'); // Recuperar el número de rondas
        iniciarJuego(rondas); // Llama a tu función de iniciar el juego
    }else{
        modalDisplay.innerHTML=`el codigo que ingresaste no pertenece a ninguna sala`;
        modalError.show()
    }
    localStorage.setItem('rol',2)
})
function iniciarJuego(rondas) {
    console.log(`El juego comenzará con ${rondas} rondas.`);
    // Aquí debes implementar la lógica del juego
}