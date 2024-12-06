var timeCont;
var timeMax = 50;
let estadoNivel;
let monedas=0;

var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (images, gridSize) {
        this.setImage(images, gridSize);  // Ahora recibe gridSize
        helper.doc('playPanel').style.display = 'block';
        helper.shuffle('sortable');
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.tick();
    },
    tick: function () {
        var timeReducion = timeMax;
        timeCont = setInterval(() => {
            timeReducion--;
            helper.doc('timerPanel').textContent = timeReducion;
    
            // Manejo de tiempo agotado
            if (timeReducion <= 0) {
                clearInterval(timeCont);
                estadoNivel = false;
    
                // Mostrar modal de derrota
                mostrarModal("Perdiste", "El tiempo se ha agotado y no completaste el rompecabezas.");
            }
        }, 1000);
    },
    setImage: function (images, gridSize) {
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        helper.doc('imgTitle').innerHTML = image.title;
        helper.doc('actualImage').setAttribute('src', image.src);
        helper.doc('sortable').innerHTML = '';

        // Ocultar la imagen actual
        helper.doc('actualImage').style.display = 'none';

        // Crear el overlay (capa de fondo) y mostrar la imagen encima de todo
        var overlay = document.createElement('div');
        overlay.id = 'imageOverlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';  // Fondo oscuro para el overlay
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center'; // Centrado vertical
        overlay.style.justifyContent = 'center'; // Centrado horizontal
        overlay.style.zIndex = '9999';  // Asegura que esté encima de todo
        overlay.style.transition = 'opacity 0.5s ease'; // Agrega animación suave
        overlay.style.opacity = '0'; // Inicia con el overlay invisible

        // Agregar un estilo "bobito" con bordes redondeados y sombra
        overlay.style.borderRadius = '20px'; // Bordes redondeados
        overlay.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.5)'; // Sombra para dar profundidad

        // Crear la imagen y agregarla al overlay
        var img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.style.maxWidth = '50%';   // Hacer que la imagen ocupe hasta el 90% del ancho de la pantalla
        img.style.maxHeight = '50%';  // Hacer que la imagen ocupe hasta el 90% de la altura de la pantalla
        img.style.objectFit = 'contain';  // Ajustar la imagen para no distorsionarla
        img.style.transition = 'transform 1s ease';  // Efecto de animación en la imagen

        overlay.appendChild(img);

        // Añadir el overlay al cuerpo de la página
        document.body.appendChild(overlay);

        // Animar el overlay para que aparezca
        setTimeout(function() {
            overlay.style.opacity = '1'; // Fade in del overlay
            img.style.transform = 'scale(1.05)'; // Escala la imagen ligeramente para darle un efecto de zoom
        }, 50);

        // Eliminar el overlay después de 5 segundos
        setTimeout(function() {
            overlay.style.opacity = '0';  // Fade out el overlay
            img.style.transform = 'scale(1)'; // Revertir el efecto de zoom

            setTimeout(function() {
                overlay.remove();
                // Eliminar la imagen original completamente
                helper.doc('actualImage').setAttribute('src', '');  // Eliminar la imagen
                helper.doc('actualImage').style.display = 'none';  // Asegura que la imagen no quede visible
            }, 500);  // Espera 0.5 segundos para completar la animación de fade out
        }, 5000); // 5000 ms = 5 segundos

        // El resto del código para crear el rompecabezas...
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';

            let li = document.createElement('li');
            li.id = i;
            li.setAttribute('data-value', i);
            li.style.backgroundImage = 'url(' + image.src + ')';
            li.style.backgroundSize = (gridSize * 100) + '%';
            li.style.backgroundPosition = xpos + ' ' + ypos;
            li.style.width = 400 / gridSize + 'px';
            li.style.height = 400 / gridSize + 'px';

            li.setAttribute('draggable', 'true');
            li.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id);
            li.ondragover = (event) => event.preventDefault();
            li.ondrop = (event) => {
                let origin = helper.doc(event.dataTransfer.getData('data'));
                let dest = helper.doc(event.target.id);
                let p = dest.parentNode;

                if (origin && dest && p) {
                    let temp = dest.nextSibling;
                    let x_diff = origin.offsetLeft - dest.offsetLeft;
                    let y_diff = origin.offsetTop - dest.offsetTop;

                    if (y_diff == 0 && x_diff > 0) {
                        p.insertBefore(origin, dest);
                        p.insertBefore(temp, origin);
                    } else {
                        p.insertBefore(dest, origin);
                        p.insertBefore(origin, temp);
                    }

                    let vals = Array.from(helper.doc('sortable').children).map(x => x.id);
                    var now = new Date().getTime();
                    helper.doc('stepCount').textContent = ++imagePuzzle.stepCount;
                    document.querySelector('.timeCount').textContent = (parseInt((now - imagePuzzle.startTime) / 1000, 10));

                    if (isSorted(vals)) {
                        clearInterval(timeCont); // Detener el temporizador
                    
                        let tiempoRestante = parseInt(helper.doc('timerPanel').textContent, 10);
                        let movimientosRealizados = imagePuzzle.stepCount;
                    
                        // Calcular la puntuación usando la función
                        let puntos = calcularPuntuacion(tiempoRestante, movimientosRealizados);

                        estadoNivel=true;
                        
                        if (estadoNivel) {
                            monedas = 50;
                            mostrarModal("¡Ganaste!", `
                                Movimientos realizados: ${movimientosRealizados}<br>
                                Tiempo restante: ${tiempoRestante}s<br>
                                Puntuación obtenida: ${puntos}
                            `);
                            helper.doc('stepCount').textContent = movimientosRealizados;
                    
                        } else {
                            monedas = 0;
                            mostrarModal("¡Perdiste!", `
                                Movimientos realizados: ${movimientosRealizados}<br>
                                Tiempo restante: ${tiempoRestante}s<br>
                                Puntuación obtenida: ${puntos}
                            `);
                            helper.doc('stepCount').textContent = movimientosRealizados;
                        }

                        fetch('../../../resources/niveles/historialNivel.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                estadoNivel: estadoNivel,
                                tiempo: tiempoRestante,
                                puntos: puntos,
                                monedas: monedas,
                            })
                        })
                    }
                }
            };
            helper.doc('sortable').appendChild(li);
        }
        helper.shuffle('sortable');
    }
};

