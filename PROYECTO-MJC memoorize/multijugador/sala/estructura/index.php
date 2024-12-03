<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Sala de Espera - Chat</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/styles.css">

    <link href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../../bootstrap/css/bootstrap.css">
    </head>
</head>

<body class="bg-gray-100">
<h1 id="menutitle"></h1>
<div class="multiplayer-container">
        <div class="avatars" id="players">
            <div class="avatar" title="Avatar 1">
                <img src="../../../img/icon/avatar15.png" alt="Avatar 1">
                <div class="avatar-name">Jugador 1</div>
            </div>
            <div class="avatar" title="Avatar 2">
                <img src="../../../img/icon/avatar2.png" alt="Avatar 2">
                <div class="avatar-name">Jugador 2</div>
            </div>
            <div class="avatar" title="Avatar 16">
                <img src="../../../img/icon/avatar16.png" alt="Avatar 16">
                <div class="avatar-name">Jugador 3</div>
            </div>
            <div class="avatar" title="Avatar 4">
                <img src="../../../img/icon/avatar4.png" alt="Avatar 4">
                <div class="avatar-name">Jugador 4</div>
            </div>
            <div class="avatar" title="Avatar 13">
                <img src="../../../img/icon/avatar13.png" alt="Avatar 13">
                <div class="avatar-name">Jugador 5</div>
            </div>
            <div class="avatar" title="Avatar 11">
                <img src="../../../img/icon/avatar11.png" alt="Avatar 11">
                <div class="avatar-name">Jugador 6</div>
            </div>
            <div class="avatar" title="Avatar 14">
                <img src="../../../img/icon/avatar14.png" alt="Avatar 14">
                <div class="avatar-name">Jugador 7</div>
            </div>
            <div class="avatar" title="Avatar 12">
                <img src="../../../img/icon/avatar12.png" alt="Avatar 12">
                <div class="avatar-name">Jugador 8</div>
            </div>
            <div class="avatar" title="Avatar 9">
                <img src="../../../img/icon/avatar9.png" alt="Avatar 9">
                <div class="avatar-name">Jugador 9</div>
            </div>
            <div class="avatar" title="Avatar 10">
                <img src="../../../img/icon/avatar10.png" alt="Avatar 10">
                <div class="avatar-name">Jugador 10</div>
            </div>
        </div>
        <div class="center-content">
            <div id="configuraciones"></div>
            <button id="jugar" class="btn btn-primary yum">Jugar</button>
            <div id="joiningMessage" class="joining-message" style="display: none;">
                <img src="../../../img/icon/multi.png" alt="Uniéndote" class="joining-image"> 
                Uniéndote...
            </div>
        </div>     
      </div>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-0">
            <div class="back-button">
                <a href="../../../multijugador/index.html"><img class="back-button-img" src="../../../img/icon/back.png" alt="Icono de retroceder"></a>
            </div>
                <div id="chat-container" class="fixed bottom-4 right-4 z-10 w-30">
                    <div id="chat-toggle" class="bg-blue-0 text-white px-4 py-1 rounded-lg cursor-pointer">
                    <img src="../../../img/icon/chat.png" alt="Icono de chat" class="w-14 h-14" />
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
    <audio id="backgroundMusic" src="../../../../audio/no-copyright-music-181373.mp3" loop></audio>
    

    <script src="js/sala.js"></script>
    <script src="js/menu.js"></script>
    <script src="../../../bootstrap/js/bootstrap.js"></script>
    <script src="js/avatar.js"></script>
    <script src="../../../../bootstrap/js/bootstrap.bundle.js"></script>
    <script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
    <script src="assets/script.js"></script>
</body>
</html>
