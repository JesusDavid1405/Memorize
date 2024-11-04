<?php

    include_once ('../../conexion/conexion.php');

    session_start();

    $input= file_get_contents('php://input');
    $data = json_decode($input, true);

    $response=[];

    if ($data && isset($data['avatarId'])) {

        $avatarId= $data['avatarId'];

        $database = new Database();
        $conn = $database->connect();

        if ($conn) {
            $query = "UPDATE `usuarios` SET `avatarId` = ? WHERE `usuarios`.`id` = ?;";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ii", $avatarId, $_SESSION['id']);
            $stmt->execute();
            $result = $stmt->get_result();

            $database->disconnect();

            $response=[
                'status' => 'true',
                'mensaje' => 'cambio exitoso'
            ];

        }else {
            echo "Fallo en la conexión a la base de datos.";
        }

    }else{
        $response=[
            'status' => 'error',
            'mensaje' => 'haz ingresado un dato vacio'
        ];
    }

    header('Content-Type: application/json');

    echo json_encode($response);
?>