const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",  // Permite cualquier origen
        methods: ["GET", "POST"]
    }
});

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const usuarios = new Map();

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('nuevo-usuario', (nombre) => {
        usuarios.set(socket.id, nombre);
        io.emit('usuario-conectado', nombre);
    });

    socket.on('chat', (mensaje) => {
        const nombre = usuarios.get(socket.id);
        io.emit('chat', { nombre, mensaje });
    });

    socket.on('escribiendo', (escribiendo) => {
        const nombre = usuarios.get(socket.id);
        socket.broadcast.emit('escribiendo', { nombre, escribiendo });
    });

    socket.on('disconnect', () => {
        const nombre = usuarios.get(socket.id);
        if (nombre) {
            io.emit('usuario-desconectado', nombre);
            usuarios.delete(socket.id);
        }
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});