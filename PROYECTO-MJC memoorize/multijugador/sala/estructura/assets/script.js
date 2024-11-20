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
        const message = messageInput.value.trim();
        if (message) {
            socket.send(JSON.stringify({
                type: 'chat',
                username: username,
                content: message
            }));
            messageInput.value = '';
        }
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
