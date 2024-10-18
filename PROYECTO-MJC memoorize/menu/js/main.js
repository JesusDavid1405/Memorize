let perfilAvatar = document.getElementById("piratas");

function avatares(){

    fetch('../libreria/avatar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: '',
            Image: '',
            gratis:''
        })
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            if(element.gratis){
                perfilAvatar.innerHTML+=`
                <div>
                    <img src="../img/${element.imagen}" class="avatar-option2" data-avatar="../img/avatar1.png" alt="">
                    <p>${element.nombre}</p>
                </div>
                `; 

            }else{

            }   
        });
    })
    .catch(error => console.error('Error:', error));
}
avatares();