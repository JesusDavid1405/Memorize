let btnCrear = document.getElementById("crear");
let btnUnirse = document.getElementById("unirse");

let valorCodigo= generateCode();

localStorage.setItem('codigo', parseInt(valorCodigo));

console.log(localStorage.getItem('codigo'))

btnCrear.addEventListener('click', function(){
    localStorage.setItem('user', 1);
    window.location.href = 'crearSala/index.html';  
});


btnUnirse.addEventListener('click', function(){
    localStorage.setItem('user', 2); 
    window.location.href = 'unirseSala/index.html'; 
});

function generateCode(){
    let codigo;

    let generate = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    codigo = generate;

    return codigo;
}