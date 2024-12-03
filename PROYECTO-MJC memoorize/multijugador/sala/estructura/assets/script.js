// Modify the WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

// Add error handling
socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

socket.onopen = () => {
    console.log('WebSocket connection established');
};


// Lista de palabras groseras personalizadas
const palabrasGroseras = [
    'idiota', 'tonto', 'estúpido', 'imbécil', 'pendejo', 'cabrón', 'zorra', 'maldito',
    'malnacido', 'desgraciado', 'hijo de puta', 'perra', 'zunga', 'culo', 'mierda',
    'huevón', 'puto', 'joder', 'carajo', 'chingar','gonorrea','hp','sapa','pene','puchaina','vagina'
];

// Función para filtrar el mensaje
function filtrarMensaje(mensaje) {
    let mensajeFiltrado = mensaje;
    palabrasGroseras.forEach(palabra => {
        const regex = new RegExp(palabra, 'gi'); // Crea una expresión regular para buscar la palabra sin importar mayúsculas/minúsculas
        mensajeFiltrado = mensajeFiltrado.replace(regex, '*'.repeat(palabra.length)); // Reemplaza la palabra por asteriscos
    });
    return mensajeFiltrado;
}

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const loginSection = document.getElementById('login-section');
    const chatSection = document.getElementById('chat-section');
    const usernameInput = document.getElementById('username');
    const loginBtn = document.getElementById('login-btn');
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    const socket = new WebSocket('ws://localhost:8080');
    let username = '';

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    loginBtn.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (username) {
            loginSection.classList.add('hidden');
            chatSection.classList.remove('hidden');
            socket.send(JSON.stringify({
                type: 'nuevo-usuario',
                username: username
            }));
        }
    });

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        let message = messageInput.value.trim();
        if (message) {
            // Filtra el mensaje antes de enviarlo
            message = filtrarMensaje(message);

            socket.send(JSON.stringify({
                type: 'chat',
                username: username,
                content: message
            }));
            messageInput.value = '';
        }
    }

    // Función para leer mensajes usando la API de SpeechSynthesis
    function readMessage(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'es-ES'; // Puedes cambiar el idioma si es necesario
        speechSynthesis.speak(utterance);
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        let messageElement = document.createElement('div');

        switch(data.type) {
            case 'chat':
                messageElement.innerHTML = `
                    <strong>${data.username}:</strong> 
                    ${data.content}
                `;
                messageElement.classList.add(
                    'mb-2', 
                    data.username === username ? 'text-blue-600' : 'text-gray-800'
                );

                // Leer el mensaje en voz alta
                if (data.username !== username) { // Solo leer los mensajes de otros usuarios
                    readMessage(`${data.username} dice: ${data.content}`);
                }
                break;

            case 'usuario-conectado':
                messageElement.innerHTML = `🟢 ${data.username} se unió al chat`;
                messageElement.classList.add('text-center', 'text-green-500', 'italic');
                break;

            case 'usuario-desconectado':
                messageElement.innerHTML = `🔴 ${data.username} abandonó el chat`;
                messageElement.classList.add('text-center', 'text-red-500', 'italic');
                break;
        }

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
});
document.addEventListener("DOMContentLoaded", function () {
    const texto = "Sala de espera"
    const velocidad = 120; // Velocidad de escritura en milisegundos
    const elemento = document.getElementById("menutitle");
    let index = 0;


function menutitle () {
        if (index < texto.length) {
            elemento.textContent += texto[index];
            index++;
            setTimeout(menutitle, velocidad);
        }
    }

    menutitle ();
});
