const usuarioId = localStorage.getItem('usuario');

let avatar = document.getElementById("avatar");
let playerName = document.getElementById("playerName");

fetch('../resources/logic/perfil.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        usuarioId: usuarioId
    })
})
.then(response => response.json())
.then(data => {
    console.log(data.rutaImg);
    avatar.src=`../img/${data.rutaImg}`;
    playerName.innerHTML = data.nickName;
})

.catch(error => console.error('Error:', error));

