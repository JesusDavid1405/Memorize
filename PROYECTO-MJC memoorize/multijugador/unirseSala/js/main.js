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
        window.location.href='../sala/index.html'
    }else{
        modalDisplay.innerHTML=`el codigo que ingresaste no pertenece a ninguna sala`;
        modalError.show()
    }
    localStorage.setItem('rol',2)
})