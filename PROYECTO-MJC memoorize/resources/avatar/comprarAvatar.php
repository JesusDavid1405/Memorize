<?php 

    include('../conexion/conexion.php');

    session_start();

    $response = [];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if($data && isset($data['avatarId'])){

        $usuarioId = $_SESSION['id'];
        $avatarComprar= $data['avatarId'];

        // Conectar a la base de datos
        $database = new Database();
        $conn = $database->connect();
    
        if ($conn) {
            // Verificar si el nickName ya existe
            $queryNick = "SELECT * FROM avatartienda WHERE usuarioId = ? AND avatarId = ?";
            $stmtNick = $conn->prepare($queryNick);
            $stmtNick->bind_param("is", 
                $usuarioId,
                $avatarComprar
            );

            $stmtNick->execute();
            $resultNick = $stmtNick->get_result();

            if ($resultNick && $resultNick->num_rows > 0) {
                
                $response = [
                    'status' => 'FALSE',
                    'mensaje' => 'ya tienes ese avatar en tu propiedad'
                ];

            } else {

                $queryUsuario= "SELECT * FROM usuarios WHERE id = ?";
                $stmtUsuario= $conn->prepare($queryUsuario);
                $stmtUsuario->bind_param("i",$usuarioId);
                $stmtUsuario->execute();
                $resultUsuario = $stmtUsuario->get_result();
                $rowUsuario= $resultUsuario->fetch_assoc();
                $monedas=$rowUsuario['monedas'];

                $queryAvatar= "SELECT * FROM avatares WHERE id = ?";
                $stmtAvatar = $conn->prepare($queryAvatar);
                $stmtAvatar->bind_param("i",$avatarComprar);
                $stmtAvatar->execute();
                $resultAvatar = $stmtAvatar->get_result();
                $rowAvatar= $resultAvatar->fetch_assoc();
                $valorAvatar= $rowAvatar['valor'];

                if($monedas >= $valorAvatar){ // Comprar avatar

                    $monedasActual= $monedas - $valorAvatar;

                    $queryUserUpdate = "UPDATE usuarios SET monedas = monedas - ? WHERE id = ?";
                    $stmtUserUpdate = $conn->prepare($queryUserUpdate);
                    $stmtUserUpdate->bind_param("ii", 
                        $valorAvatar,
                        $usuarioId
                    );
                    $stmtUserUpdate->execute();

                    $query = "INSERT INTO avatartienda (usuarioId , avatarId ,fechaCompra) VALUES (?,?,NOW())";
                    $stmt = $conn->prepare($query);
                    $stmt->bind_param("ii", 
                        $usuarioId,
                        $avatarComprar
                    );
                    if($stmt->execute()){
                        $response=[
                            'status' => 'TRUE',
                            'mensaje' => 'avatar comprado correctamente',
                        ];               
                    }

                }else{
                    $response=[
                        'status' => 'FALSE',
                        'mensaje' => 'monedas insuficientes'
                    ];
                }
            }
        }else{
            $response=[
                'status' => 'FALSE',
                'mensaje' => 'error en al conectar a la base de datos'
            ]; 
         }
    }

    header('Content-Type: application/json');

    echo json_encode($response);

?>