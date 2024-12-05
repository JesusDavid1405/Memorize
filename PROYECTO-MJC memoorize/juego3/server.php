<?php
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class GameServer implements MessageComponentInterface {
    protected $clients;
    protected $rooms;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->rooms = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "Nueva conexión: ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        if ($data['type'] === 'joinRoom') {
            $this->joinRoom($from, $data['room']);
        }

        if ($data['type'] === 'flip') {
            $this->broadcastToRoom($data['room'], $data);
        }
    }

    public function onClose(ConnectionInterface $conn) {
        foreach ($this->rooms as $room => $clients) {
            if (in_array($conn, $clients)) {
                unset($this->rooms[$room][array_search($conn, $clients)]);

                echo "Jugador ({$conn->resourceId}) desconectado de la sala: {$room}\n";

                $this->broadcastToRoom($room, [
                    'type' => 'playerLeft',
                    'message' => "Jugador {$conn->resourceId} se ha desconectado.",
                    'playerId' => $conn->resourceId,
                ]);
                break;
            }
        }

        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Error: {$e->getMessage()}\n";
        $conn->close();
    }

    private function joinRoom(ConnectionInterface $conn, $room) {
        if (!isset($this->rooms[$room])) {
            $this->rooms[$room] = [];
        }
        $this->rooms[$room][] = $conn;

        echo "Jugador ({$conn->resourceId}) se unió a la sala: {$room}\n";

        $this->broadcastToRoom($room, [
            'type' => 'playerJoined',
            'message' => "Jugador {$conn->resourceId} se ha unido.",
            'playerId' => $conn->resourceId,
        ]);
    }

    private function broadcastToRoom($room, $data) {
        if (isset($this->rooms[$room])) {
            foreach ($this->rooms[$room] as $client) {
                $client->send(json_encode($data));
            }
        }
    }
}

$server = new Ratchet\App('localhost', 8080, '0.0.0.0');
$server->route('/game', new GameServer);
$server->run();
