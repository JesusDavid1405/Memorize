<?php
include('../conexion/conexion.php');
session_start();

$response = [];

if (isset($_SESSION['codigoSala'])) {
    $codigoSala = $_SESSION['codigoSala'];

    $database = new Database();
    $conn = $database->connect();

    if ($conn) {
        $query = "SELECT dificultad, rondas FROM sala WHERE codigo = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $codigoSala);
        $stmt->execute();
        $stmt->bind_result($dificultad, $rondas);

        if ($stmt->fetch()) {
            $response = [
                'status' => 'true',
                'dificultad' => $dificultad,
                'rondas' => $rondas
            ];
        } else {
            $response = ['status' => 'false', 'mensaje' => 'No se encontró la sala'];
        }
        $stmt->close();
    } else {
        $response = ['status' => 'false', 'mensaje' => 'Error de conexión a la base de datos'];
    }
} else {
    $response = ['status' => 'false', 'mensaje' => 'Código de sala no establecido'];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
