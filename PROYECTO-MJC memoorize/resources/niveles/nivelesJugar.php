<?php

    include('../conexion/conexion.php');
    session_start();

    $usuarioId= $_SESSION['id'];
    $juegoId= $_SESSION['juegoId'];

    $response = [];
    $database = new Database();
    $conn = $database->connect();

    if ($conn) {
        $query = "
        SELECT 
            n.id, 
            n.nombre, 
            n.numero 
        FROM 
            niveles n
        LEFT JOIN 
            historialniveles h 
            ON n.id = h.nivelId 
            AND h.usuarioId = ?
            AND h.juegoId = ? -- Filtrar por el juego
        WHERE 
            (n.numero = 1 AND (h.estadoNivel IS NULL OR h.estadoNivel = 0))
            OR 
            (h.estadoNivel = TRUE)
            OR
            (
                h.estadoNivel IS NULL AND EXISTS (
                    SELECT 1 
                    FROM historialniveles h_prev
                    JOIN niveles n_prev ON h_prev.nivelId = n_prev.id
                    WHERE h_prev.usuarioId = ?
                    AND h_prev.juegoId = ? -- Filtrar por el juego
                    AND h_prev.estadoNivel = TRUE
                    AND n_prev.numero = n.numero - 1
                )
            )
            OR
            (
                h.estadoNivel = 0 AND NOT EXISTS (
                    SELECT 1
                    FROM historialniveles h_next
                    JOIN niveles n_next ON h_next.nivelId = n_next.id
                    WHERE h_next.usuarioId = ?
                    AND h_next.juegoId = ? -- Filtrar por el juego
                    AND h_next.estadoNivel = TRUE
                    AND n_next.numero = n.numero + 1
                )
            )
            AND n.juegoId = ? -- Filtrar por el juego en la tabla niveles
        ORDER BY 
            n.numero ASC;

        ";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("iiiiiii", 
            $usuarioId,
            $juegoId,
            $usuarioId,
            $juegoId,
            $usuarioId,
            $juegoId,
            $juegoId
        );
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $response[] = [
                    'id' => $row['id'],
                    'nombre' => $row['nombre'],
                    'numero' => $row['numero']
                ];
            }
        } else {
            $response = [
                'status' => 'FALSE',
                'mensaje' => 'No hay avatares disponibles para mostrar.'
            ];
        }

        $database->disconnect();
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>
