<?php
include('../conexion/conexion.php');
session_start(); // Asegúrate de iniciar la sesión

$conectar = new conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $passwordUsuario = $_POST['password']; 

    // Verifica si el ID del usuario está en la sesión
    if (isset($_SESSION['id'])) {
        $idUsuario = $_SESSION['id'];

        // Cambia la consulta para que solo afecte al registro correspondiente
        $sqlUpdate = "UPDATE usuarios SET contraseña = :passwordPer WHERE id = :id";
        $valores = array(':passwordPer' => $passwordUsuario, ':id' => $idUsuario);

        try {
            // Ejecuta la consulta
            $conectar->ejecutar($sqlUpdate, $valores);

            // Si no ocurre una excepción, se asume que se ejecutó correctamente
            echo "<script>
                    alert('Contraseña actualizada con éxito.');
                    window.location.href = '../../index.html'; 
                  </script>";
        } catch (PDOException $e) {
            // Captura y muestra el error
            echo "<script>
                    alert('Error: " . $e->getMessage() . "');
                  </script>";
        }
    } else {
        echo "<script>
                alert('No se encontró el ID de usuario. Por favor, intenta de nuevo.');
                window.location.href = '../email/enviarCodigo.php'; 
              </script>";
    }
}
?>
