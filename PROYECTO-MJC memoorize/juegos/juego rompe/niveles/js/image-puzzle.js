var timeCont;
var timeMax = 40;

var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (images) {
        this.setImage(images);
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

            if (timeReducion <= 0) {
                clearInterval(timeCont);
                helper.doc('actualImageBox').innerHTML = `
                    <h2>¡Se acabó el tiempo!</h2>
                    <p>Inténtalo de nuevo.</p>
                `;
            }
        }, 1000);
    },
    setImage: function (images) {
        var gridSize = 3;
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        helper.doc('imgTitle').innerHTML = image.title;
        helper.doc('actualImage').setAttribute('src', image.src);
        helper.doc('sortable').innerHTML = '';

        // Ocultar la imagen actual
        helper.doc('actualImage').style.display = 'none';

        // Crear overlay para mostrar imagen
        this.showOverlay(image);

        // Crear el rompecabezas
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';

            let li = document.createElement('li');
            li.id = i;
            li.setAttribute('data-value', i);
            li.style.backgroundImage = `url(${image.src})`;
            li.style.backgroundSize = `${gridSize * 100}%`;
            li.style.backgroundPosition = `${xpos} ${ypos}`;
            li.style.width = `${400 / gridSize}px`;
            li.style.height = `${400 / gridSize}px`;

            li.setAttribute('draggable', 'true');
            li.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id);
            li.ondragover = (event) => event.preventDefault();
            li.ondrop = (event) => this.handleDrop(event);

            helper.doc('sortable').appendChild(li);
        }
        helper.shuffle('sortable');
    },
    showOverlay: function (image) {
        var overlay = document.createElement('div');
        overlay.id = 'imageOverlay';
        overlay.style = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: rgba(0, 0, 0, 0.7); display: flex;
            align-items: center; justify-content: center; z-index: 9999; 
            opacity: 0; transition: opacity 0.5s ease;
        `;

        var img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.style = `
            max-width: 50%; max-height: 50%; object-fit: contain;
            transition: transform 1s ease; border-radius: 20px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
        `;

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = '1';
            img.style.transform = 'scale(1.05)';
        }, 50);

        setTimeout(() => {
            overlay.style.opacity = '0';
            img.style.transform = 'scale(1)';
            setTimeout(() => overlay.remove(), 500);
        }, 5000);
    },
    handleDrop: function (event) {
        let origin = helper.doc(event.dataTransfer.getData('data'));
        let dest = helper.doc(event.target.id);
        let p = dest.parentNode;

        if (origin && dest && p) {
            let temp = dest.nextSibling;
            let x_diff = origin.offsetLeft - dest.offsetLeft;
            let y_diff = origin.offsetTop - dest.offsetTop;

            if (y_diff === 0 && x_diff > 0) {
                p.insertBefore(origin, dest);
                p.insertBefore(temp, origin);
            } else {
                p.insertBefore(dest, origin);
                p.insertBefore(origin, temp);
            }

            let vals = Array.from(helper.doc('sortable').children).map(x => x.id);
            var now = new Date().getTime();
            helper.doc('stepCount').textContent = ++this.stepCount;

            if (isSorted(vals)) {
                clearInterval(timeCont);
                let tiempoRestante = parseInt(helper.doc('timerPanel').textContent, 10);
                let movimientosRealizados = this.stepCount;

                let puntos = calcularPuntuacion(tiempoRestante, movimientosRealizados);

                helper.doc('actualImageBox').innerHTML = `
                    <h2>¡Ganaste!</h2>
                    <p>Movimientos: ${movimientosRealizados}</p>
                    <p>Tiempo restante: ${tiempoRestante}s</p>
                    <p>Puntuación: ${puntos}</p>
                `;
            }
        }
    }
};

isSorted = (arr) => arr.every((elem, index) => elem == index);

var helper = {
    doc: (id) => document.getElementById(id) || document.createElement("div"),
    shuffle: (id) => {
        var ul = document.getElementById(id);
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }
};

function calcularPuntuacion(tiempoRestante, movimientosRealizados) {
    let maxPuntos = 2000;
    let movimientosIdeales = 6;
    let tiempoTotal = timeMax;
    let factorTiempo = Math.max(0, (tiempoRestante + 10) / tiempoTotal);
    let factorMovimientos = Math.min(1, movimientosIdeales / movimientosRealizados);

    return Math.round(maxPuntos * (factorTiempo + factorMovimientos) / 2);
}

window.onload = function () {
    fetch('../../../resources/rompecabezas/imagenes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(images => {
        var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
        imagePuzzle.startGame(images, gridSize);
    })
    .catch(error => console.error('Error al cargar imágenes:', error));
};

function restart() {
    window.onload();
}
