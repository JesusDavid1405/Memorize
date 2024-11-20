<?php
header('Content-Type: application/json');

class ChatHandler {
    private $socket;

    public function __construct() {
        $this->socket = new WebSocket('ws://localhost:8080');
    }

    public function sendMessage($username, $message) {
        $data = [
            'type' => 'chat',
            'username' => $username,
            'content' => $message
        ];
        return $this->socket->send(json_encode($data));
    }

    public function receiveMessages() {
        // Implement message receiving logic
        // This would typically involve WebSocket client-side handling
    }
}

// Example usage in another PHP script
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $chatHandler = new ChatHandler();
    $username = $_POST['username'] ?? '';
    $message = $_POST['message'] ?? '';

    if (!empty($username) && !empty($message)) {
        $result = $chatHandler->sendMessage($username, $message);
        echo json_encode(['success' => $result]);
    } else {
        echo json_encode(['error' => 'Missing username or message']);
    }
}
?>
