let avatarComprado = document.getElementById('comprados');
let adquirido= document.getElementById('adquiridos');

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
    if(data.status == 'FALSE'){
        avatarComprado.innerHTML += `
            <p>${data.mensaje}<p/>
        `;
    }else{
        data.forEach(element => {
        
            avatarComprado.innerHTML += `
            <div>
                <img src="../img/avatar/${element.imagen}" class="avatar-option3" data-id="${element.avatarId}" alt="">
            </div>
            `;

            adquirido.innerHTML +=`
            <div class="producto1">
                <img src="../img/avatar/${element.imagen}" alt="producto1" class="producto-img" >
                <h3 class="nombre-producto" id="nombre-producto1">${element.nombre}</h3>
                <div class="info-producto">  
                    <p>adquirido</p>
                </div>
            </div>
            `
            
        });
        
    }
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
                var modal = new bootstrap.Modal(document.getElementById('modal'));
                let pantalla = document.getElementById('response');

                if(data.status){
                    pantalla.innerHTML = data.mensaje;
                    modal.show();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000); 
                }
                
            })
        })
    })
})