let displayTop = document.getElementById('topGlobal');
let displayJuegosTop = document.getElementById('juegosTop');


function cargarTop(juegoId = 2) {
    displayTop.innerHTML = `<tr><td colspan="4">Cargando...</td></tr>`; 

    fetch('../resources/podio/topWordle.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: juegoId 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        displayTop.innerHTML = '';
        if (data.length === 0) {
            displayTop.innerHTML = `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
            return;
        }

        data.forEach(element => {
            displayTop.innerHTML += `
                <tr>
                    <td>
                        <div class="player-info">
                            <img src="../img/avatar/${element.avatar}" alt="${element.nickName}" class="avatar">
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
    .catch(error => {
        console.error('Error al cargar el top:', error);
        displayTop.innerHTML = `<tr><td colspan="4">Error al cargar datos</td></tr>`;
    });
}


function cargarJuegos() {
    displayJuegosTop.innerHTML = `<li>Cargando juegos...</li>`; 

    fetch('../resources/juegos/juegos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            juegoId: '' 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        displayJuegosTop.innerHTML = ''; 
        if (data.length === 0) {
            displayJuegosTop.innerHTML = `<li>No hay juegos disponibles</li>`;
            return;
        }

        data.forEach(juegos => {
            displayJuegosTop.innerHTML += `
                <li class="juegos-opcion" data-id="${juegos.id}">${juegos.nombre}</li>
            `;
        });

        
        document.querySelectorAll('.juegos-opcion').forEach(opcion => {
            opcion.addEventListener('click', (event) => {
                const juegoId = event.target.getAttribute('data-id'); 
                cargarTop(juegoId); 
            });
        });
    })
    .catch(error => {
        console.error('Error al cargar juegos:', error);
        displayJuegosTop.innerHTML = `<li>Error al cargar juegos</li>`;
    });
}

cargarJuegos();
cargarTop(); 
