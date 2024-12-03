<?php
include('../conexion/conexion.php');

session_start();

$response = [];
$usuarioId = $_SESSION['id'];  // Get user ID from session

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if($data && isset($data['personalInfo'])){
    $personalInfo = $data['personalInfo'];
   
    $database = new Database();
    $conn = $database->connect();

    if($conn){
        $query = "UPDATE usuarios SET descripcion = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("si", 
            $personalInfo, 
            $usuarioId
        );
       $stmt->execute();

        $response = [
            'status' => true,
            'mensaje' => 'Descripción actualizada correctamente'
        ];
       
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
