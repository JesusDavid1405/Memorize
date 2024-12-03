<?php

    include('../conexion/conexion.php');

    session_start();

    $response= [];
    $creadorSala= $_SESSION['id'];
    $codigoSala = $_SESSION['codigoSala'];

    $database = new Database();
    $conn = $database->connect();

    if($conn){
        $query="
        SELECT * FROM sala WHERE creadorId = ? AND codigo= ?;
        ";
        
        $stmt= $conn->prepare($query);
        $stmt->bind_param("ii",
            $creadorSala,
            $codigoSala
        );
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $response[] = [
                    'nombre' => $row['nombre'],
                    'codigo' => $row['codigo'],
                    'dificultad' => $row['dificultad'],
                    'rondas' => $row['rondas']
                ];
            }
        } else {
            $response = [
                'status' => 'FALSE',
                'mensaje' => 'No existe ninguna sala'
            ];
        }
            
        
    }else{
        $response=['mensaje'=>"error al conectar a la base de datos"];
    }
    

    header('Content-Type: application/json');
    echo json_encode($response);
?>