<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include('vendor/autoload.php');
include('../conexion/conexion.php');

session_start(); // Asegúrate de iniciar la sesión

$conectar = new conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $correo = $_POST['recuperar'];

    $sqlCorreo = "SELECT id FROM usuarios WHERE correo = :correoPersona";
    $valores = array(':correoPersona' => $correo);
    
    // Cambié consultaValor() por consulta()
    $resultado = $conectar->consulta($sqlCorreo, $valores);

    // Comprobamos si se encontró el correo
    if ($resultado && count($resultado) > 0) {
        $idUsuario = $resultado[0]['id'];
        
        // Almacena el ID en la sesión
        $_SESSION['id'] = $idUsuario;

        $codigo = random_int(100000, 999999);
        $expiration = date("Y-m-d H:i:s", strtotime('+1 hour'));

        // Guarda el código y la expiración en la base de datos
        $stmt = $conectar->conectar()->prepare("UPDATE usuarios SET reset_token = ?, token_expiration = ? WHERE id = ?");
        $stmt->execute([$codigo, $expiration, $idUsuario]);

        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'aquacmemorize@gmail.com';
            $mail->Password = 'cvyk cazn goes yhev'; // Reemplaza con tu contraseña de aplicación si es necesario
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('aquacmemorize@gmail.com', 'Aquac Memorize');
            $mail->addAddress($correo);

            $mail->isHTML(true);
            $mail->Subject = 'Número de restablecimiento de contraseña';
            $mail->Body = "Hola,<br><br>Tu número de verificación para restablecer la contraseña es: <b>$codigo</b>.<br>Este código expirará en 1 hora.";
            $mail->AltBody = "Tu número de verificación para restablecer la contraseña es: $codigo. Este código expirará en 1 hora.";

            $mail->send();
            $alertMessage = 'El código de restablecimiento ha sido enviado a tu correo.';
            // Redirigir a enviarCodigo.php en caso de éxito
            echo "<script>
                    alert('$alertMessage');
                    window.location.href = '../email/enviarCodigo.php';
                  </script>";
        } catch (Exception $e) {
            // Error al enviar el correo
            $alertMessage = 'Error al enviar el correo: ' . $mail->ErrorInfo;
            // Redirigir a enviarCorreo.php en caso de error
            echo "<script>
                    alert('$alertMessage');
                    window.location.href = '../recuperar/index.html';
                  </script>";
        }
    } else {
        // El correo no está registrado
        $alertMessage = 'El correo ingresado no está registrado.';
        echo "<script>
                alert('$alertMessage');
                
              </script>";
    }
    exit();
}
?>
