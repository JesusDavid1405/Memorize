<?php

include('../conexion/conexion.php');

session_start();

$response = [];

$database = new Database();
$conn = $database->connect();

if ($conn) {
    $query = "
    SELECT * FROM juegos;
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {

        while ($row = $result->fetch_assoc()) {
            $response[]=[
                'id'=>$row['id'],
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion'],
                'imagen'=> $row['imagen']
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


?>