<?php

    include('../conexion/conexion.php');

    session_start();
    
    $usuarioId= $_SESSION['id'];

    $response = [];

    $database = new Database();
    $conn = $database->connect();

    if ($conn) {
        $queryRead = "SELECT avatartienda.id, avatartienda.avatarId,avatares.imagen, avatares.nombre, avatares.valor
        FROM avatartienda
        JOIN avatares ON avatartienda.avatarId = avatares.id
        WHERE avatartienda.usuarioId = ?";

        $stmtRead= $conn->prepare($queryRead);
        $stmtRead->bind_param("i", $usuarioId);
        $stmtRead->execute();
            
        $resultRead = $stmtRead->get_result();

        if ($resultRead && $resultRead->num_rows > 0) {
            while ($row = $resultRead->fetch_assoc()) {

                $response[] = [
                    'id' => $row['id'],
                    'avatarId' => $row['avatarId'],
                    'imagen' => $row['imagen'],
                    'nombre' => $row['nombre'],
                    'valor' => $row['valor']
                ];
            }
        }else{
            $response=[
                'status' => 'FALSE',
                'mensaje' => 'aun no haz comprado ningun avatar'
            ]; 
        }

    }

    header('Content-Type: application/json');

    echo json_encode($response);

?>