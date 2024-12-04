<?php
  include('../conexion/conexion.php');

session_start();

    $response= [];
    $historial= $_SESSION['id'];
        $database = new Database();
        $conn = $database->connect();
        if($conn){
            $query="
        SELECT 
            hn.usuarioId AS usuario_id,
            u.nickName AS usuario_nickname,
            hn.juegoId AS juego_id,
            j.nombre AS juego_nombre,
            hn.nivelId AS nivel_id,
            n.numero AS nivel_numero,
            hn.puntos AS puntos,
            hn.monedas AS monedas,
            hn.tiempo AS tiempo,
            hn.estadoNivel AS estado,
            hn.fechaInicio as fecha,
            'niveles' AS modalidad
        FROM 
            historialNiveles hn
        JOIN 
            usuarios u ON hn.usuarioId = u.id
        JOIN 
            juegos j ON hn.juegoId = j.id
        JOIN 
            niveles n ON hn.nivelId = n.id
        WHERE u.id= 1

        UNION ALL

        SELECT 
            hs.participanteId AS usuario_id,
            u.nickName AS usuario_nickname,
            NULL AS juego_id,  -- No se utiliza juegoId en multijugador
            NULL AS juego_nombre,
            NULL AS nivel_id,  -- No aplica nivel en multijugador
            NULL AS nivel_numero,
            hs.puntosTotal AS puntos,
            NULL AS monedas,  -- Las monedas no se consideran en multijugador
            hs.tiempoPromedio AS tiempo,
            hs.podioFinal AS estado,
            hs.fechaInicio as fecha,
            'multijugador' AS modalidad
        FROM 
            historialSala hs
        JOIN 
            usuarios u ON hs.participanteId = u.id
        WHERE u.id= 1
        ORDER BY fecha DESC;
        ";
            $stmt= $conn->prepare($query);
            $stmt->bind_param("isiisi",
                $creadorSala,
                $nombreSala,
                $codigoSala,
                $capacidadSala,
                $dificultadSala,
                $rondasSala
            );
            $stmt->execute();

            $response=[
                'status' => 'true',
                'mensaje'=>'historial guardado exitosamente'
            ];
        }else{
            $response=['mensaje'=>"error al guardar historial"];
        }
    header('Content-Type: application/json');
    echo json_encode($response);
?>