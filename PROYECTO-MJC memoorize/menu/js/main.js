function avatares(){

    fetch('../libreria/avatar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: '',
            Image: ''
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '../index.html';
        } else {
            pantalla.innerHTML = data.message;
        }
    })
    .catch(error => console.error('Error:', error));
}
avatares();