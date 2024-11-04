let perfilAvatar = document.getElementById("gratis");
let avatarTienda= document.getElementById('tienda');
let avatarId;


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
        if (element.valor == 0) {
            perfilAvatar.innerHTML += `
            <div>
                <img src="../img/${element.imagen}" class="avatar-option3" data-id="${element.id}" alt="">
            </div>
            `;
        }else{
            avatarTienda.innerHTML +=`
            <div class="producto1">
                <img src="../img/${element.imagen}" alt="producto1" class="producto-img" id="${element.id}">
                <div class="info-producto">
                    <h3 class="nombre-producto" id="nombre-producto1">${element.nombre}</h3>
                    <img src="../img/icon/moneda.png" alt="Icono de comprar" class="descripcion-producto-img" id="descripcion-producto1">${element.valor}
                </div>
                <button class="comprar-button" onclick="comprarProducto(200)">Comprar</button>
            </div>
            `;
        }        
    });
    const avatarOptions = document.querySelectorAll('.avatar-option3');

    console.log(avatarOptions)

    avatarOptions.forEach(avatar => {
        avatar.addEventListener('click', (event) => {
            const avatarId = event.target.getAttribute('data-id');
            
            fetch('../resources/usuario/logic/avatarEdit.php', {
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
.catch(error => console.error('Error:', error));

