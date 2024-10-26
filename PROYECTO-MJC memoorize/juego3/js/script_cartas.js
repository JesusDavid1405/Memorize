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

const updateSelectors = () => {
    selectors.boardContainer = document.querySelector('.board-container');
    selectors.board = document.querySelector('.board');
    selectors.movimiento = document.querySelector('.moves');
    selectors.tiempo = document.querySelector('.timer');
    selectors.Iniciar = document.querySelector('button');
    selectors.win = document.querySelector('.win');
    selectors.scoreTable = document.querySelector('.score-table');
    selectors.siguienteRonda = document.getElementById('siguienteRonda');
};

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
        const dimensions = selectors.board.getAttribute('data-dimension') || 4;
        if (dimensions % 2 !== 0) {
            throw new Error("La dimensión del tablero debe ser un número par.");
        }

        const images = await loadImagenes();
        const picks = pickRandom(images, (dimensions * dimensions) / 2);
        const items = shuffle([...picks, ...picks]);
        
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
        
        const boardContainer = document.querySelector('.board-container');
        boardContainer.innerHTML = cards;
        
        // Actualizar selectores después de regenerar el tablero
        updateSelectors();
        
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

    if (state.flippedCards <= 2) {  // Cambiado de '=' a '<='
        card.classList.add('flipped');
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
        
        if (flippedCards.length === 2) {  // Verificar que hay exactamente 2 cartas volteadas
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
    }

    // Verificar si todas las cartas están emparejadas
    const matchedCards = document.querySelectorAll('.card.matched');
    const totalCards = document.querySelectorAll('.card').length;
    
    if (matchedCards.length === totalCards) {
        setTimeout(endGame, 1000);
    }
};

const resetGame = async () => {
    state.flippedCards = 0;
    state.totalFlips = 0;
    state.totalTime = 0;
    state.gameIniciar = false;
    
    clearInterval(state.loop);
    
    const boardContainer = document.querySelector('.board-container');
    boardContainer.classList.remove('flipped');
    
    await generateGame();
    attachEventListeners();
};

const endGame = () => {
    clearInterval(state.loop);
    document.querySelector('.board-container').classList.add('flipped');

    const playerName = prompt('¡Felicidades! Has ganado esta ronda! Por favor, ingresa tu nombre:');
    if (playerName) {
        saveScore(playerName, state.totalFlips, state.totalTime);
        if (typeof mostrarModal === 'function') {
            mostrarModal(playerName);
        }
    }

    state.currentRound++;
    const siguienteRonda = document.getElementById('siguienteRonda');
    if (siguienteRonda) {
        siguienteRonda.classList.remove('oculto');
    }

    if (state.currentRound < state.maxRounds) {
        const siguienteRondaBtn = document.getElementById('siguienteRonda');
        if (siguienteRondaBtn) {
            siguienteRondaBtn.addEventListener('click', async function siguienteRondaHandler() {
                await resetGame();
                siguienteRondaBtn.classList.add('oculto');
                siguienteRondaBtn.removeEventListener('click', siguienteRondaHandler);
            });
        }
    } else {
        alert("¡Has completado todas las rondas!");
        state.currentRound = 0;
    }
};

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

initGame();