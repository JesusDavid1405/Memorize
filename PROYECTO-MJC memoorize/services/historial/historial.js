let displayHistorial= document.getElementById('historial');

fetch('../resources/historial/historial.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: ''
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    if (data.length === 0) {
        displayHistorial.innerHTML = `<tr><td colspan="4">No hay datos disponibles</td></tr>`;
        return;
    }
    
    data.forEach(element => {
        if(element.estado == "Ganaste"){
            displayHistorial.innerHTML += `
            <tr>
                <td>${element.juego}</td>
                <td>${element.nivelSalaId}</td>
                <td>${element.nombre}</td>
                <td>${element.puntos}</td>
                <td>${element.tiempo}</td>
                <td>${element.monedas}</td>
                <td>${element.fecha}</td>
                <td>${element.modalidad}</td>
                <td class="win">${element.estado}</td>
            </tr>
        `;
        }else{
            displayHistorial.innerHTML += `
            <tr>
                <td>${element.juego}</td>
                <td>${element.nivelSalaId}</td>
                <td>${element.nombre}</td>
                <td>${element.puntos}</td>
                <td>${element.tiempo}</td>
                <td>${element.monedas}</td>
                <td>${element.fecha}</td>
                <td>${element.modalidad}</td>
                <td class="false">${element.estado}</td>
            </tr>
        `;
        }
        
    });
   
})
.catch(error => {
    console.error('Error al cargar el top:', error);
    displayTop.innerHTML = `<tr><td>Error al cargar datos</td></tr>`;
});