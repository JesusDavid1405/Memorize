let displayJuegos = document.getElementById('juegos');

fetch('../resources/juegos/juegos.php', {
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
        // Crear los elementos dinámicamente
        displayJuegos.innerHTML += `
        <div class="game-option">
            <img src="../img/${element.imagen}" alt="${element.nombre}" class="game-image">
            <div data-id="${element.id}" id="play-${element.id}" class="play-button${element.id}">${element.nombre}</div>
            <p class="game-description">${element.descripcion}</p>
        </div>
        `;


    });

    // Añadir eventListener con condicionales
    data.forEach(element => {
        const button = document.getElementById(`play-${element.id}`);
        button.addEventListener('click', (event) => {
            let juegoId=event.target.getAttribute('data-id');

            console.log(juegoId);

            fetch('../resources/juegos/juegoJugar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    juegoId: juegoId
                })
            })

            // Usar condicionales para definir la URL
            let url = '';
            if (element.id === 1) {
                url = '../juegos/juego rompe/index.html';
            } else if (element.id === 2) {
                url = '../juegos/quiz/index.html';
            } else if (element.id === 3) {
                url = '../multijugador/index.html';
            } 

            window.location.href = url;
        });
    });
})
.catch(error => console.error('Error:', error));
