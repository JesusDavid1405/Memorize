let avatarComprado = document.getElementById('comprados');

fetch('../resources/avatar/avatarComprado.php', {
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
    data.forEach(element => {
        avatarComprado.innerHTML += `
        <div>
            <img src="../img/${element.imagen}" class="avatar-option3" data-id="${element.avatarId}" alt="">
        </div>
        `;
        
        //document.getElementById(`${data.avatarId}`).style.display='none';
    });
    const avatarOptions = document.querySelectorAll('.avatar-option3');

    console.log(avatarOptions)

    avatarOptions.forEach(avatar => {
        avatar.addEventListener('click', (event) => {
            const avatarId = event.target.getAttribute('data-id');
            
            fetch('../resources/avatar/avatarEdit.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    avatarId: avatarId
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.status){
                    alert(data.mensaje)
                }
                window.location.reload();
            })
        })
    })
})