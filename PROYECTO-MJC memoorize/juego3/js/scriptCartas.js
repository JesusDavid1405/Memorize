//NO TOCAR ESTO ES LA FUNCIONALIDAD DE MULTIJUGADORRR

// Configuración WebSocket
const socket = new WebSocket('ws://localhost:8080/game');
// Al recibir mensajes de otro jugador
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    handleIncomingMessage(message);
};
// Función para enviar mensajes al servidor WebSocket
const sendMessage = (data) => {
    socket.send(JSON.stringify(data));
};

// Unified function to fetch room data and initialize game state
const initializeGameState = async () => {
    try {
        const response = await fetch('../resources/llamarDatos/obtenerSala.php');
        const data = await response.json();

        if (data.status === 'true') {
            // Update global state with room configuration
            state.dificultad = data.dificultad.toLowerCase();
            state.maxRounds = parseInt(data.rondas);

            // Configure card settings based on difficulty
            switch (state.dificultad) {
                case 'facil':
                    state.baseCards = 8;
                    state.cardsPerRound = 2;
                    state.baseTime = 50;
                    break;
                case 'medio':
                    state.baseCards = 12;
                    state.cardsPerRound = 3;
                    state.baseTime = 45;
                    break;
                case 'dificil':
                    state.baseCards = 18;
                    state.cardsPerRound = 4;
                    state.baseTime = 35;
                    break;
                default:
                    throw new Error('Dificultad no válida');
            }

            // Initialize WebSocket after state configuration
            initializeWebSocket();

            return true;
        } else {
            console.error("No se pudieron obtener los datos de la sala:", data.mensaje);
            return false;
        }
    } catch (error) {
        console.error("Error al inicializar el estado del juego:", error);
        return false;
    }
};

// WebSocket initialization function
const initializeWebSocket = () => {
    const socket = new WebSocket('ws://localhost:8080/game');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        handleIncomingMessage(message);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Attach send message method to global state
    state.sendMessage = (data) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
        }
    };
};

// Modified state object with consolidated properties
const state = {
    gameIniciar: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    currentRound: 1,
    maxRounds: 6,
    dificultad: 'facil',
    scores: [],
    basePoints: 1000,
    timeMultiplier: 2,
    moveMultiplier: 10,
    currentPlayerName: '',
    cumulativeScore: 0,
    sendMessage: null  // Will be set by initializeWebSocket
};

// Función para actualizar los selectores del DOM
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

// Función para inicializar el juego
const initGame = async () => {
    try {
        const savedScores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
        state.scores = savedScores;
        state.currentRound = 1;
        state.dificultad = localStorage.getItem('dificultad') || 'facil';   
        
        // Wait for game state initialization
        const initialized = await initializeGameState();
        
        if (initialized) {
            await generateGame();
            attachEventListeners();
        }
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
};

const getCardsForCurrentRound = () => {
    return state.baseCards + (state.cardsPerRound * (state.currentRound - 1));
};


// Función para iniciar el juego
const IniciarGame = () => {
    clearInterval(state.loop);

    state.gameIniciar = true;
    selectors.Iniciar.classList.add('disabled');

    state.totalTime = state.baseTime || 40;  // Fallback to 40 if baseTime not set
    state.loop = setInterval(() => {
        selectors.movimiento.innerText = `${state.totalFlips} movimientos`;
        selectors.tiempo.innerText = `tiempo: ${state.totalTime} segundos`;

        state.totalTime--;
        if (state.totalTime <= -1) {
            clearInterval(state.loop);
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡se acabo el tiempo!",
                showConfirmButton: false,
                footer: `
                    <div class="modal-footer">
                        <button id="verPuntuacion" class="swal2-confirm swal2-styled">Ver Puntuación</button>
                        <a href="../menu/index.html" class="salir swal2-styled">Salir</a>
                    </div>
                `,
                didRender: () => {
                    const verPuntuacionBtn = document.getElementById('verPuntuacion');
                    verPuntuacionBtn.addEventListener('click', () => {
                        Swal.close();
                        endGame(50); // Pasar 50 puntos como puntuación por defecto
                    });
                }
            });  
        }
    }, 1000);
};

// Initialize the game
document.addEventListener('DOMContentLoaded', initGame);






// Función para calcular las dimensiones del tablero
const calculateBoardSize = () => {
    const totalCards = getCardsForCurrentRound();

    let largo = Math.ceil(Math.sqrt(totalCards));
    let ancho = Math.ceil(totalCards / largo);

    // Asegurarse de que el número total de celdas sea par
    if ((largo * ancho) % 2 !== 0) {
        ancho++;
    }

    return { largo, ancho };
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

        updateSelectors(); // Asegúrate de que esta función esté definida

    } catch (error) {
        console.error('Error al generar el juego:', error);
    }
};


// Función para iniciar el juego


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
                            <p>Cartas en esta ronda: ${totalCards}</p>
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
                    <div class="countdown">
                        <p>Siguiente ronda en <span id="countdown">5</span> segundos...</p>
                    </div>
                ` : `
                    <div class="game-over-message">
                        <h3>¡Juego Terminado!</h3>
                        <p>Mejor puntuación: ${bestScore.cumulativeScore} puntos</p>
                        <p>Conseguida por: ${bestScore.playerName}</p>
                        <p>En la ronda: ${bestScore.currentRound}</p>
                    
                        <button>
                <a href="../menu/index.html" class="btn-exit">Salir</a>
            </button>
                    </div>
                `}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    updateScoreTableInModal();

    const saveScoreBtn = document.getElementById('saveScore');
    const playerNameInput = document.getElementById('playerName');

    if (saveScoreBtn && playerNameInput) {
        saveScoreBtn.addEventListener('click', () => {
            const playerName = playerNameInput.value.trim();
            if (playerName) {
                state.currentPlayerName = playerName;
                saveScore(playerName, roundScore);
                saveScoreBtn.disabled = true;
                playerNameInput.disabled = true;
                updateScoreTableInModal();
                
                if (state.currentRound < state.maxRounds) {
                    startCountdown();
                }
            } else {
                alert('Por favor, ingresa tu nombre');
            }
        });
    } else if (state.currentPlayerName) {
        saveScore(state.currentPlayerName, roundScore);
        updateScoreTableInModal();
        
        if (state.currentRound < state.maxRounds) {
            startCountdown();
        }
    }
      if (exitGameBtn) {
        exitGameBtn.addEventListener('click', () => {
            document.querySelector('.score-modal').remove();
            // Aquí puedes agregar la lógica para volver al menú principal o reiniciar el juego
            
        });
    }
};

// Nueva función para manejar la cuenta regresiva
const startCountdown = () => {
    const countdownElement = document.getElementById('countdown');
    let timeLeft = 5;
    
    const countdownInterval = setInterval(() => {
        timeLeft--;
        if (countdownElement) {
            countdownElement.textContent = timeLeft;
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.querySelector('.score-modal').remove();
            state.currentRound++;
            resetGame();
        }
    }, 1000);
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
const endGame = (roundScore = null) => {
    clearInterval(state.loop);
    document.querySelector('.board-container').classList.add('flipped');

      // Si no se da una puntuación, calcular normalmente
    if (roundScore === null) {
        roundScore = calculateScore(state.totalFlips, state.totalTime);
    }
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


// Inicializar el juego
initGame()



// state.gameIniciar = true;
//     selectors.Iniciar.classList.add('disabled');
//     if (state.dificultad = 'facil'){ 
//     state.totalTime = 50;
//     }else if(state.dificultad = 'medio'){
//     state.totalTime = 45;
//     }else
//     state.totalTime = 35;
