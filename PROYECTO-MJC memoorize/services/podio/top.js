let displayTop = document.getElementById('topGlobal');
let displayJuegosTop= document.getElementById('juegosTop');

fetch('../resources/juegos/juegos.php',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        juegoId: ''
    })
})
.then(response => response.json())
.then(data => {
    data.forEach(juegos =>{
        // displayJuegosTop.innerHTML+=`
        // <ul>
        //     <li class="dropdown">
        //         <a href="javascript:void(0)">${juegos.nombre}</a>
        //         <ul class="dropdown-content">
        //             <li><a href="#">Action</a></li>
        //             <li><a href="#">Another Action</a></li>
        //             <li><a href="#">Something Else</a></li>
        //         </ul>
        //     </li>
        // </ul>
        // `;
        displayJuegosTop.innerHTML+=`
            <li class="juegos-opcion" data-id="${juegos.id}">${juegos.nombre}</li>
        `;
    })

    let juegosOpcion= document.querySelectorAll('.juegos-opcion');

    juegosOpcion.forEach(opcion =>{
        opcion.addEventListener('click',(event)=>{
            let juegoId = event.target.getAttribute('data-id');

            displayTop.innerHTML='';

            fetch('../resources/podio/topWordle.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: juegoId
                })
            })
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    displayTop.innerHTML+=`
                    <tr>
                        <td>
                            <div class="player-info">
                                <img src="../img/${element.avatar}" alt="Avatar 1" class="avatar">
                                <span>${element.nickName}</span>
                            </div>
                        </td>
                        <td>${element.puntos}</td>
                        <td>${element.tiempo}</td>
                        <td>${element.nivel}</td>
                    </tr>
                    `;
                    
                });
            })
            .catch(error => console.error('Error:', error));
            
        });
    });
})
.catch(error => console.error('Error:', error));   
