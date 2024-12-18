let perfilAvatar = document.getElementById("gratis");
let avatarTienda= document.getElementById('tienda');
let btnModal= document.getElementById('btn-modal');
let avatarId;


fetch('../resources/avatar/avatar.php', {
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

    var modal = new bootstrap.Modal(document.getElementById('modal'));
    let pantalla = document.getElementById('response');
    // Crear el HTML para los avatares
    data.forEach(element => {
        if (element.valor == 0) {
            perfilAvatar.innerHTML += `
            <div>
                <img src="../img/avatar/${element.imagen}" class="avatar-option3" data-id="${element.id}" alt="">
            </div>
            `;
        }else{
            avatarTienda.innerHTML +=`
            <div class="producto1">
                <img src="../img/avatar/${element.imagen}" alt="producto1" class="producto-img" >
                <h3 class="nombre-producto" id="nombre-producto1">${element.nombre}</h3>
                <div id="${element.id}" class="info-producto">  
                    <img src="../img/icon/moneda.png" alt="Icono de comprar" class="descripcion-producto-img" id="descripcion-producto1">${element.valor}
                    <button class="comprar-button" data-id="${element.id}">Comprar</button>
                </div>
            </div>
            `;
        }        
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
                    pantalla.innerHTML = data.mensaje;
                    modal.show();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000); 
                }
                
            })
        })
    })

    const btnComprar = document.querySelectorAll('.comprar-button');

    btnComprar.forEach(comprar => {
        comprar.addEventListener('click', (event) =>{
            let avatarComprar = event.target.getAttribute('data-id');

            console.log(avatarComprar)
            fetch('../resources/avatar/comprarAvatar.php',{
                method: 'POST',
                headers:{
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatarId: avatarComprar,
                })
            })
            .then(response => response.json())
            .then(data =>{
                let modalTienda= document.getElementById('tiendaModal');

                if(data.status){
                    pantalla.innerHTML = data.mensaje;
                    
                }else{
                    pantalla.innerHTML = data.mensaje;
                }
                modalTienda.style.display = 'none';
                modal.show();
                setTimeout(() => {
                    window.location.reload();
                }, 2000); 
            })
         
        })
    })

})
.catch(error => console.error('Error:', error));

btnModal.addEventListener('click', () => {
    window.location.reload();
});