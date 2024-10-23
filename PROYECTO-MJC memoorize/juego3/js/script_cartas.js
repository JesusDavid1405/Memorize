const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    movimiento: document.querySelector('.moves'),
    tiempo: document.querySelector('.timer'),
    Iniciar: document.querySelector('button'),
    win: document.querySelector('.win'),
    scoreTable: document.querySelector('.score-table')
};

const state = {
    gameIniciar: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
};

// Función para barajar las cartas
const shuffle = array => {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = clonedArray[i];
        clonedArray[i] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }
    return clonedArray;
};

// Función para seleccionar elementos aleatorios de un array
const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];
    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }
    return randomPicks;
};

// Cargar imágenes desde JSON
const loadImagenes = async () => {
    const response = await fetch('js/imagenes.json');
    const data = await response.json();
    return data.imagenes;
};

// Guardar la puntuación en LocalStorage
const saveScore = (playerName, moves, time) => {
    const scores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
    const newScore = {
        playerName,
        moves,
        time,
        date: new Date().toISOString()
    };
    scores.push(newScore);
    scores.sort((a, b) => {
        if (a.moves === b.moves) {
            return a.time - b.time;
        }
        return a.moves - b.moves;
    });
    const topScores = scores.slice(0, 10);
    localStorage.setItem('memoryGameScores', JSON.stringify(topScores));
};

// Mostrar las puntuaciones en una tabla
const displayScores = () => {
    const scores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
    const scoreHTML = `
        <h2>Mejores Puntuaciones</h2>
        <table>
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Jugador</th>
                    <th>Movimientos</th>
                    <th>Tiempo</th>
                </tr>
            </thead>
            <tbody>
                ${scores.map((score, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${score.playerName}</td>
                        <td>${score.moves}</td>
                        <td>${score.time}s</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    if (selectors.scoreTable) {
        selectors.scoreTable.classList.remove('oculto');
        selectors.scoreTable.innerHTML = scoreHTML;
    }
};

// Generar el tablero de juego
const generateGame = async () => {
    const dimensions = selectors.board.getAttribute('data-dimension');
    if (dimensions % 2 !== 0) {
        throw new Error("La dimensión del tablero debe ser un número par.");
    }

    const images = await loadImagenes(); // Cargar las imágenes del JSON
    const picks = pickRandom(images, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);

    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${item}" alt="Imagen de la carta" class="card-image">
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    const parser = new DOMParser().parseFromString(cards, 'text/html');
    selectors.board.replaceWith(parser.querySelector('.board'));
};

// Iniciar el juego
const IniciarGame = () => {
    state.gameIniciar = true;
    selectors.Iniciar.classList.add('disabled');

    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.movimiento.innerText = `${state.totalFlips} movimientos`;
        selectors.tiempo.innerText = `tiempo: ${state.totalTime} segundos`;
    }, 1000);
};

// Voltear las cartas nuevamente si no coinciden
const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });
    state.flippedCards = 0;
};

// Voltear la carta seleccionada
const flipCard = card => {
    state.flippedCards++;
    state.totalFlips++;

    if (!state.gameIniciar) {
        IniciarGame();
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped');
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }

        setTimeout(() => {
            flipBackCards();
        }, 500);
    }
    
    // Si todas las cartas han sido volteadas correctamente
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped');
            const playerName = prompt('¡Felicidades! Has ganado! Por favor, ingresa tu nombre:');
            if (playerName) {
                saveScore(playerName, state.totalFlips, state.totalTime);
                mostrarModal(playerName); // Muestra el modal con la información
            }
            clearInterval(state.loop);
        }, 1000);
    }
};

// Mostrar el modal con el resultado del jugador
const mostrarModal = (playerName) => {
    const modal = document.getElementById('modal');
    const modalBody = document.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <p>¡Felicidades ${playerName}! Has completado el juego.</p>
        <p>Movimientos: <span class="highlight">${state.totalFlips}</span></p>
        <p>Tiempo: <span class="highlight">${state.totalTime}</span> segundos</p>
    `;
    
    modal.classList.remove('oculto');
    
    // Ocultar el modal después de 5 segundos
    setTimeout(() => {
        modal.classList.add('oculto');
        displayScores(); // Muestra la tabla de puntuaciones después de cerrar el modal
    }, 5000);
    
    // Agregar evento para el botón "Continuar"
    document.getElementById('continuar').onclick = () => {
        modal.classList.add('oculto');
        displayScores(); // Muestra la tabla de puntuaciones al hacer clic en "Continuar"
    };
};

// Escuchar eventos en las cartas y el botón de inicio
const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent);
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            IniciarGame();
        }
    });
};

// Iniciar el juego al cargar las imágenes
loadImagenes().then(() => {
    generateGame();
    attachEventListeners();
    displayScores();
});
