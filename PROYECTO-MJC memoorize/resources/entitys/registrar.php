<?php

include_once('../conexion/conexion.php');
include('../entitys/usuario.php');

$response=[];

class Registrar extends Usuario {

    private $sqlInsert;
    private $sqlCheck;

    public function registro(&$response) {
        $conexion = new Database();
        $conn = $conexion->connect();

        // Verificar si el nickName ya existe
        $this->sqlCheck = "SELECT COUNT(*) FROM usuario WHERE nickName = ?";
        $stmtCheck = $conn->prepare($this->sqlCheck);
        
        $nickName = $this->getNickName();
        $stmtCheck->bind_param("s", $nickName);
        $stmtCheck->execute();
        
        $count = 0;
        $stmtCheck->bind_result($count);
        $stmtCheck->fetch();
        $stmtCheck->close();

        if ($count > 0) {
            $response = [
                'success' => 'error',
                'message' => 'El nombre de usuario ya existe.'
            ];
            return;
        }

        // Verificar si el correo ya existe
        $this->sqlCheck = "SELECT COUNT(*) FROM usuario WHERE correo = ?";
        $stmtCheck = $conn->prepare($this->sqlCheck);
        $correo = $this->getCorreo();
        $stmtCheck->bind_param("s", $correo);
        $stmtCheck->execute();

        $count = 0;
        $stmtCheck->bind_result($count);
        $stmtCheck->fetch();
        $stmtCheck->close();

        if ($count > 0) {
            $response = [
                'success' => 'error',
                'message' => 'El correo ya está registrado.'
            ];
            return;
        }

        if (empty($this->getNickName()) || empty($this->getCorreo()) || empty($this->getContraseña())) {
            $response = [
                'success' => 'error',
                'message' => 'Todos los campos son obligatorios.'
            ];
            return;
        }
        
        
        $contraseña = $this->getContraseña();
        $this->sqlInsert = "INSERT INTO usuario (nickName, correo, contraseña) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($this->sqlInsert);
        $stmt->bind_param("sss", $nickName, $correo, $contraseña);

        // Ejecutar la consulta y actualizar el response
        if ($stmt->execute()) {
            $response = [
                'success' => 'correcto',
                'message' => 'Usuario registrado correctamente.'
            ];
        } else {
            $response = [
                'success' => 'error',
                'message' => 'Error al insertar el registro.'
            ];
        }

        $stmt->close();
    }
}
$persona = new Registrar();
$persona->registro($response);  

header('Content-Type: application/json');
echo json_encode($response);

?>
