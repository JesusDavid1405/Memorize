<?php
    include('../conexion/conexion.php');

    session_start();

    $response = [];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Validar si los datos existen y no están vacíos
    if ($data && isset($data['correo']) && isset($data['contraseña'])) {
    
        $correo = trim($data['correo']);  // Eliminar espacios en blanco al principio y al final
        $contraseña = trim($data['contraseña']);  // Eliminar espacios en blanco

        // Validar que los campos no estén vacíos
        if (empty($correo) || empty($contraseña)) {
            $response = [
                'status' => 'error',
                'message' => 'El correo y la contraseña son obligatorios.'
            ];
        } else {
            // Conectar a la base de datos
            $database = new Database();
            $conn = $database->connect();
        
            if ($conn) {
                $query = "SELECT * FROM usuarios WHERE correo = ? AND contraseña= ?";
                $stmt = $conn->prepare($query);
        
                $stmt->bind_param("ss", $correo, $contraseña);
                $stmt->execute();
                $result = $stmt->get_result();
        
                if ($result && $result->num_rows > 0) {

                    $row = $result->fetch_assoc();

                    $_SESSION['id'] = $row['id'];
                    $_SESSION['nickName'] = $row['nickName'];
                    $_SESSION['monedas'] = $row['monedas'];

                    $response = [
                        'status' => 'success',
                        'message' => 'Se ha iniciado sesión exitosamente.'
                    ];

                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'contraseña o correo incorrectos, intentanuevamente.'
                    ];
                }
        
                $stmt->close();
                $conn->close();
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Fallo en la conexión a la base de datos.'
                ];
            }
        }
    } else {
        // Si no se recibieron los datos esperados
        $response = [
            'status' => 'error',
            'message' => 'Datos no recibidos correctamente. Se requiere correo y contraseña.'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>
