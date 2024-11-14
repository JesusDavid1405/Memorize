<?php
include('../conexion/conexion.php');
session_start();

$usuarioId= $_SESSION['id'];

$response = [];
$database = new Database();
$conn = $database->connect();

if ($conn) {
    $query = "
        SELECT 
            n.id,
            n.nombre,
            n.numero
        FROM
            niveles n
        LEFT JOIN historialniveles h ON n.id= h.nivelId AND h.usuarioId = ?
        WHERE (n.numero = 1 AND  NOT EXISTS(
            SELECT 1 FROM historialniveles 
            WHERE usuarioId=?)
        )OR (h.estadoNivel = TRUE AND EXISTS(
            SELECT 1 FROM historialniveles WHERE usuarioId = ? AND estadoNivel = TRUE AND nivelId = n.id -1)
        )
        ORDER BY n.numero ASC;
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("iii", $usuarioId,$usuarioId, $usuarioId);
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
