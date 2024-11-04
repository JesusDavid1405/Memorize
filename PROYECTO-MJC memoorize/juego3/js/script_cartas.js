// Objeto que contiene todas las referencias a elementos del DOM
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

// Estado global del juego
const state = {
    gameIniciar: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    currentRound: 1,
    maxRounds: parseInt(localStorage.getItem('rondas')) || 7,
    dificultad: localStorage.getItem('dificultad') || 'facil',
    scores: [],
    basePoints: 1000,
    timeMultiplier: 2,
    moveMultiplier: 10,
    currentPlayerName: '',
    cumulativeScore: 0,
    baseCards: 12, // Número inicial de cartas para modo fácil (6 pares)
    cardsPerRound: 4  // Número de cartas adicionales por ronda (2 pares)
};

// Función para actualizar los selectores del DOM
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

// Función para obtener el número de cartas según la ronda actual
const getCardsForCurrentRound = () => {
    if (state.dificultad === 'facil') {
        return state.baseCards + (state.cardsPerRound * (state.currentRound - 1));
    } else if (state.dificultad === 'medio') {
        return 16; // 4x4
    } else { // dificil
        return 24; // 6x4
    }
};

// Función para calcular las dimensiones del tablero
const calculateBoardSize = () => {
    const totalCards = getCardsForCurrentRound();
    
    if (state.dificultad === 'facil') {
        // Calcular las dimensiones óptimas para el número de cartas

        let largo = Math.ceil(Math.sqrt(totalCards));
        let ancho = Math.ceil(totalCards / largo);
        
        // Asegurarse de que el número total de celdas sea par
        if ((largo * ancho) % 2 !== 0) {
            ancho++;
        }
        
        return { largo, ancho };
    } else if (state.dificultad === 'medio') {
        return { largo: 4, ancho: 4 };
    } else { // dificil
        return { largo: 6, ancho: 4 };
    }
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

// Función para mezclar un array
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

// Función para cargar las imágenes del juego
const loadImagenes = async () => {
    const response = await fetch('js/imagenes.json');
    const data = await response.json();
    return data.imagenes;
};

// Función para generar el tablero de juego
const generateGame = async () => {
    try {
        const { largo, ancho } = calculateBoardSize();
        const dimensions = largo * ancho;

        if (dimensions % 2 !== 0) {
            throw new Error("La dimensión del tablero debe ser un número par.");
        }

        const images = await loadImagenes();
        const picks = pickRandom(images, dimensions / 2);
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

// Función para iniciar el juego
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

// Función para voltear las cartas hacia atrás
const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });
    state.flippedCards = 0;
};

// Función para voltear una carta
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

// Función para reiniciar el juego
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

// Función para calcular la puntuación
const calculateScore = (moves, time) => {
    const score = Math.max(
        0, 
        state.basePoints - (moves * state.moveMultiplier) - (time * state.timeMultiplier)
    );
    return Math.round(score);
};

// Función para guardar la puntuación
const saveScore = (playerName, roundScore) => {
    if (state.currentRound === 1 || state.currentPlayerName !== playerName) {
        state.cumulativeScore = 0;
        state.currentPlayerName = playerName;
    }
    
    state.cumulativeScore += roundScore;
    
    const scoreData = {
        playerName,
        currentRound: state.currentRound,
        cumulativeScore: state.cumulativeScore,
        lastUpdate: new Date().toLocaleString()
    };
    
    const existingScoreIndex = state.scores.findIndex(s => s.playerName === playerName);
    if (existingScoreIndex !== -1) {
        state.scores[existingScoreIndex] = scoreData;
    } else {
        state.scores.push(scoreData);
    }
    
    localStorage.setItem('memoryGameScores', JSON.stringify(state.scores));
};

