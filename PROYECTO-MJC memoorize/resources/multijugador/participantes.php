<?php

    include('../conexion/conexion.php');

    session_start();

    $salaId= $_SESSION['salaId'];

    $response=[];

    $database = new Database();
    $conn = $database->connect();

    if($conn){
        $query="
        SELECT 
            u.nickName,
            a.imagen
        FROM 
            participantes p
        JOIN 
            usuarios u ON p.usuarioId = u.id
        JOIN 
            avatares a ON u.avatarId = a.id
        WHERE 
            p.salaId = ?
            AND p.evento = 'adentro';
        ";

        $stmt=$conn->prepare($query);
        $stmt->bind_param("i", 
            $salaId
        );
        $stmt->execute();
        $result= $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $response[]=[
                    'nickName'=>$row['nickName'],
                    'imagen' => $row['imagen']
                ];
            }
        }else{
            $response=[
                'status'=>'false',
                'mensaje'=>'no hay ningun dato'
            ];
        }

    }else{
        $response=['mensaje'=>"error al conectar a la base de datos"];
    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>