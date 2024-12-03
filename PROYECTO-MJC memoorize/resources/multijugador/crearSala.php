 <?php

    include('../conexion/conexion.php');

    session_start();

    $response= [];
    $creadorSala= $_SESSION['id'];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if($data && isset($data['nombreSala']) && isset($data['codigoSala']) && isset($data['capacidadSala']) && isset($data['dificultadSala'])  && isset($data['rondasSala'])){

        $nombreSala = $data['nombreSala'];
        $codigoSala = $data['codigoSala'];
        $capacidadSala = $data['capacidadSala'];
        $dificultadSala = $data['dificultadSala'];
        $rondasSala = $data['rondasSala'];

        $database = new Database();
        $conn = $database->connect();

        if($conn){
            $query="
            INSERT INTO sala (creadorId, nombre, codigo, capacidad, dificultad, rondas) VALUE (?,?,?,?,?,?);
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

            $_SESSION['codigoSala']= $codigoSala;

            $stmt->execute();

            $response=[
                'status' => 'true',
                'mensaje'=>'sala creada correctamente'
            ];

        }else{
            $response=['mensaje'=>"error al conectar a la base de datos"];
        }

    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>