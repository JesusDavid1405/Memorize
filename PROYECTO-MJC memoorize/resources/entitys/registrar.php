<?php

include_once('../conexion/conexion.php');
include('../entitys/usuario.php');

$response=[];

class Registrar extends Usuario{
    
    private $sqlInsert;
    private $sqlCheck;

    public function registro(){
        $conexion = new Database();
        $conn = $conexion->connect(); // Asegúrate de que el método `connect()` te devuelva un objeto mysqli.

        // Verificar si el nickName ya existe
        $this->sqlCheck = "SELECT COUNT(*) FROM usuario WHERE nickName = ?";
        $stmtCheck = $conn->prepare($this->sqlCheck);

        // Asignar el valor del nickName a una variable
        $nickName = $this->getNickName();

        $stmtCheck->bind_param("s", $nickName);
        $stmtCheck->execute();

        // Definir una variable para almacenar el resultado
        $count = 0;
        $stmtCheck->bind_result($count);
        $stmtCheck->fetch();
        $stmtCheck->close();

        if ($count > 0) {
            echo "El nombre de usuario ya existe. Por favor, elige otro.";
            return; // Salir del método para evitar la inserción
        }

        // Asignar los valores de los métodos a variables
        $correo = $this->getCorreo();
        $contraseña = $this->getContraseña();

        // Insertar el nuevo registro
        $this->sqlInsert = "INSERT INTO usuario (nickName, correo, contraseña) VALUES (?, ?, ?)";

        // Preparar la consulta
        $stmt = $conn->prepare($this->sqlInsert);

        // Enlazar los parámetros usando variables
        $stmt->bind_param("sss", $nickName, $correo, $contraseña);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Redirigir a index.html después de una inserción exitosa
            header("Location: ../../login/index.html");
            exit(); // Asegúrate de detener el script después de redirigir
        } else {
            echo "Error al insertar el registro.";
        }

        // Cerrar la consulta
        $stmt->close();
    }
}
?>
