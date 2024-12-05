<?php

include('../conexion/conexion.php'); // Asegúrate de que la ruta sea correcta
session_start();

$response = [];
$creadorSala = $_SESSION['creadorId']; // ID del creador de la sala
$codigoSala = $_SESSION['codigoSala']; // Código de la sala creada

$database = new Database();
$conn = $database->connect();

if ($conn) {
    // Actualizamos el estado a 'cerrada' y marcamos `estadoFinalizado` como TRUE
    $query = "UPDATE sala SET estado = 'cerrada', estadoFinalizado = 1 WHERE creadorId = ? AND codigo = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $creadorSala, $codigoSala);

    if ($stmt->execute()) {
        $response = [
            'status' => 'true',
            'mensaje' => 'Sala cerrada correctamente'
        ];
    } else {
        $response = [
            'status' => 'false',
            'mensaje' => 'Error al cerrar la sala'
        ];
    }
} else {
    $response = [
        'mensaje' => "Error al conectar a la base de datos"
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
