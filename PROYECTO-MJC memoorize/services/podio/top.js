let displayTop = document.getElementById('topGlobal');
let displayJuegosTop=

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
        
    })

    fetch('../resources/podio/topWordle.php', {
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
})
.catch(error => console.error('Error:', error));   
