const usuarioId = localStorage.getItem('usuario');

let avatar = document.getElementById("avatar");

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
    console.log(data.imagen);
    avatar.src=`../img/${data.rutaImg}`;
})

.catch(error => console.error('Error:', error));