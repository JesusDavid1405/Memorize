var timerFunction;

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
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        helper.doc('timerPanel').textContent = elapsedTime;
        timerFunction = setTimeout(imagePuzzle.tick, 1000);
    },
    setImage: function (images) {
        var gridSize = 5; // Cambiado a 5x5
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
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.opacity = '0';
        overlay.style.borderRadius = '20px';
        overlay.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.5)';

        var img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.style.maxWidth = '50%';
        img.style.maxHeight = '50%';
        img.style.objectFit = 'contain';
        img.style.transition = 'transform 1s ease';

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        setTimeout(function () {
            overlay.style.opacity = '1';
            img.style.transform = 'scale(1.05)';
        }, 50);

        setTimeout(function () {
            overlay.style.opacity = '0';
            img.style.transform = 'scale(1)';

            setTimeout(function () {
                overlay.remove();
                helper.doc('actualImage').setAttribute('src', '');
                helper.doc('actualImage').style.display = 'none';
            }, 500);
        }, 15000);

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
                        helper.doc('actualImageBox').innerHTML = helper.doc('gameOver').innerHTML;
                        helper.doc('stepCount').textContent = imagePuzzle.stepCount;
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
};
