let avatar = document.getElementById("avatar");
let playerName = document.getElementById("playerName");

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
    if (data.nickName && data.rutaImg) {
        console.log(data.rutaImg);
        avatar.src = `../img/${data.rutaImg}`;
        playerName.innerHTML = data.nickName;
    } else {
        console.error('No se recibieron los datos esperados:', data);
    }
})
.catch(error => console.error('Error:', error));
