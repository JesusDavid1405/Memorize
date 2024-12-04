<?php
include('../conexion/conexion.php');

session_start();

$response = [];
$usuarioId = $_SESSION['id'];  // Get user ID from session

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if($data && isset($data['nickName'])){
    $nickName = $data['nickName'];
   
    $database = new Database();
    $conn = $database->connect();

    if($conn){
        $queryMonedas="SELECT monedas FROM usuarios WHERE id = ?;";
        $stmtMonedas= $conn->prepare($queryMonedas);
        $stmtMonedas->bind_param("i",$usuarioId);
        $stmtMonedas->execute();
    
        $result = $stmtMonedas->get_result();
        
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $monedasActual= $row['monedas'];

                $monedasUpdate = $monedasActual - 100;

                if($monedasUpdate > 0){
                    $queryMonedasUpdate= "UPDATE usuarios SET monedas=? WHERE id=?;";
                    $stmtMonedasUpdate= $conn->prepare($queryMonedasUpdate);
                    $stmtMonedasUpdate->bind_param("ii",
                        $monedasUpdate,
                        $usuarioId
                    );
                    
                    $stmtMonedasUpdate->execute();

                    $query = "UPDATE usuarios SET nickName = ? WHERE id = ?";
                    $stmt = $conn->prepare($query);
                    $stmt->bind_param("si", 
                        $nickName, 
                        $usuarioId
                    );
                    $stmt->execute();

                    $response = [
                        'status' => true,
                        'mensaje' => 'Descripción actualizada correctamente'
                    ];
                }else{
                    $response=[
                        'status'=> false,
                        'mensaje'=>'monedas insuficientes'
                    ];
                }      
            }
        } else {

            $response = [
                'status' => 'FALSE',
                'mensaje' => 'No hay avatares disponibles para mostrar.'
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
