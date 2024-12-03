let displaySala= document.getElementById('configuraciones')

fetch('../../../resources/multijugador/sala.php',{
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
    displaySala.innerHTML=`
        <p><strong>Sala:</strong> ${data[0].nombre || 'No disponible'}</p>
        <p><strong>codigo:</strong> ${data[0].codigo || 'No disponible'}</p>
        <p><strong>Dificultad:</strong> ${data[0].dificultad || 'No disponible'}</p>
        <p><strong>Rondas:</strong> ${data[0].rondas || 'No disponible'}</p>
        <p><strong>Personas:</strong> ${2 || 'No disponible'}</p>
    `;
})
.catch(error => console.error('Error:', error));