(() => {
    let editarNickName = document.getElementById('nickName');
    let btnActualizar = document.getElementById('actualizarNickName');

    editarNickName.addEventListener('click', function () {
        let modalEditar = new bootstrap.Modal(document.getElementById('editarNickName'));
        modalEditar.show();
    });

    btnActualizar.addEventListener('click', function () {
        let personalInfo = document.getElementById('nickNameIn').value;
        let infoFilter = filtrarMensaje(personalInfo);
        var modal = new bootstrap.Modal(document.getElementById('modal'));
        let pantalla = document.getElementById('response');
        let modalEditarStyle = document.getElementById('editarNickName');

        fetch('../resources/usuario/editarNickName.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickName: infoFilter
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    pantalla.innerHTML = data.mensaje;
                } else {
                    pantalla.innerHTML = data.mensaje;
                }

                modalEditarStyle.style.display = 'none';
                modal.show();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => console.error('Error:', error));
    });

    const palabrasGroseras = [
        'idiota', 'tonto', 'estúpido', 'imbécil', 'pendejo', 'cabrón', 'zorra', 'maldito',
        'malnacido', 'desgraciado', 'hijo de puta', 'perra', 'zunga', 'culo', 'mierda',
        'huevón', 'puto', 'joder', 'carajo', 'chingar', 'gonorrea', 'hp', 'sapa', 'pene', 'puchaina', 'vagina', 'verga',
        'vergas', 'ano'
    ];

    function filtrarMensaje(mensaje) {
        let mensajeFiltrado = mensaje;
        palabrasGroseras.forEach(palabra => {
            const regex = new RegExp(palabra, 'gi'); // Crea una expresión regular para buscar la palabra sin importar mayúsculas/minúsculas
            mensajeFiltrado = mensajeFiltrado.replace(regex, '*'.repeat(palabra.length)); // Reemplaza la palabra por asteriscos
        });
        return mensajeFiltrado;
    }
})();
