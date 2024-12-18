let avatar = document.getElementById("avatar");
let playerName = document.getElementById("playerName");
let descripcionPlayer= document.getElementById('personalInfo');
let monedas= document.getElementById('moneda-moneda')

fetch('../resources/usuario/perfil.php', {
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
    
    avatar.src = `../img/avatar/${data.rutaImg}`;
    playerName.innerHTML = `${data.nickName} <i class="fa-solid fa-pen-to-square"></i> `;
    descripcionPlayer.innerHTML = `${data.descripcion} <i class="fa-solid fa-pen-to-square"></i> `;
    monedas.innerHTML= data.monedas
})
.catch(error => console.error('Error:', error));
