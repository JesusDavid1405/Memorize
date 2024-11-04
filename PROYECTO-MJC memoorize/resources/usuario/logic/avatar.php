
<?php
    // Incluir la clase Database
    include_once ('../../conexion/conexion.php');

    $database = new Database();
    $conn = $database->connect();

    if ($conn) {
        $query = "SELECT 
            *
        FROM 
            avatares
        ;
        ";
        $result = $conn->query($query);


        if ($result) {
            while ($row = $result->fetch_assoc()) {
                
                $response[]= [
                    'id'=>$row['id'],
                    'nombre'=>$row['nombre'],
                    'imagen'=>$row['imagen'],
                    'valor'=>$row['valor']
                ];
            }
        } else {
            echo "No se encontraron registros.";
        }
        
        
        $database->disconnect();
    } else {
        echo "Fallo en la conexión a la base de datos.";
    }
    
    header('Content-Type: application/json');

    echo json_encode($response);
    
?>
