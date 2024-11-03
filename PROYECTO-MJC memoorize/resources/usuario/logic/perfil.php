<?php
include_once ('../../conexion/conexion.php');

session_start();

$response = [];
$dataBase = new Database();
$conn = $dataBase->connect();

if (isset($_SESSION['id'])) {
    $usuarioId = $_SESSION['id'];

    if ($conn) {
        $query = "SELECT 
            usuario.id,
            usuario.nickName,
            avatar.imagen
        FROM 
            usuario
        INNER JOIN 
            avatar ON usuario.avatarId = avatar.id
        WHERE usuario.id = ?";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $usuarioId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $imagen = $row['imagen'];
            $nickName = $row['nickName'];

            $response = [
                'nickName' => $nickName,
                'rutaImg' => $imagen
            ];
        }
    }
} else {
    $response = ['status' => 'error', 'message' => 'No hay sesión activa.'];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
