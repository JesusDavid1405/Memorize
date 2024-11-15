<?php

include('../conexion/conexion.php');
session_start();

$usuarioId= $_SESSION['id'];
$nivelId=$_SESSION['nivelId'];

$response = [];

$database = new Database();
$conn = $database->connect();

if ($conn) {

    $query = "
        SELECT 
            p.id AS palabra_id,
            p.palabra,
            pn.nivelId AS nivel_id,
            ps.pista
        FROM 
            palabra p
        JOIN 
            palabraNivel pn ON p.id = pn.palabraId
        JOIN 
            pista ps ON p.id = ps.palabraId
        WHERE 
            pn.nivelId = ?
        ORDER BY 
        pn.nivelId, p.id;
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $nivelId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {

        $palabras = []; // Arreglo para agrupar palabras y evitar duplicados

        while ($row = $result->fetch_assoc()) {

            $palabraId = $row['palabra_id'];

            // Si la palabra no existe, inicializa su estructura con pistas vacías

            if (!isset($palabras[$palabraId])) {

                $palabras[$palabraId] = [
                    'palabra_id' => $palabraId,
                    'palabra' => $row['palabra'],
                    'nivel_id' => $row['nivel_id'],
                    'pistas' => []
                ];
            }

            // Agrega la pista a la palabra actual
            $palabras[$palabraId]['pistas'][] = $row['pista'];
        }

        // Convierte el arreglo de palabras en un arreglo de respuesta

        $response = array_values($palabras);
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