// Función para mostrar el modal de puntuación
const showScoreModal = (roundScore) => {
    const totalCards = getCardsForCurrentRound();
    const { largo, ancho } = calculateBoardSize();
    
    // Encontrar la mejor puntuación
    const bestScore = state.scores.reduce((best, current) => {
        return (current.cumulativeScore > best.cumulativeScore) ? current : best;
    }, { cumulativeScore: 0, currentRound: 0, playerName: 'Ninguno' });

    const modalHTML = `
        <div class="score-modal">
            <div class="score-modal-content">
                <div class="score-modal-header">
                    <h2>¡Felicitaciones!</h2>
                    <div class="round-info">
                        <p>Ronda ${state.currentRound} de ${state.maxRounds}</p>
                        ${state.dificultad === 'facil' ? `
                            <p>Cartas en esta ronda: ${totalCards} (${totalCards/2} pares)</p>
                            <p>Tablero: ${largo}x${ancho}</p>
                        ` : ''}
                    </div>
                    ${!state.currentPlayerName ? `
                        <div class="player-input">
                            <label for="playerName">Ingresa tu nombre:</label>
                            <input type="text" id="playerName" placeholder="Tu nombre">
                            <button id="saveScore" class="save-score-btn">Guardar Puntuación</button>
                        </div>
                    ` : `
                        <div class="score-info">
                            <p>Jugador: ${state.currentPlayerName}</p>
                            <p>Puntuación de esta ronda: ${roundScore}</p>
                            <p>Puntuación total: ${state.cumulativeScore + roundScore}</p>
                        </div>
                    `}
                </div>
                
                <div class="score-table-container">
                    <h3>Mejores Puntuaciones</h3>
                    <table class="score-table">
                        <thead>
                            <tr>
                                <th>Jugador</th>
                                <th>Ronda</th>
                                <th>Puntuación Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                ${state.currentRound < state.maxRounds ? `
                    <button id="siguienteRonda" class="next-round-btn">Siguiente Ronda</button>
                ` : `
                    <div class="game-over-message">
                        <h3>¡Juego Terminado!</h3>
                        <p>Mejor puntuación: ${bestScore.cumulativeScore} puntos</p>
                        <p>Conseguida por: ${bestScore.playerName}</p>
                        <p>En la ronda: ${bestScore.currentRound}</p>
                    </div>
                `}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    updateScoreTableInModal();

    const saveScoreBtn = document.getElementById('saveScore');
    const playerNameInput = document.getElementById('playerName');
    const siguienteRonda = document.getElementById('siguienteRonda');

    if (saveScoreBtn && playerNameInput) {
        saveScoreBtn.addEventListener('click', () => {
            const playerName = playerNameInput.value.trim();
            if (playerName) {
                state.currentPlayerName = playerName;
                saveScore(playerName, roundScore);
                saveScoreBtn.disabled = true;
                playerNameInput.disabled = true;
                updateScoreTableInModal();
            } else {
                alert('Por favor, ingresa tu nombre');
            }
        });
    } else if (state.currentPlayerName) {
        saveScore(state.currentPlayerName, roundScore);
        updateScoreTableInModal();
    }

    if (siguienteRonda) {
        siguienteRonda.addEventListener('click', async () => {
            document.querySelector('.score-modal').remove();
            state.currentRound++;
            await resetGame();
        });
    }
};

// Función para actualizar la tabla de puntuaciones en el modal
const updateScoreTableInModal = () => {
    const scoreTableBody = document.querySelector('.score-modal .score-table tbody');
    if (!scoreTableBody) return;

    const sortedScores = state.scores
        .sort((a, b) => b.cumulativeScore - a.cumulativeScore)
        .slice(0, 10);

    scoreTableBody.innerHTML = sortedScores.map(score => `
        <tr>
            <td>${score.playerName}</td>
            <td>${score.currentRound}</td>
            <td>${score.cumulativeScore}</td>
        </tr>
    `).join('');
};

// Función para terminar el juego
const endGame = () => {
    clearInterval(state.loop);
    document.querySelector('.board-container').classList.add('flipped');
    const roundScore = calculateScore(state.totalFlips, state.totalTime);
    showScoreModal(roundScore);
};

// Función para adjuntar los event listeners
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

// Función para inicializar el juego
const initGame = async () => {
    try {
        const savedScores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
        state.scores = savedScores;
        state.currentRound = 1;
        state.dificultad = localStorage.getItem('dificultad') || 'facil';   
        await generateGame();
        attachEventListeners();
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
};

// Inicializar el juego
initGame();