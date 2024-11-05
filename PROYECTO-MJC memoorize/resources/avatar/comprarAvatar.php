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
            
                $query = "INSERT INTO avatartienda (usuarioId , avatarId ,fechaCompra) VALUES (?,?,NOW())";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("is", 
                    $usuarioId,
                    $avatarComprar
                );
                if($stmt->execute()){
                    $response=[
                        'status' => 'TRUE',
                        'mensaje' => 'avatar comprado correctamente'
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