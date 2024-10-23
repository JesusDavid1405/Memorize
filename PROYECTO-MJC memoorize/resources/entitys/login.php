<?php
    include_once 'conexion.php';

    $response = [];

    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    

    if ($data && isset($data['correo']) && isset($data['contraseña'])) {
        
        $correo = $data['correo'];
        $contraseña = $data['contraseña'];
    
        $database = new Database();
        $conn = $database->connect();

        if ($conn) {
            $query = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";
            $stmt = $conn->prepare($query);
    
            // Vincular parámetros y ejecutar la consulta
            $stmt->bind_param("ss", $correo, $contraseña);
            $stmt->execute();
    
            
            $result = $stmt->get_result();
    
            if ($result && $result->num_rows > 0) {
            
                $row = $result->fetch_assoc();
                $usuarioId = $row['id']; 

                
                $token = bin2hex(random_bytes(16)); 
                $fecha_expiracion = date('Y-m-d H:i:s', strtotime('+1 hour'));

                
                $querySesion = "INSERT INTO sesiones (usuarioId, token, fechaExpiracion) VALUES (?, ?, ?)";
                $stmtSesion = $conn->prepare($querySesion);
                $stmtSesion->bind_param("iss", $usuarioId, $token, $fecha_expiracion);
                $stmtSesion->execute();


                $_SESSION['id'] = $usuarioId;
                $_SESSION['nickName'] = $row['nickName'];
                $_SESSION['correo'] = $row['correo'];           
            
                $response = [
                    'status' => 'success',
                    'token' => $token,
                    'id' => $usuarioId,
                    'nickName' => $row['nickName'],
                    'correo' => $row['correo']
                ];

                $stmtSesion->close();
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'No se encontraron registros con esas credenciales.'
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
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Datos no recibidos correctamente. Se requiere correo y contraseña.'
        ];
    }
    
    header('Content-Type: application/json');
    
    echo json_encode($response);
?>
