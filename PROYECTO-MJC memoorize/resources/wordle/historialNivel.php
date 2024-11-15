<?php 

include_once('../conexion/conexion.php');

session_start();

$usuarioId = $_SESSION['id'];
$nivelId = $_SESSION['nivelId'];

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
        $query="
        INSERT INTO `historialniveles` 
        (`usuarioId`, `juegoId`, `nivelId`, `puntos`, `tiempo`, `monedas`, `estadoNivel`) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
        ";
        $stmtNick = $conn->prepare($query);
        $stmtNick->bind_param("iiiiiii", 
            $usuarioId,
            $juegoId,
            $nivelId,
            $puntos,
            $tiempo,
            $monedas,
            $estadoNivel

        );
        $stmtNick->execute();
    }
    
}

?>