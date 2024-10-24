
<?php
    // Incluir la clase Database
    include_once '../conexion/conexion.php';

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $response = [];

    if ($data && isset($data['id'])) {

        $avatarId= $data['id'];

        $database = new Database();
        $conn = $database->connect();

        if (empty($avatarId)) {
            if ($conn) {
                $query = "SELECT 
                    *
                FROM 
                    avatar
                ;
                ";
                $result = $conn->query($query);
    
    
                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        
                        $response[]= [
                            'id'=>$row['id'],
                            'nombre'=>$row['nombre'],
                            'imagen'=>$row['imagen'],
                            'gratis'=>$row['es_gratuito']
                        ];
                    }
                } else {
                    echo "No se encontraron registros.";
                }
                
                
                $database->disconnect();
            } else {
                echo "Fallo en la conexión a la base de datos.";
            }
        }else{
            if ($conn) {
                $query = "UPDATE `usuario` SET `avatarId` = ? WHERE `usuario`.`id` = ?;";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $avatarId); // Vinculamos el id como un entero
                $stmt->execute();
                $result = $stmt->get_result();
            }
        }

    }else {
        $response = [
            'status' => 'error',
            'message' => 'Datos no recibidos correctamente. Se requiere correo y contraseña.'
        ];
    }

    header('Content-Type: application/json');

    echo json_encode($response);
    
?>
