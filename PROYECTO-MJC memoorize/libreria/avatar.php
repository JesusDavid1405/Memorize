<?php
    // Incluir la clase Database
    include_once 'conexion.php';

    // Crear una instancia de la clase Database
    $database = new Database();

    // Conectar a la base de datos
    $conn = $database->connect();

    $response = [];

    // Verificar si la conexión fue exitosa
    if ($conn) {
        // Ejemplo de consulta
        $query = "
        SELECT 
            *
        FROM 
            avatar
        ;
        ";
        $result = $conn->query($query);

        // Verificar si hay resultados
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                // Agregar cada fila de resultados al array de respuesta
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
        
        // Cerrar la conexión
        $database->disconnect();
    } else {
        echo "Fallo en la conexión a la base de datos.";
    }

    // Configurar el encabezado para la respuesta JSON
    header('Content-Type: application/json');

    // Devolver la respuesta en formato JSON
    echo json_encode($response);
    
?>
