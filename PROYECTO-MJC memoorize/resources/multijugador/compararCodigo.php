<?php
// Deshabilitar cualquier salida de error
error_reporting(0);
ini_set('display_errors', 0);

// Asegurarse de que solo se devuelva JSON
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

try {
    include('../conexion/conexion.php');

    session_start();

    $response = ['status' => 'false', 'mensaje' => 'Error desconocido'];

    // Leer input JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Verificar si se recibió el código de sala
    if(!$data || !isset($data['codigoSala'])){
        $response = [
            'status' => 'false', 
            'mensaje' => 'Código de sala no proporcionado'
        ];
        echo json_encode($response);
        exit;
    }

    $codigoSala = $data['codigoSala'];

    $database = new Database();
    $conn = $database->connect();

    if(!$conn){
        $response = [
            'status' => 'false', 
            'mensaje' => 'Error al conectar a la base de datos'
        ];
        echo json_encode($response);
        exit;
    }

    // Preparar consulta
    $query = "SELECT id, nombre, estado, estadoFinalizado FROM sala WHERE codigo = ?";
    
    $stmt = $conn->prepare($query);
    if(!$stmt){
        $response = [
            'status' => 'false', 
            'mensaje' => 'Error al preparar la consulta'
        ];
        echo json_encode($response);
        exit;
    }

    $stmt->bind_param("i", $codigoSala);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0){
        // Sala encontrada
        $sala = $result->fetch_assoc();

        $_SESSION['codigoSala']= $sala['codigo'];

        
        // Validaciones adicionales
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
            // Guardar información de la sala en la sesión
            $_SESSION['codigoSala'] = $codigoSala;
            $_SESSION['sala_id'] = $sala['id'];

            $response = [
                'status' => 'true',
                'mensaje' => 'Sala encontrada',
                'nombre' => $sala['nombre']
            ];
        }
    } else {
        // Sala no encontrada
        $response = [
            'status' => 'false',
            'mensaje' => 'Código de sala no válido'
        ];
    }

    // Cerrar statement
    $stmt->close();

} catch (Exception $e) {
    // Capturar cualquier error
    $response = [
        'status' => 'false', 
        'mensaje' => 'Error: ' . $e->getMessage()
    ];
}

// Asegurar que solo se envíe JSON
echo json_encode($response);
exit;
?>