<?php
include('../conexion/conexion.php');
session_start();

$response = [];
$database = new Database();
$conn = $database->connect();

if ($conn) {
    $query = "
        SELECT * 
        FROM niveles;
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $response[] = [
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'numero' => $row['numero']
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
