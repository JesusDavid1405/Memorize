<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

require 'vendor/autoload.php';

class ChatServer implements \Ratchet\MessageComponentInterface {
    protected $clients;
    protected $users;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->users = [];
    }

    public function onOpen(\Ratchet\ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }

    public function onMessage(\Ratchet\ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        switch($data['type']) {
            case 'nuevo-usuario':
                $this->users[$from->resourceId] = $data['username'];
                $this->broadcastToAll([
                    'type' => 'usuario-conectado',
                    'username' => $data['username']
                ]);
                break;

            case 'chat':
                $this->broadcastToAll([
                    'type' => 'chat',
                    'username' => $data['username'],
                    'content' => $data['content']
                ]);
                break;

            case 'escribiendo':
                $this->broadcastToOthers($from, [
                    'type' => 'escribiendo',
                    'username' => $this->users[$from->resourceId] ?? 'Alguien',
                    'escribiendo' => $data['escribiendo']
                ]);
                break;
        }
    }

    protected function broadcastToAll($message) {
        foreach ($this->clients as $client) {
            $client->send(json_encode($message));
        }
    }

    protected function broadcastToOthers(\Ratchet\ConnectionInterface $excludeClient, $message) {
        foreach ($this->clients as $client) {
            if ($client !== $excludeClient) {
                $client->send(json_encode($message));
            }
        }
    }

    public function onClose(\Ratchet\ConnectionInterface $conn) {
        $username = $this->users[$conn->resourceId] ?? 'Alguien';
        unset($this->users[$conn->resourceId]);
        $this->clients->detach($conn);

        $this->broadcastToAll([
            'type' => 'usuario-desconectado',
            'username' => $username
        ]);
    }

    public function onError(\Ratchet\ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new ChatServer()
        )
    ),
    8080
);

$server->run();
