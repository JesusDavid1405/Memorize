<?php

    include('../conexion/conexion.php');

    session_start();

    $response= [];
    $creadorSala= $_SESSION['id'];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if($data && isset($data['nombreSala']) && isset($data['codigoSala']) && isset($data['capacidadSala']) && isset($data['dificultadSala'])  && isset($data['rondasSala'])){

        $nombreSala = $data['nombreSala'];
        $codigoSala = $data['codigoSala'];
        $capacidadSala = $data['capacidadSala'];
        $dificultadSala = $data['dificultadSala'];
        $rondasSala = $data['rondasSala'];

        $database = new Database();
        $conn = $database->connect();

        if($conn){
            $query="
            INSERT INTO sala (creadorId, nombre, codigo, capacidad, dificultad, rondas) VALUE (?,?,?,?,?,?);
            ";

            $stmt= $conn->prepare($query);
            $stmt->bind_param("isiisi",
                $creadorSala,
                $nombreSala,
                $codigoSala,
                $capacidadSala,
                $dificultadSala,
                $rondasSala
            );
            $stmt->execute();

            $_SESSION['codigoSala']= $codigoSala;
            $_SESSION['creadorId']=$creadorSala;

            $querySala=" SELECT id FROM sala WHERE codigo= ? AND creadorId= ?;
            ";
            $stmtSala=$conn->prepare($querySala);
            $stmtSala->bind_param("ii",
                $codigoSala,
                $creadorSala
            );
            $stmtSala->execute();

            $resultSala= $stmtSala->get_result();
            
            if($resultSala->num_rows > 0){
                $rowSala= $resultSala->fetch_assoc();

                $salaId= $rowSala['id'];
                
                $_SESSION['salaId']=$salaId;
            
            
                $queryParticipante="
                INSERT INTO participantes (salaId, usuarioId, evento)
                VALUES (? ,? ,'adentro');
                ";

                $stmtParticipante=$conn->prepare($queryParticipante);
                $stmtParticipante->bind_param("ii",
                    $salaId,
                    $creadorSala
                );
                $stmtParticipante->execute();

                $response=[
                    'status'=>'true',
                    'mensaje'=>'ingresando a la sala'
                ];

                $response=[
                    'status' => 'true',
                    'mensaje'=>'sala creada correctamente'
                ];
            }

        }else{
            $response=['mensaje'=>"error al conectar a la base de datos"];
        }

    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>