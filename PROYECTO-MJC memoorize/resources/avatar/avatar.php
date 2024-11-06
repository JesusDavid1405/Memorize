<?php
include('../conexion/conexion.php');
session_start();

$response = [];
$database = new Database();
$conn = $database->connect();

if ($conn) {
    $userId = $_SESSION['id']; // ID del usuario actual en sesión
  
    $query = "
        SELECT a.* 
        FROM avatares a
        WHERE a.id NOT IN (
            SELECT avatarId 
            FROM avatarTienda 
            WHERE usuarioId = ?
        )
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $response[] = [
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'imagen' => $row['imagen'],
                'valor' => $row['valor']
            ];
        }
    } else {
        $response = [
            'status' => 'FALSE',
            'mensaje' => 'No hay avatares disponibles para mostrar.'
        ];
    }

    $database->disconnect();
}

header('Content-Type: application/json');
echo json_encode($response);
