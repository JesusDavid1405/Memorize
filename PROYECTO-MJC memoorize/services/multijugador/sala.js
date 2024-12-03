let displaySala = document.getElementById('configuraciones');

// Realizar la solicitud al backend
fetch('../../../resources/multijugador/sala.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    if (Array.isArray(data) && data.length > 0) {
        // Usar el primer resultado si es un array
        const sala = data[0];
        displaySala.innerHTML = `
            <p><strong>Sala:</strong> ${sala.nombre || 'No disponible'}</p>
            <p><strong>Código:</strong> ${sala.codigo || 'No disponible'}</p>
            <p><strong>Dificultad:</strong> ${sala.dificultad || 'No disponible'}</p>
            <p><strong>Rondas:</strong> ${sala.rondas || 'No disponible'}</p>
            <p><strong>Personas:</strong> ${sala.personas || 'No disponible'}</p>
        `;
    } else {
        displaySala.innerHTML = `<p>No existe ninguna sala disponible.</p>`;
    }
})
.catch(error => console.error('Error:', error));
