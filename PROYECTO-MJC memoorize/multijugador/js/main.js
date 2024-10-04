let btnCrear = document.getElementById("crear");
let btnUnirse = document.getElementById("unirse");


btnCrear.addEventListener('click', function(){
    localStorage.setItem('user', 1);
    window.location.href = 'sala/index.html';  
});


btnUnirse.addEventListener('click', function(){
    localStorage.setItem('user', 2); 
    window.location.href = 'sala/index.html'; 
});