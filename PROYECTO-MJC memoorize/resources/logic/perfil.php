<?php

    include_once ('../conexion/conexion.php');

    session_start();

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $response = [];

    if ($data && isset($data['usuarioId'])) {

        $usuarioId= $data['usuarioId'];

        $dataBase = new Database();
        $conn = $dataBase->connect();

        if ($conn) {
            $query = "SELECT 
                usuario.nickName,
                avatar.imagen
            FROM 
                usuario
            INNER JOIN 
                avatar ON usuario.avatarId = avatar.id

            WHERE usuario.id = ?
            ";
            $stmt = $conn->prepare($query);

            $stmt->bind_param("s", $usuarioId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $imagen= $row['imagen'];
                $nickName = $row['nickName'];

                $response=[
                    'nickName' => $nickName,
                    'rutaImg' => $imagen
                ];
            }
        }    
    }else {
        $response = [
            'status' => 'error',
            'message' => 'Datos no recibidos correctamente. Se requiere correo y contraseña.'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);


    

?>