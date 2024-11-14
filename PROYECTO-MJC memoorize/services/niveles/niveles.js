let displayNiveles = document.getElementById('niveles');

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
.then(data => {
    data.forEach(element => {
        displayNiveles.innerHTML +=`
        <div class="level level-${element.id}" data-id="${element.id}">
            <div class="level-number">${element.numero}</div>
        </div>
        `;
    });
    console.log(data.nombre)
})
.catch(error => console.error('Error:', error));