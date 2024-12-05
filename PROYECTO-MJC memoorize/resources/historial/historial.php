<?php
    include('../conexion/conexion.php');

    session_start();

    $response= [];
    $usuarioId= $_SESSION['id'];

    $database = new Database();
    $conn = $database->connect();

    if($conn){
        $query="
        SELECT 
            j.nombre AS juego,
            hn.juegoId AS nivelSalaId,
            n.nombre AS nombre,
            hn.puntos AS puntos,
            hn.monedas AS monedas,
            hn.tiempo AS tiempo,
            hn.fechaInicio AS fecha,
            'niveles' AS modalidad,
            CASE 
                WHEN hn.estadoNivel = 1 THEN 'Ganaste'
                ELSE 'Derrota'
            END AS estado
        FROM 
            historialNiveles hn
        JOIN 
            usuarios u ON hn.usuarioId = u.id
        JOIN 
            niveles n ON hn.nivelId = n.id
        JOIN 
            juegos j ON hn.juegoId = j.id
        WHERE 
            u.id = 1

        UNION ALL

        SELECT 
            j.nombre AS juego,
            hs.salaId AS nivelSalaId,
            s.nombre AS nombre,
            hs.puntosTotal AS puntos,
            hs.monedas AS monedas,  -- No aplica monedas en historialSala
            hs.tiempoPromedio AS tiempo,
            hs.fechaInicio AS fecha,
            'multijugador' AS modalidad,
            CASE 
                WHEN hs.podioFinal BETWEEN 1 AND 3 THEN 'Ganaste'
                ELSE 'Derrota'
            END AS estado
        FROM 
            historialSala hs
        JOIN 
            usuarios u ON hs.participanteId = u.id
        JOIN 
            juegos j ON hs.juegoId = j.id
        JOIN 
            sala s ON hs.salaId = s.id
        WHERE 
            u.id = 1
        ORDER BY 
            fecha DESC
        LIMIT 0, 25;
        ";

        $stmt= $conn->prepare($query);
        $stmt->bind_param("ii",
            $usuarioId,
            $usuarioId
        );
        $stmt->execute();

        $result = $stmt->get_result();
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $response+=[
                        'juego' => $row['juego'],
                        'nivelSalaId' => $row['nivelSalaId'],
                        'nombre' => $row['nombre'],
                        'puntos' => $row['puntos'],
                        'tiempo' => $row['tiempo'],
                        'monedas' => $row['monedas'],
                        'fecha' => $row['fecha'],
                        'modalidad' => $row['modalidad'],
                        'estado' => $row['estado']
                    ];
                }
            } else {
    
                $response = [
                    'status' => 'FALSE',
                    'mensaje' => 'no has jugado ninguna partida.'
                ];
    
            }

    }else{
        $response=['mensaje'=>"error al guardar historial"];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>