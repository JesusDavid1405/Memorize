let displayNiveles = document.getElementById('niveles');

// Obtener los niveles que el usuario puede jugar
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
    // Crear un set de IDs de los niveles desbloqueados para fácil acceso
    const nivelesDesbloqueados = new Set(data.map(jugar => jugar.id));

    // Obtener todos los niveles
    return fetch('../../resources/niveles/niveles.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id: ''
        })
    }).then(response => response.json()).then(niveles => ({ niveles, nivelesDesbloqueados }));
})
.then(({ niveles, nivelesDesbloqueados }) => {
    // Recorrer todos los niveles y verificar si están desbloqueados
    niveles.forEach(element => {
        if (nivelesDesbloqueados.has(element.id)) {
            displayNiveles.innerHTML += `
                <div class="selecionar level level-${element.id}" data-id="${element.id}">
                    <div class="level-number">${element.numero}</div>
                </div>`;
        } else {
            displayNiveles.innerHTML += `
                <div class="level level-${element.id}" data-id="${element.id}">
                    <div class="level-number">
                        <img src="../../img/icon/candado.png" alt="Cofre del tesoro" class="bloqueado">
                    </div>
                </div>`;
        }
    });

    let opcionNivel = document.querySelectorAll('.selecionar');
    opcionNivel.forEach(element => {
        element.addEventListener('click', (event)=> {

            let nivelesJugar = event.target.getAttribute('data-id');
            console.log(nivelesJugar)

            fetch('../../resources/wordle/nivelJugar.php',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    nivelId: nivelesJugar 
                })
            })

            setTimeout(() => {

                window.location.href = 'niveles/index.html';

            }, 100);
        });
    });
})
.catch(error => console.error('Error:', error));
