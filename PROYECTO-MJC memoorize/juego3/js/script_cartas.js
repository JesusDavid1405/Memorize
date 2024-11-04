const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    movimiento: document.querySelector('.moves'),
    tiempo: document.querySelector('.timer'),
    Iniciar: document.querySelector('button'),
    iniciarButton: document.getElementById('iniciarButton'),
    win: document.querySelector('.win'),
    siguienteRonda: document.getElementById('siguienteRonda'),
    dificultad: document.getElementById('dificultad'),
};

const state = {
    gameIniciar: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    currentRound: 0,
    maxRounds: parseInt(localStorage.getItem('rondas')) || 7,
    dificultad: parseInt(localStorage.getItem('dificultad')) || 'facil',
    scores: [], // Array para almacenar las puntuaciones
    basePoints: 1000, // Puntos base para cada ronda
    timeMultiplier: 2, // Puntos a restar por segundo
    moveMultiplier: 10, // Puntos a restar por movimiento
};

const updateSelectors = () => {
    selectors.boardContainer = document.querySelector('.board-container');
    selectors.board = document.querySelector('.board');
    selectors.movimiento = document.querySelector('.moves');
    selectors.tiempo = document.querySelector('.timer');
    selectors.Iniciar = document.querySelector('button');
    selectors.win = document.querySelector('.win');
    selectors.siguienteRonda = document.getElementById('siguienteRonda');
    selectors.dificultad = document.getElementById('dificultad');
};

const calculateScore = (moves, time) => {
    const score = Math.max(
        0, 
        state.basePoints - (moves * state.moveMultiplier) - (time * state.timeMultiplier)
    );
    return Math.round(score);
};

const saveScore = (playerName, moves, time, score) => {
    const scoreData = {
        playerName,
        round: state.currentRound + 1,
        moves,
        time,
        score,
        date: new Date().toLocaleString()
    };
    
    state.scores.push(scoreData);
    
    // Guardar en localStorage
    const savedScores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
    savedScores.push(scoreData);
    localStorage.setItem('memoryGameScores', JSON.stringify(savedScores));
};

const showScoreModal = (score) => {
    // Crear el contenido del modal
    const modalHTML = `
        <div class="score-modal">
            <div class="score-modal-content">
                <div class="score-modal-header">
                    <h2>¡Felicitaciones!</h2>
                    <div class="player-input">
                        <label for="playerName">Ingresa tu nombre:</label>
                        <input type="text" id="playerName" placeholder="Tu nombre">
                        <button id="saveScore" class="save-score-btn">Guardar Puntuación</button>
                    </div>
                </div>
                
                <div class="score-table-container">
                    <h3>Mejores Puntuaciones</h3>
                    <table class="score-table">
                        <thead>
                            <tr>
                                <th>Jugador</th>
                                <th>Ronda</th>
                                <th>Movimientos</th>
                                <th>Tiempo</th>
                                <th>Puntuación</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                ${state.currentRound < state.maxRounds ? `
                    <button id="nextRoundBtn" class="next-round-btn">Siguiente Ronda</button>
                ` : `
                    <button id="restartGameBtn" class="restart-game-btn">Reiniciar Juego</button>
                `}
            </div>
        </div>
    `;

    // Insertar el modal en el DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Actualizar la tabla de puntuaciones
    updateScoreTableInModal();

    // Manejar el guardado de la puntuación
    const saveScoreBtn = document.getElementById('saveScore');
    const playerNameInput = document.getElementById('playerName');
    const nextRoundBtn = document.getElementById('nextRoundBtn');
    const restartGameBtn = document.getElementById('restartGameBtn');

    saveScoreBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            saveScore(playerName, state.totalFlips, state.totalTime, score);
            saveScoreBtn.disabled = true;
            playerNameInput.disabled = true;
            updateScoreTableInModal();
        } else {
            alert('Por favor, ingresa tu nombre');
        }
    });

    if (nextRoundBtn) {
        nextRoundBtn.addEventListener('click', async () => {
            document.querySelector('.score-modal').remove();
            await resetGame();
        });
    }

    if (restartGameBtn) {
        restartGameBtn.addEventListener('click', () => {
            document.querySelector('.score-modal').remove();
            state.currentRound = 0;
            resetGame();
        });
    }
};

const updateScoreTableInModal = () => {
    const scoreTableBody = document.querySelector('.score-modal .score-table tbody');
    if (!scoreTableBody) return;

    const sortedScores = state.scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Mostrar solo los 10 mejores puntajes

    scoreTableBody.innerHTML = sortedScores.map(score => `
        <tr>
            <td>${score.playerName}</td>
            <td>${score.round}</td>
            <td>${score.moves}</td>
            <td>${score.time}s</td>
            <td>${score.score}</td>
        </tr>
    `).join('');
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

const generateGame = async () => {
    try {
        let largo;
        let ancho;
        let dimensions;

        if (state.dificultad === 'facil') {
            largo = 4;
            ancho = 3;
        } else if (state.dificultad === 'medio') {
            largo = 4;
            ancho = 4;
        } else if (state.dificultad === 'dificil') {
            largo = 6;
            ancho = 4;
        }

        dimensions = largo * ancho;

        if (dimensions % 2 !== 0) {
            throw new Error("La dimensión del tablero debe ser un número par.");
        }

        const images = await loadImagenes();
        const picks = pickRandom(images, (largo * ancho) / 2);
        const items = shuffle([...picks, ...picks]);
        
        const cards = `
            <div class="board" style="grid-template-columns: repeat(${largo}, auto)">
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
        
        updateSelectors();
        
    } catch (error) {
        console.error('Error al generar el juego:', error);
    }
};

const IniciarGame = () => {
    clearInterval(state.loop);

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
        
        if (flippedCards.length === 2) {
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

    selectors.iniciarButton.classList.remove('oculto');
    
    await generateGame();
    attachEventListeners();
};

const endGame = () => {
    clearInterval(state.loop);
    document.querySelector('.board-container').classList.add('flipped');
    
    const score = calculateScore(state.totalFlips, state.totalTime);
    showScoreModal(score);
};

state.currentRound++;
selectors.iniciarButton.classList.add('oculto');

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
        // Cargar puntuaciones guardadas
        const savedScores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
        state.scores = savedScores;
        
        state.dificultad = localStorage.getItem('dificultad') || 'facil';   
        await generateGame();
        attachEventListeners();
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
};

initGame();