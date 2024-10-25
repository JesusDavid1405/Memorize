const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    movimiento: document.querySelector('.moves'),
    tiempo: document.querySelector('.timer'),
    Iniciar: document.querySelector('button'),
    win: document.querySelector('.win'),
    scoreTable: document.querySelector('.score-table'),
    siguienteRonda: document.getElementById('siguienteRonda')   

};

const state = {
    gameIniciar: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    currentRound: 0,
    maxRounds: parseInt(localStorage.getItem('rondas')) || 6
};

// Función para seleccionar cartas aleatorias
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

const loadImagenes = async () => {
    const response = await fetch('js/imagenes.json');
    const data = await response.json();
    return data.imagenes;
};

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

const generateGame = async () => {
    try {
        const dimensions = selectors.board.getAttribute('data-dimension') || 4; // Valor por defecto
        if (dimensions % 2 !== 0) {
            throw new Error("La dimensión del tablero debe ser un número par.");
        }

        const images = await loadImagenes();
        const picks = pickRandom(images, (dimensions * dimensions) / 2);
        const items = shuffle([...picks, ...picks]);
        
        // Crear el nuevo contenido del tablero
        const cards = `
            <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)" data-dimension="${dimensions}">
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

        // Actualizar el contenido del tablero
        selectors.board.innerHTML = cards;
        
        // Actualizar el selector del tablero después de regenerarlo
        selectors.board = document.querySelector('.board');
        
    } catch (error) {
        console.error('Error al generar el juego:', error);
    }
};

const IniciarGame = () => {
    state.gameIniciar = true;
    selectors.Iniciar.classList.add('disabled');

    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.movimiento.innerText = `${state.totalFlips} movimientos`;
        selectors.tiempo.innerText = `tiempo: ${state.totalTime} segundos`;
    }, 1000);
};

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });
    state.flippedCards = 0;
};

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
        
        // Verificar si las cartas coinciden comparando las URLs de las imágenes
        const img1 = flippedCards[0].querySelector('.card-back img').src;
        const img2 = flippedCards[1].querySelector('.card-back img').src;
        
        if (img1 === img2) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }

        setTimeout(() => {
            flipBackCards();
        }, 500);
    }

    // Verificar si todas las cartas están emparejadas
    const matchedCards = document.querySelectorAll('.card.matched'); // Asegúrate de que sea el selector correcto
    const totalPairs = selectors.board.children.length / 2; // Total de pares en el tablero

    if (matchedCards.length === totalPairs) {
        setTimeout(endGame, 1000);
    }
};


const resetGame = async () => {
    state.flippedCards = 0;
    state.totalFlips = 0;
    state.totalTime = 0;
    state.gameIniciar = false;
    
    clearInterval(state.loop);
    
    // Limpiar el tablero actual
    selectors.board.innerHTML = '';
    selectors.boardContainer.classList.remove('flipped');
    selectors.Iniciar.classList.remove('disabled');
    
    // Generar nuevo juego
    await generateGame();
};

const endGame = () => {
    clearInterval(state.loop);
    selectors.boardContainer.classList.add('flipped');

    const playerName = prompt('¡Felicidades! Has ganado esta ronda! Por favor, ingresa tu nombre:');
    if (playerName) {
        saveScore(playerName, state.totalFlips, state.totalTime);
        mostrarModal(playerName);
    }

    state.currentRound++;

    selectors.siguienteRonda.addEventListener('click', async function() {
        await resetGame(); // Reiniciar el juego para la siguiente ronda
        selectors.siguienteRonda.classList.add('oculto'); // Ocultar el botón
    
        if (state.currentRound < state.maxRounds) {
            selectors.Iniciar.classList.add('disabled'); // Desactivar el botón Iniciar si ya hay un ganador
        } else {
            alert("¡Has completado todas las rondas!");
            // Reiniciar el contador de rondas
            state.currentRound = 0;
        }
    });
}
    
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

// Inicialización del juego
const initGame = async () => {
    try {
        await generateGame();
        attachEventListeners();
        if (typeof displayScores === 'function') {
            displayScores();
        }
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
};

// Iniciar el juego
initGame();