let perfilAvatar = document.getElementById("gratis");
let avatarOptions;


fetch('../resources/usuario/logic/avatar.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
        id: '' 
    })
})
.then(response => response.json())
.then(data => {
    // Crear el HTML para los avatares
    data.forEach(element => {
        if (element.gratis) {
            perfilAvatar.innerHTML += `
            <div>
                <img src="../img/${element.imagen}" class="avatar-option2" data-id="${element.id}" alt="">
            </div>
            `;
        }
    });
    const avatarOptions = document.querySelectorAll('.avatar-option2');

    avatarOptions.forEach(avatar => {
        avatar.addEventListener('click', (event) => {
            const avatarId = event.target.getAttribute('data-id');
            console.log('Avatar seleccionado con ID:', avatarId);
        })
    })
})
.catch(error => console.error('Error:', error));
