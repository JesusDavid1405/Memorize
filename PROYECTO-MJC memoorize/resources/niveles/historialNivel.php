<?php 

    include_once('../conexion/conexion.php');

    session_start();

    $usuarioId = $_SESSION['id'];
    $nivelId = $_SESSION['nivelId'];
    $juegoId = $_SESSION['juegoId'];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $response = [];

    if ($data && isset($data['estadoNivel']) && isset($data['tiempo']) && isset($data['puntos']) && isset($data['monedas'])) {

        $estadoNivel = $data['estadoNivel'];
        $tiempo = $data['tiempo'];
        $puntos = $data['puntos'];
        $monedasNivel= $data['monedas'];

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
            (`usuarioId`, `juegoId`, `nivelId`, `puntos`, `tiempo`,`monedas`,`estadoNivel`) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
            ";
            $stmtNick = $conn->prepare($query);
            $stmtNick->bind_param("iiiisii", 
                $usuarioId,
                $juegoId,
                $nivelId,
                $puntos,
                $tiempo,
                $monedasNivel,
                $estadoNivel
            );
            $stmtNick->execute();

            $response=['nivel registrado con exito'];

            if($estadoNivel){

                $queryMondedasActual="SELECT monedas FROM usuarios WHERE id= ?;";
                $stmtMonedasActual= $conn->prepare($queryMondedasActual);
                $stmtMonedasActual->bind_param("i",
                    $usuarioId
                );
                $stmtMonedasActual->execute();
                $result = $stmtMonedasActual->get_result();
                
                if ($result) {
                    while ($row = $result->fetch_assoc()) {

                        $monedasActual= $row['monedas'];
                        $monedasUpdate = $monedasActual + $monedasNivel;

                        $queryMonedasUpdate= "UPDATE usuarios SET monedas=? WHERE id=?;";
                        $stmtMonedasUpdate= $conn->prepare($queryMonedasUpdate);
                        $stmtMonedasUpdate->bind_param("ii",
                            $monedasUpdate,
                            $usuarioId
                        );
                        $stmtMonedasUpdate->execute();

                        $response=['monedas obtenidas correctamente'];
                    }
                } else {
    
                    $response = [
                        'status' => 'FALSE',
                        'mensaje' => 'No hay avatares disponibles para mostrar.'
                    ];
    
                }
            }
        }else{
            $response=['error al registrar'];
        }
        
    }else{
        $response=['datos enviados incorrectamente'];
    }


    header('Content-Type: application/json');
    echo json_encode($response);

?>