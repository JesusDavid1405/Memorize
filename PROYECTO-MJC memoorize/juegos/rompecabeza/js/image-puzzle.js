
var timerFunction; /**para almacenar la función del temporizado */

var imagePuzzle = {
    stepCount: 0, /** Cuenta el número de movimientos realizados por el jugador */
    startTime: new Date().getTime(), /**Registra el tiempo en que comienza el juego */
    startGame: function (images, gridSize) { /**Inicializa el juego, seleccionando una imagen y configurando el tamaño del grid */
        this.setImage(images, gridSize);
        helper.doc('playPanel').style.display = 'block'; /** aqui es donde muestra el panel del juego */
        helper.shuffle('sortable'); /**para barajar cartas */
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.tick();
    },
    tick: function () { /**para iniciar el temporizador. */
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        helper.doc('timerPanel').textContent = elapsedTime; /**Actualiza el contenido del panel de temporizador */
        timerFunction = setTimeout(imagePuzzle.tick, 1000);
    },
    setImage: function (images, gridSize = 4) {
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        helper.doc('imgTitle').innerHTML = image.title;
        helper.doc('actualImage').setAttribute('src', image.src);
        helper.doc('sortable').innerHTML = '';
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';

            let li = document.createElement('li'); /**Cada li tiene un fondo que es una parte de la imagen */
            li.id = i;
            li.setAttribute('data-value', i);
            li.style.backgroundImage = 'url(' + image.src + ')';
            li.style.backgroundSize = (gridSize * 100) + '%';
            li.style.backgroundPosition = xpos + ' ' + ypos;
            li.style.width = 400 / gridSize + 'px';
            li.style.height = 400 / gridSize + 'px';
             /**Cada li tiene un fondo que es una parte de la imagen */

            li.setAttribute('draggable', 'true');
            li.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id); /**al iniciar el arrastre, guarda el ID del elemento que se está arrastrando */
            li.ondragover = (event) => event.preventDefault(); /**este ondragover permite que el destino acepte el elemento arrastrado */
            li.ondrop = (event) => { /**este ondrop gestiona el comportamiento al soltar un elemento */
                
                 /**Se configura para que sea arrastrable*/
                let origin = helper.doc(event.dataTransfer.getData('data')); /**Obtiene el ID del elemento que se está arrastrando desde el evento de transferencia de datos(dataTransfer)*/
                /**Aqui tambien se usa helper.doc para obtener el elemento del DOM correspondiente a ese ID. */
                let dest = helper.doc(event.target.id); /**aqui obtiene el ID del elemento de destino (donde se está soltando el elemento arrastrado) */
                /**aqui de nuevo, uso helper.doc para acceder al elemento en el DOM. */
                let p = dest.parentNode; /**aqui es donde se almacena el nodo padre del elemento de destino (dest). Esto es necesario para poder reordenar los hijos de este contenedor */

                /**Verificación y Cambio de Posición */
                if (origin && dest && p) { /**aqui se verifica que los elementos origin, dest, y su padre 'p' existan antes de proceder. Esto previene errores si alguno de los elementos no está definido. */
                    let temp = dest.nextSibling;/**este let guarda la referencia al siguiente elemento de destino. Esto se utilizará para intercambiar posiciones. */
                    let x_diff = origin.offsetLeft-dest.offsetLeft; /**este let calcula la diferencia en la posición horizontal (izquierda/derecha) entre el elemento arrastrado y el de destino*/
                    let y_diff = origin.offsetTop-dest.offsetTop;/**aqui calcula la diferencia en la posición vertical (arriba/abajo). */

                    if(y_diff == 0 && x_diff >0){ /**Comprueba si el movimiento es solo horizontal (sin movimiento vertical) y si se mueve a la izquierda. Si es así, se considera un "intercambio a la izquierda" */
                        //LEFT SWAP
                        p.insertBefore(origin, dest); /**este insertBefore mueve el elemento arrastrado (origin) antes del elemento de destino (dest) */
                        p.insertBefore(temp, origin);/**este insertBefore mueve el siguiente hermano del destino (temp) antes del elemento arrastrado. Esto completa el intercambio */
                    }
                    else{ /**Si el movimiento no es un intercambio a la izquierda, se maneja el caso en que el elemento arrastrado se mueve a la derecha o verticalmente. */
                        p.insertBefore(dest, origin); /**mueve el elemento de destino antes del arrastrado */
                        p.insertBefore(origin, temp); /**luego coloca el elemento arrastrado en su nueva posición, completando el intercambio */
                    }

               //Actualización del Estado del Juego

                    let vals = Array.from(helper.doc('sortable').children).map(x => x.id); /**Crea un arreglo vals que contiene los IDs de todos los hijos del contenedor sortable, que representa el estado actual del rompecabezas. */
                    var now = new Date().getTime();/**aqui obtiene el tiempo actual para calcular cuánto tiempo ha pasado desde que comenzó el juego */
                    helper.doc('stepCount').textContent = ++imagePuzzle.stepCount; /**aqui es donde incrementa el contador de movimientos y actualiza el panel que muestra el número de movimientos realizados */
                    document.querySelector('.timeCount').textContent = (parseInt((now - imagePuzzle.startTime) / 1000, 10)); /**aqui es donde calcula y actualiza el tiempo transcurrido en segundos, mostrándolo en el panel correspondiente */

                    if (isSorted(vals)) { /** con esta if es donde se comprueba si el rompecabezas está resuelto usando la función isSorted, que verifica si todos los elementos están en el orden correcto */
                        // helper.doc('actualImageBox').style.display = 'none';
                        // helper.doc('gameOver').style.display = 'block';
                        helper.doc('actualImageBox').innerHTML = helper.doc('gameOver').innerHTML; /**Si el rompecabezas está resuelto, reemplaza el contenido del contenedor de la imagen actual con el contenido del contenedor de "Game Over", lo que puede mostrar un mensaje o una imagen. */
                        helper.doc('stepCount').textContent = imagePuzzle.stepCount; /**aqui es donde actualiza el panel de los movimientos con el número total de movimientos realizados al finalizar el juego. */
                    }
                }
            };
            li.setAttribute('dragstart', 'true'); /**Esta línea intenta establecer un atributo llamado dragstart con el valor 'true' en el elemento li.  */
            helper.doc('sortable').appendChild(li);/** Esto es lo que finalmente muestra la pieza en el DOM, haciendo que el rompecabezas sea visible para el usuario. */
        }
        helper.shuffle('sortable');/**Este método reorganiza aleatoriamente las piezas dentro del contenedor para que el juego comience en un estado desordenado */
    }
};

isSorted = (arr) => arr.every((elem, index) => { return elem == index; });/**Esta es una función que toma un arreglo arr como argumento y devuelve true si todos los elementos en el arreglo están en el orden correcto (de 0 a n-1) */
/**Usa el método every, que comprueba si todos los elementos del arreglo cumplen con la condición especificada en la función */

var helper = {
    doc: (id) => document.getElementById(id) || document.createElement("div"), /**Esto asegura que no se produzcan errores si se busca un ID que no está presente en el DOM. */

    shuffle: (id) => { /**Este método toma el ID de un contenedor (id) y reorganiza aleatoriamente sus elementos hijos (por ejemplo, las piezas del rompecabezas) */
        //Dentro de este método:
        var ul = document.getElementById(id); /**Se obtiene el contenedor ul con el ID especificado. */
       
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
             /**Un bucle recorre los hijos del contenedor de forma inversa (desde el último hasta el primero) y usa Math.random() para seleccionar un hijo aleatorio y moverlo al final del contenedor, 
         * lo que efectivamente baraja las piezas. */
        }
    }
}
