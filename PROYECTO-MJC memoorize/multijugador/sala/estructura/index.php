<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Sala de Espera - Chat</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-6">
                <h1 class="text-2xl font-bold mb-4">Sala de Espera</h1>
                
                <div id="chat-container" class="fixed bottom-4 right-4 z-10 w-80">
                    <div id="chat-toggle" class="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
                        Abrir Chat
                    </div>

                    <div id="chat-window" class="hidden bg-white border rounded-lg shadow-xl mt-2">
                        <div id="login-section" class="p-4">
                            <input type="text" id="username" placeholder="Ingresa tu nombre" 
                                class="w-full px-3 py-2 border rounded-lg mb-2">
                            <button id="login-btn" class="w-full bg-green-500 text-white py-2 rounded-lg">
                                Entrar al Chat
                            </button>
                        </div>

                        <div id="chat-section" class="hidden">
                            <div id="messages" class="h-96 overflow-y-auto p-4"></div>
                            <div class="border-t p-2 flex">
                                <input type="text" id="message-input" placeholder="Escribe un mensaje" 
                                    class="flex-grow px-3 py-2 border rounded-l-lg">
                                <button id="send-btn" class="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
    <script src="assets/script.js"></script>
</body>
</html>
