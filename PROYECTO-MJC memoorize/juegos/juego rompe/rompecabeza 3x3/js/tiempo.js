var timerFunction;

var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (images, gridSize) {
        this.setImage(images, gridSize);
        helper.doc('playPanel').style.display = 'block';
        helper.shuffle('sortable');
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.tick();

        // Muestra la imagen completa durante 10 segundos y luego la oculta
        this.showFullImageForTime(5000); // 10000 milisegundos = 10 segundos
    },
    tick: function () {
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        helper.doc('timerPanel').textContent = elapsedTime;
        timerFunction = setTimeout(imagePuzzle.tick, 1000);
    },
    setImage: function (images, gridSize) {
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        helper.doc('imgTitle').innerHTML = image.title;
        helper.doc('actualImage').setAttribute('src', image.src);
        helper.doc('sortable').innerHTML = '';
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

                    if (y_diff === 0 && x_diff > 0) {
                        p.insertBefore(origin, dest);
                        p.insertBefore(temp, origin);
                    } else {
                        p.insertBefore(dest, origin);
                        p.insertBefore(origin, temp);
                    }

                    let vals = Array.from(helper.doc('sortable').children).map(x => x.id);
                    var now = new Date().getTime();
                    helper.doc('stepCount').textContent = ++imagePuzzle.stepCount;
                    document.querySelector('.timeCount').textContent = parseInt((now - imagePuzzle.startTime) / 1000, 10);

                    if (isSorted(vals)) {
                        helper.doc('actualImageBox').innerHTML = helper.doc('gameOver').innerHTML;
                        helper.doc('stepCount').textContent = imagePuzzle.stepCount;
                    }
                }
            };
            helper.doc('sortable').appendChild(li);
        }
        helper.shuffle('sortable');
    },
    
    showFullImageForTime: function (duration) {
        // Establece el tiempo inicial si no está definido
        if (!this.startTime) {
            this.startTime = new Date().getTime();
        }
    
        // Obtén el contenedor de la imagen
        var actualImageBox = helper.doc('actualImageBox');
        
        // Crea la estructura de la imagen solo una vez
        actualImageBox.innerHTML = `
            <img src="${helper.doc('actualImage').src}" alt="Imagen completa" />
            <p id="timeTaken">Tiempo Tomado: 0 segundos</p>
        `;
        
        // Muestra el contenedor de la imagen centrado
        actualImageBox.style.display = 'block';
    
        // Función para actualizar el tiempo de forma continua
        var updateTime = setInterval(function () {
            var now = new Date().getTime();
            var elapsedTime = parseInt((now - this.startTime) / 1000, 10);
            
            // Actualiza solo el texto con el tiempo transcurrido, no la imagen
            var timeElement = helper.doc('timeTaken');
            timeElement.innerHTML = `Tiempo Tomado: ${elapsedTime} segundos`;
        }.bind(this), 1000); // Actualiza cada segundo
    
        // Oculta la imagen después de "duration" milisegundos
        setTimeout(function () {
            clearInterval(updateTime); // Detén la actualización del tiempo
            actualImageBox.style.display = 'none';
        }, duration);
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
