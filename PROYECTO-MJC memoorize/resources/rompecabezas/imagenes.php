<?php

include('../conexion/conexion.php');

session_start();

$nivelId = $_SESSION['nivelId'];
$response = [];

$database = new Database();
$conn = $database->connect();

if ($conn) {
    $query = "
    SELECT 
        imagenNivel.id AS imagenNivelId,
        imagen.nombre AS imagenNombre,
        imagen.url AS imagenUrl,
        imagenNivel.area,
        imagenNivel.movimientosMin,
        n.tiempo
    FROM 
        imagenNivel
    JOIN 
        niveles n ON n.id = imagenNivel.nivelId
    JOIN 
        imagen ON imagenNivel.imagenId = imagen.id
    WHERE 
        imagenNivel.nivelId = ?; 
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $nivelId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $response[] = [
                'nombreImagen' => $row['imagenNombre'],
                'imagen' => $row['imagenUrl'],
                'area' => $row['area'],
                'movimientosMin' => $row['movimientosMin'],
                'tiempo' => $row['tiempo']
            ];
        }
    } else {
        $response = [
            'status' => 'FALSE',
            'mensaje' => 'No hay imágenes disponibles para este nivel.'
        ];
    }

    $database->disconnect();
}

header('Content-Type: application/json');
echo json_encode($response);
