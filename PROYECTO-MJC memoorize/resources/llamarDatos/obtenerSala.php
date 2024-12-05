<?php
include('../conexion/conexion.php');
session_start();

$response = [];

// Obtener el código de sala desde la sesión
if (isset($_SESSION['codigoSala'])) {
    $codigoSala = $_SESSION['codigoSala'];

    $database = new Database();
    $conn = $database->connect();

    if ($conn) {
        $query = "SELECT dificultad, rondas FROM sala WHERE codigo = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $codigoSala);

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $sala = $result->fetch_assoc();
            $response = [
                'status' => 'true',
                'dificultad' => $sala['dificultad'],
                'rondas' => $sala['rondas']
            ];
        } else {
            $response = ['status' => 'false', 'mensaje' => 'Sala no encontrada'];
        }
    } else {
        $response = ['status' => 'false', 'mensaje' => 'Error al conectar a la base de datos'];
    }
} else {
    $response = ['status' => 'false', 'mensaje' => 'No se encontró el código de sala en la sesión'];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
