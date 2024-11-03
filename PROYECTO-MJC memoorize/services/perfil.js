let avatar = document.getElementById("avatar");
let playerName = document.getElementById("playerName");
let descripcionPlayer= document.getElementById('personalInfo');
let monedas= document.getElementById('moneda-moneda')

fetch('../resources/usuario/logic/perfil.php', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: '',
    })
})
.then(response => response.json())
.then(data => {
    
    avatar.src = `../img/${data.rutaImg}`;
    playerName.innerHTML = data.nickName;
    descripcionPlayer.innerHTML = data.descripcion;
    monedas.innerHTML= data.monedas
})
.catch(error => console.error('Error:', error));
