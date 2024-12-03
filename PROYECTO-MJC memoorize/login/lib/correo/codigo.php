<?php
include('../conexion/conexion.php');

$conectar = new conexion();

// Asegúrate de iniciar la sesión solo si no está activa
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $codigo = $_POST['codigo']; // No convertir a entero aquí

    // Verifica si el idUsuario está en la sesión
    if (!isset($_SESSION['id'])) {
        $alertMessage = 'No estás autorizado para acceder a esta página.';
        echo "<script>
                alert('$alertMessage');
                window.location.href = '../email/enviarCodigo.php'; 
              </script>";
        exit();
    }

    // Obtiene el idUsuario de la sesión
    $idUsuarioSesion = $_SESSION['id'];

    // Cambia la consulta para seleccionar el personaId junto con el token y la fecha de expiración
    $sqlCodigo = "SELECT id, reset_token, token_expiration FROM usuarios WHERE reset_token = :codigoVerificacion AND id = :idUsuario";
    $valores = array(':codigoVerificacion' => $codigo, ':idUsuario' => $idUsuarioSesion);
    
    $resultado = $conectar->consultaValor($sqlCodigo, $valores);

    if ($resultado === null) {
        echo "No se devolvieron resultados. Revisa tu consulta.";
        exit();
    }
    
    if (count($resultado) > 0) {
        // Obtener la información del resultado
        $idUsuarioBD = $resultado[0]['id']; 
        $codigoBD = $resultado[0]['reset_token'];
        $fechaExpiracion = $resultado[0]['token_expiration'];
        
        // Obtener la hora actual en formato de fecha
        $horaActual = date("Y-m-d H:i:s");
    
        // Verificar si el código coincide y no ha expirado
        if ($codigo === $codigoBD && $horaActual <= $fechaExpiracion) {
            // Código válido
            $_SESSION['id'] = $idUsuarioBD; 
    
            $alertMessage = 'Código correcto';
            echo "<script>
                    alert('$alertMessage');
                    window.location.href = '../email/enviarPassword.php'; 
                  </script>";
            exit();
        } else {
            // Código incorrecto o expirado
            $alertMessage = 'Código incorrecto o expirado.';
            echo "<script>
                    alert('$alertMessage');
                    window.location.href = '../email/enviarCodigo.php'; 
                  </script>";
        }
    } else {
        // El código no existe en la base de datos o no coincide con el usuario
        $alertMessage = 'Código no encontrado o no corresponde a tu cuenta.';
        echo "<script>
                alert('$alertMessage');
                window.location.href = '../email/enviarCodigo.php';
              </script>";
    }
}
?>
