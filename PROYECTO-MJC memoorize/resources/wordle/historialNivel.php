<?php 

    include_once('../conexion/conexion.php');

    session_start();

    $usuarioId = $_SESSION['id'];
    $nivelId = $_SESSION['nivelId'];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $response = [];

    if ($data && isset($data['estadoNivel']) && isset($data['tiempo']) && isset($data['puntos'])) {

        $estadoNivel = $data['estadoNivel'];
        $tiempo = $data['tiempo'];
        $puntos = $data['puntos'];
        $juegoId=2;

        $response=[
            $estadoNivel,
            $tiempo,
            $puntos,
            $juegoId
        ];
        
        $database = new Database();
        $conn = $database->connect();

        if ($conn) {
            $query="
            INSERT INTO `historialniveles` 
            (`usuarioId`, `juegoId`, `nivelId`, `puntos`, `tiempo`,`estadoNivel`) 
            VALUES (?, ?, ?, ?, ?, ?);
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

            $response=['nivel registrado con exito'];
        }else{
            $response=['error al registrar'];
        }
        
    }else{
        $response=['datos enviados incorrectamente'];
    }


    header('Content-Type: application/json');
    echo json_encode($response);

?>