const boxes = document.querySelectorAll('.box');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

    boxes.forEach((box, index) => {
        box.textContent = shuffledNumbers[index];
    });
}

// Habilitar o deshabilitar el arrastre
function toggleDrag(enable) {
    boxes.forEach(box => {
        box.draggable = enable;
        box.style.cursor = enable ? 'grab' : 'not-allowed';
    });
}

// Función para iniciar el contador
function iniciarContador() {
    toggleDrag(false); // Deshabilitar el arrastre mientras dura el contador

    let tiempoRestante = 8; // tiempo en segundos
    document.getElementById('contador').textContent = tiempoRestante;

    let intervalo = setInterval(function() {
        tiempoRestante--;
        document.getElementById('contador').textContent = tiempoRestante;
        
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            document.getElementById('mensaje').textContent = "¡Tiempo agotado!";
            toggleDrag(true); // Habilitar el arrastre después de que termine el contador
        }
    }, 1000);
}

// Asignar números aleatorios al cargar la página
asignarNumeros();

// Eventos de arrastre
boxes.forEach(box => {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', drop);
});

let draggedElement = null;

function dragStart(event) {
    draggedElement = event.target;
    event.dataTransfer.effectAllowed = 'move';
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
    event.preventDefault();
    
    if (event.target.classList.contains('box') && event.target !== draggedElement) {
        const parent = event.target.parentNode;
        const nodes = Array.from(parent.children);
        const draggedIndex = nodes.indexOf(draggedElement);
        const targetIndex = nodes.indexOf(event.target);

        if (draggedIndex < targetIndex) {
            parent.insertBefore(draggedElement, event.target.nextSibling);
        } else {
            parent.insertBefore(draggedElement, event.target);
        }
    }
}
