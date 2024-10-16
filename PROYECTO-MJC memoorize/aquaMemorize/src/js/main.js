function realizarTodasOperaciones(){

    let avatar= document.getElementById("totalScore")

    fetch('libreria/avatar.php',{
        method: 'POST',
        headers:{
            'content-Type':'application/json'
        },
        body: JSON.stringify({
            base: 24,
            altura: 10,
            lado: 10
        })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.error){
            alert(data.error);
        }else{
            avatar.innerHTML=`
                <div>
                    <h3>${data.Usuario}</h3>
                    <p>Correo: ${data.Correo}</p>
                    <p>Avatar: ${data.AvatarNombre}</p>
                    <img src="src/img/${data.AvatarImagen}" alt="${data.AvatarNombre}">
                    <p>Precio: ${data.AvatarPrecio}</p>
                    <p>Es gratuito: ${data.EsGratuito ? 'Sí' : 'No'}</p>
                </div>
            `;
            
        }
    })
    .catch(error => console.error('Error:',error));
}
realizarTodasOperaciones()