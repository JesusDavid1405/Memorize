function mostrarModal(titulo, contenido) {
    const modalBackground = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>${titulo}</h2>
        <p>${contenido}</p>
       
    `;

    modalBackground.style.display = 'block';


    setTimeout(function() {
        window.location.href = '../index.html'; 
    }, 2000); 
}
window.onclick = function(event) {};