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
            usuario.id AS UsuarioID,
            usuario.nickName AS Usuario,
            usuario.correo AS Correo,
            avatar.nombre AS AvatarNombre,
            avatar.imagen AS AvatarImagen,
            avatar.precio AS AvatarPrecio,
            avatar.es_gratuito AS EsGratuito
        FROM 
            usuario
        JOIN 
            avatar ON usuario.avatarId = avatar.id;
        ";
        $result = $conn->query($query);

        // Verificar si hay resultados
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                // Agregar cada fila de resultados al array de respuesta
                $response= [
                    'UsuarioID' => $row['UsuarioID'],
                    'Usuario' => $row['Usuario'],
                    'Correo' => $row['Correo'],
                    'AvatarNombre' => $row['AvatarNombre'],
                    'AvatarImagen' => $row['AvatarImagen'],
                    'AvatarPrecio' => $row['AvatarPrecio'],
                    'EsGratuito' => $row['EsGratuito']
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