isSorted = (arr) => arr.every((elem, index) => { return elem == index; });

var helper = {
    doc: (id) => document.getElementById(id) || document.createElement("div"),

    shuffle: (id) => {
        var ul = document.getElementById(id);
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }
}

function calcularPuntuacion(tiempoRestante, movimientosRealizados) {
    let maxPuntos = 2000;
    let movimientosIdeales = 6;
    let tiempoTotal = timeMax;
    let factorTiempo = Math.max(0, (tiempoRestante + 10) / tiempoTotal);
    let factorMovimientos = Math.min(1, movimientosIdeales / movimientosRealizados); // Clamp entre 0 y 1

    // Calcular puntuación final
    let puntos = Math.round(maxPuntos * (factorTiempo + factorMovimientos) / 2);
    

    return puntos;
    
    
}

var images = [];

window.onload = function () {
    // Realizar la solicitud AJAX para obtener las imágenes del servidor
    fetch('../../../resources/rompecabezas/imagenes.php')
        .then(response => response.json())  // Parsear la respuesta JSON
        .then(data => {
            // Asignar los datos recibidos a la variable images
            images = data.map(item => ({
                src: `../../../img/rompecabezas/${item.imagen}`,    // URL de la imagen
                title: item.nombreImagen, // Nombre de la imagen
                area: item.area // Incluir el área desde la consulta
            }));

            // Tomar el área del primer objeto para usarlo como gridSize
            if (images.length > 0) {
                var gridSize = images[0].area; // Usar el valor de 'area' para definir el gridSize
                imagePuzzle.startGame(images, gridSize);
            } else {
                console.error('No se encontraron imágenes para este nivel.');
            }
        })
        .catch(error => {
            console.error('Error al cargar las imágenes:', error);
        });
};

// var images = [
//     { src: '../../../img/rompecabezas/ballena.jpg', title: 'CAZA DE BALLENA' },
//     { src: '../../../img/rompecabezas/barco.jpg', title: 'BARCO' },
//     { src: '../../../img/rompecabezas/barco.jpg', title: 'BALLENA' },
//     { src: 'images/arrecife.jpg', title: 'ARRECIFE' }
// ];

// window.onload = function () {
//     var gridSize = 3;  // Establece el valor de gridSize de forma fija
//     imagePuzzle.startGame(images, gridSize);
// };

// function restart() {
//     var gridSize = 3;
// }  // Establece el valor de gridSize de forma
