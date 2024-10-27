<?php

   include_once('../conexion/conexion.php');

  class podio_final_sala{

    private $id;
    private $salaId;
    private $jugadorId;
    private $posicionFinal;
    private $puntosFinal;

    // Constructor para enviar datos null y no un error
    public function __construct($id = null, $salaId = null, $jugadorId = null, $posicionFinal = null, $puntosFinal = null) {
        $this->id = $id;
        $this->salaId = $salaId;
        $this->jugadorId = $jugadorId;
        $this->posicionFinal = $posicionFinal;
        $this->puntosFinal = $puntosFinal;
    }

    //id

    public function setId($id){
        $this ->id = $id;
    }
    public function getid(){
        return $this ->id;
    }

    //salaId

    public function setSalaId($salaId){
        $this ->salaId = $salaId;
    }
    public function getsalaId(){
        return $this ->salaId;
    }
    
    //jugadorId

    public function setJugadorId($jugadorId){
        $this ->jugadorId = $jugadorId;
    }
    public function getjugadorId(){
        return $this ->jugadorId;
    }
//posicion final

    public function setPosicionFinal($posicionFinal){
        $this ->posicionFinal = $posicionFinal;
    }
    public function getPosicionFinal(){
        return $this ->posicionFinal;
    }

    //puntos final

    public function setPuntosFinal($puntosFinal){
        $this ->puntosFinal = $puntosFinal;
    }
    public function getPuntosFinal(){
        return $this ->puntosFinal;
    }


    //funcion de guardar informacion
    public function guardar() {

        // Preparar la consulta
        $database = new Database();
        $conn = $database->connect();

        try{

            $query = "INSERT INTO podioFinalSala (salaId, jugadorId, posicionFinal, puntosFinal)
            VALUES (:salaId, :jugadorId, :posicionFinal, :puntosFinal)";

            $stmt = $conn->prepare($query);

            $stmt->bindParam(':salaId', $this->salaId);
            $stmt->bindParam(':jugadorId', $this->jugadorId);
            $stmt->bindParam(':posicionFinal', $this->posicionFinal);
            $stmt->bindParam(':puntosFinal', $this->puntosFinal);

          
    
            if ($stmt->execute()) {
                echo "datos guardados";
                return true;
            } else {
                echo "Error al guardar los datos";
                return false;
            }
        } catch (PDOException $exception) {
            echo "Error: " . $exception->getMessage();
            return false;
        }
     }
   
    //funcion eliminar

    public function eliminar($id) {
        // Obtener la conexión a la base de datos
        $database = new Database();
        $conn = $database->connect();

        try{
            $query = "DELETE FROM podioFinalSala WHERE id = ?";

            // Preparar la consulta
            $stmt = $conn->prepare($query);

            $stmt->bind_Param('i', $id);
        
        if ($stmt->execute()) {
            echo "dato eliminado exitosamente.";
            return true;
        } else {
            echo "Error al eliminar el dato.";
            return false;
        }
    } catch (PDOException $exception) {
        echo "Error: " . $exception->getMessage();
        return false;
    } 
   }
 }

?>