<?php
include('../conexion/conexion.php');

session_start();

// Debug: Check if session ID is set
if(!isset($_SESSION['id'])) {
    $response = [
        'status' => false,
        'mensaje' => 'No hay sesión iniciada'
    ];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

$response = [];
$usuarioId = $_SESSION['id'];  // Get user ID from session

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Debug: Check if data is received
if(!$data) {
    $response = [
        'status' => false,
        'mensaje' => 'No se recibieron datos'
    ];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

if(isset($data['personalInfo'])){
    $personalInfo = $data['personalInfo'];
   
    $database = new Database();
    $conn = $database->connect();

    if($conn){
        $query = "UPDATE usuarios SET descripcion = ? WHERE usuarioId = ?";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("si", $personalInfo, $usuarioId);
 
        if($stmt->execute()){
            $response = [
                'status' => true,
                'mensaje' => 'Descripción actualizada correctamente'
            ];
        } else {
            $response = [
                'status' => false,
                'mensaje' => 'Error al actualizar la descripción: ' . $stmt->error
            ];
        }
    } else {
        $response = [
            'status' => false,
            'mensaje' => "Error al conectar a la base de datos"
        ];
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
