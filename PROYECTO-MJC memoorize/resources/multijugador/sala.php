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
        SELECT * FROM sala WHERE codigo= ?;
        ";
        
        $stmt= $conn->prepare($query);
        $stmt->bind_param("i",
            $codigoSala
        );
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {

                $salaId = $row['id'];

                $queryCupo="
                SELECT COUNT(*) AS totalEntradas
                FROM participantes
                WHERE evento = 'adentro' AND salaId = ?;
                ";

                $stmtCupo=$conn->prepare($queryCupo);
                $stmtCupo->bind_param("i", 
                    $salaId
                );
                $stmtCupo->execute();
                $resultCupo= $stmtCupo->get_result();

                if($resultCupo->num_rows > 0){

                    $rowCupo= $resultCupo->fetch_assoc();

                    $cupo= $rowCupo['totalEntradas'];

                    $response[] = [
                        'nombre' => $row['nombre'],
                        'codigo' => $row['codigo'],
                        'dificultad' => $row['dificultad'],
                        'rondas' => $row['rondas'],
                        'capacidad'=> $row['capacidad'],
                        'cupo' => $cupo
                    ];
                }
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