<?php

    include_once('../../conexion/conexion.php');

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $response = [];

    if ($data && isset($data['nickName']) && isset($data['correo']) && isset($data['contraseña'])) {

        $nickName = $data['nickName'];
        $correo = $data['correo'];
        $contraseña = $data['contraseña'];

        

        // Validar que los campos no estén vacíos
        if (empty($nickName) || empty($correo) || empty($contraseña)) {
            $response = [
                'status' => 'error',
                'message' => 'Todos los campos son obligatorios.'
            ];
        } else {
            
            $database = new Database();
            $conn = $database->connect();

            if ($conn) {
                // Verificar si el nickName ya existe
                $queryNick = "SELECT * FROM usuario WHERE nickName = ?";
                $stmtNick = $conn->prepare($queryNick);
                $stmtNick->bind_param("s", $nickName);
                $stmtNick->execute();
                $resultNick = $stmtNick->get_result();

                if ($resultNick && $resultNick->num_rows > 0) {
                    // El nickName ya existe
                    $response = [
                        'status' => 'error',
                        'message' => 'El nombre de usuario ya existe.'
                    ];
                } else {
                    // Verificar si el correo ya existe
                    $queryCorreo = "SELECT * FROM usuario WHERE correo = ?";
                    $stmtCorreo = $conn->prepare($queryCorreo);
                    $stmtCorreo->bind_param("s", $correo);
                    $stmtCorreo->execute();
                    $resultCorreo = $stmtCorreo->get_result();

                    if ($resultCorreo && $resultCorreo->num_rows > 0) {
                        // El correo ya está registrado
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
                    $stmtCorreo->close();
                }
                $stmtNick->close();
                $conn->close();
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Fallo en la conexión a la base de datos.'
                ];
            }
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
