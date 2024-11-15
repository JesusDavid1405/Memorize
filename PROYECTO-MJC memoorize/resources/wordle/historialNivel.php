<?php 

include_once('../conexion/conexion.php');

session_start();

$usuarioId = $_SESSION['id'];
$nivelId = $_SESSION['nivelId'];

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$response = [];

if ($data && isset($data['estadoNivel']) && isset($data['correo']) && isset($data['contraseña'])) {

    $estadoNivel = $data['estadoNivel'];
    $tiempo = $data['tiempo'];
    $puntos = $data['puntos'];
    $juegoId=2;
    
    $database = new Database();
    $conn = $database->connect();

    if ($conn) {
        $query="
        INSERT INTO `historialniveles` 
        (`usuarioId`, `juegoId`, `nivelId`, `puntos`, `tiempo`,`estadoNivel`) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
        ";
        $stmtNick = $conn->prepare($query);
        $stmtNick->bind_param("iiiisi", 
            $usuarioId,
            $juegoId,
            $nivelId,
            $puntos,
            $tiempo,
            $estadoNivel

        );
        $stmtNick->execute();
    }
    
}

?>