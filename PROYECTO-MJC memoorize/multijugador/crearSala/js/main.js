let btnCrearSala = document.getElementById('crearSala');



btnCrearSala.addEventListener('click',function(){
    let nombreSala= document.getElementById('nombreSala').value;

    let modalError= new bootstrap.Modal(document.getElementById('msgError'));
    let modalDisplay= document.querySelector('.modal-body');

    console.log(nombreSala);
    if(nombreSala.trim() === ""){
        modalDisplay.innerHTML=`
            por favor ingrese un nombre
        `;
        modalError.show()
    }else{
        localStorage.setItem('nombreSala',nombreSala);
        window.location.href='../sala/index.html';
    }
    
})
