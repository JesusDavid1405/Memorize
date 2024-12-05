<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

require __DIR__ . '/vendor/autoload.php'; // Asegúrate de usar la ruta correcta al autoload.php

class ChatServer implements MessageComponentInterface {
    protected $clients;
    protected $users;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->users = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        // El cliente se conecta, lo añadimos a la lista
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // Recibimos un mensaje del cliente y lo procesamos
        $data = json_decode($msg, true);

        switch($data['type']) {
            case 'nuevo-usuario':
                // Nuevo usuario se conecta
                $this->users[$from->resourceId] = $data['username'];
                $this->broadcastToAll([
                    'type' => 'usuario-conectado',
                    'username' => $data['username']
                ]);
                break;

            case 'chat':
                // Mensaje de chat
                $this->broadcastToAll([
                    'type' => 'chat',
                    'username' => $data['username'],
                    'content' => $data['content']
                ]);
                break;

            case 'escribiendo':
                // Notificación de que un usuario está escribiendo
                $this->broadcastToOthers($from, [
                    'type' => 'escribiendo',
                    'username' => $this->users[$from->resourceId] ?? 'Alguien',
                    'escribiendo' => $data['escribiendo']
                ]);
                break;
        }
    }

    protected function broadcastToAll($message) {
        // Enviar el mensaje a todos los clientes conectados
        foreach ($this->clients as $client) {
            $client->send(json_encode($message));
        }
    }

    protected function broadcastToOthers(ConnectionInterface $excludeClient, $message) {
        // Enviar el mensaje a todos excepto el cliente que lo envió
        foreach ($this->clients as $client) {
            if ($client !== $excludeClient) {
                $client->send(json_encode($message));
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // Un cliente se desconecta, lo eliminamos
        $username = $this->users[$conn->resourceId] ?? 'Alguien';
        unset($this->users[$conn->resourceId]);
        $this->clients->detach($conn);

        $this->broadcastToAll([
            'type' => 'usuario-desconectado',
            'username' => $username
        ]);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        // Manejo de errores
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

// Crear el servidor y ejecutarlo en el puerto 8080
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new ChatServer()
        )
    ),
    8080
);

$server->run();
