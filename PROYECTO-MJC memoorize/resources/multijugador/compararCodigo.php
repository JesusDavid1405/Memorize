<?php

    include('../conexion/conexion.php');

    session_start();

    $usuarioId= $_SESSION['id'];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    
    if($data && isset($data['codigoSala'])){
        
        $codigoSala = $data['codigoSala'];

        $database = new Database();
        $conn = $database->connect();

        if($conn){
            $querySala = "SELECT id, nombre, capacidad, estado, estadoFinalizado FROM sala WHERE codigo = ?";
        
            $stmtSala = $conn->prepare($querySala);
            $stmtSala->bind_param("i", $codigoSala);
            $stmtSala->execute();
            $resultSala = $stmtSala->get_result();

            if($resultSala->num_rows > 0){
                
                $sala = $resultSala->fetch_assoc();

                $_SESSION['codigoSala']= $codigoSala;
                
                if($sala['estado'] !== 'abierta'){
                    $response = [
                        'status' => 'false',
                        'mensaje' => 'La sala no está abierta'
                    ];
                } elseif($sala['estadoFinalizado']){
                    $response = [
                        'status' => 'false',
                        'mensaje' => 'La sala ya ha finalizado'
                    ];
                } else {
                    
                    $_SESSION['codigoSala'] = $codigoSala;
                    $_SESSION['salaId'] = $sala['id'];

                    $response = [
                        'status' => 'true',
                        'mensaje' => 'Sala encontrada',
                        'nombre' => $sala['nombre']
                    ];
                }

                $capacidadSala=$sala['capacidad'];
                $salaId=$sala['id'];

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

                    if($capacidadSala >= $cupo){
                        
                        $queryParticipante="
                        INSERT INTO participantes (salaId, usuarioId, evento)
                        VALUES (? ,? ,'adentro');
                        ";

                        $stmtParticipante=$conn->prepare($queryParticipante);
                        $stmtParticipante->bind_param("ii",
                            $salaId,
                            $usuarioId
                        );
                        $stmtParticipante->execute();

                        $response=[
                            'status'=>'true',
                            'mensaje'=>'ingresando a la sala'
                        ];

                    }else{
                        $response=[
                            'status'=>'false',
                            'mensaje'=>'no hay cupo para ingresar a esta sala'
                        ];
                    }
                }


            } else {
                
                $response = [
                    'status' => 'false',
                    'mensaje' => 'Código de sala no válido'
                ];
            }

        }else{

            $response = [
                'status' => 'false', 
                'mensaje' => 'Error al conectar a la base de datos'
            ];
        }

    
    }else{

        $response = [
            'status' => 'false', 
            'mensaje' => 'Código de sala no proporcionado'
        ];

    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>