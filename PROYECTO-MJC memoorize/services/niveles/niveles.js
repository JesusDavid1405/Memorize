let displayNiveles = document.getElementById('niveles');

fetch('../../resources/niveles/nivelesJugar.php', {
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
    fetch('../../resources/niveles/niveles.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id: ''
        })
    })
    .then(response => response.json())
    .then(niveles => {
        data.forEach(jugar => {
            niveles.forEach(element => {
                if(jugar.id == element.id){
                    displayNiveles.innerHTML +=`
                    <div class="selecionar level level-${element.id}" data-id="${element.id}">
                        <div class="level-number">${element.numero}</div>
                    </div>    
                    `;
                }else{
                    displayNiveles.innerHTML +=`
                    <div class="level level-${element.id}" data-id="${element.id}">
                        <div class="level-number">
                            <img src="../../img/icon/candado.png" alt="Cofre del tesoro" class="bloqueado">
                        </div>
                    </div>
                    `;
                }
            });
        });
        
        let opcionNivel = document.querySelectorAll('.selecionar');

        opcionNivel.forEach(element => {
            element.addEventListener('click', function(){
                setTimeout( function() {
                    window.location.href= 'niveles/index.html';
                }, 100);
            })
        })
    })
    .catch(error => console.error('Error:', error));
})

