<?php

    include_once('conexion.php');

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $response = [];

    if ($data && isset($data['nickName']) && isset($data['correo']) && isset($data['contraseña'])) {

        $nickName = $data['nickName'];
        $correo = $data['correo'];
        $contraseña = $data['contraseña'];

        $database = new Database();
        $conn = $database->connect();

        if ($conn) {
            // Verificar si ya existe un usuario con ese correo
            $query = "SELECT * FROM usuario WHERE correo = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $correo);
            $stmt->execute();

            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                // El correo ya está registrado, no hacer inserción
                $response = [
                    'status' => 'error',
                    'message' => 'El correo ya está registrado.'
                ];
            } else {
                // Si no existe, proceder a registrar el nuevo usuario
                $insertUser = "INSERT INTO usuario (nickName, avatarId, correo, contraseña) VALUES (?, ?, ?, ?)";
                $stmtRegistrar = $conn->prepare($insertUser);

                // Establecer valores (por ejemplo, avatarId es 1)
                $avatarId = 1;

                $stmtRegistrar->bind_param("siss", $nickName, $avatarId, $correo, $contraseña);

                if ($stmtRegistrar->execute()) {
                    $response = [
                        'status' => 'success',
                        'message' => 'Usuario registrado correctamente.',
                        'nickName' => $nickName,
                        'correo' => $correo
                    ];
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Error al registrar el usuario.'
                    ];
                }

                $stmtRegistrar->close();
            }

            $stmt->close();
            $conn->close();
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Fallo en la conexión a la base de datos.'
            ];
        }

    } else {
        $response = [
            'status' => 'error',
            'message' => 'Datos no recibidos correctamente. Se requiere correo y contraseña.'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>
