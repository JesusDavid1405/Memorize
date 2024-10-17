<?php
    // Incluir la clase Database
    include_once 'conexion.php';

    // Crear una instancia de la clase Database
    $database = new Database();

    // Conectar a la base de datos
    $conn = $database->connect();

    $response = [];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    
    if ($data && isset($data['correo']) && isset($data['contraseña'])) {
        
        $correo = $data['correo'];
        $contraseña = $data['contraseña'];
    
        // Conexión a la base de datos (suponiendo que $conn es tu conexión previamente establecida)
        if ($conn) {
            // Consulta preparada para evitar inyección SQL
            $query = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";
            $stmt = $conn->prepare($query);
    
            // Vincular parámetros y ejecutar la consulta
            $stmt->bind_param("ss", $correo, $contraseña); // 'ss' significa dos strings
            $stmt->execute();
    
            // Obtener los resultados
            $result = $stmt->get_result();
    
            // Verificar si hay resultados
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    // Crear respuesta con los datos obtenidos de la base de datos
                    $response = [
                        'status' => 'success',
                        'id' => $row['id'], // Asegúrate que 'id' es el campo correcto en tu tabla
                        'nickName' => $row['nickName'],
                        'correo' => $row['correo']
                    ];
                }
            } else {
                // Si no se encontraron registros
                $response = [
                    'status' => 'error',
                    'message' => 'No se encontraron registros con esas credenciales.'
                ];
            }
    
            // Cerrar la consulta
            $stmt->close();
            
            // Cerrar la conexión
            $conn->close();
        } else {
            // Si la conexión a la base de datos falla
            $response = [
                'status' => 'error',
                'message' => 'Fallo en la conexión a la base de datos.'
            ];
        }
    } else {
        // En caso de que no se reciban datos correctamente desde el JSON
        $response = [
            'status' => 'error',
            'message' => 'Datos no recibidos correctamente. Se requiere correo y contraseña.'
        ];
    }
    
    // Configurar el encabezado para la respuesta JSON
    header('Content-Type: application/json');
    
    // Devolver la respuesta en formato JSON
    echo json_encode($response);
?>
