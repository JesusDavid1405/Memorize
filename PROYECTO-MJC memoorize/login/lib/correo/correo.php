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

    // Realiza la consulta a la base de datos
    $resultado = $conectar->consulta($sqlCorreo, $valores);

    // Verifica si se encontró el correo
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
            // Configuración del correo
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'aquacmemorize@gmail.com'; // Tu correo
            $mail->Password = 'cvyk cazn goes yhev'; // Contraseña de aplicación (no la contraseña normal)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Configuración del remitente y destinatario
            $mail->setFrom('aquacmemorize@gmail.com', 'Aquac Memorize');
            $mail->addAddress($correo);

            // Configuración del contenido del correo
            $mail->isHTML(true); // El contenido será HTML
            $mail->CharSet = 'UTF-8'; // Configura UTF-8 para evitar problemas con caracteres especiales
            $mail->Subject = 'Número de restablecimiento de contraseña';
            $mail->Body = "
                <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                    <p>Hola,</p>
                    <p>Tu número de verificación para restablecer la contraseña es:</p>
                    <p style='font-size: 24px; font-weight: bold; color: #fff; background-color: #007BFF; padding: 10px 15px; border-radius: 5px; display: inline-block;'>
                        $codigo
                    </p>
                    <p>Este código expirará en 1 hora.</p>
                    <p>Si no solicitaste este cambio, ignora este correo.</p>
                </div>
            ";
            $mail->AltBody = "Hola, Tu número de verificación para restablecer la contraseña es: $codigo. Este código expirará en 1 hora. Si no solicitaste este cambio, ignora este correo.";

            // Enviar el correo
            $mail->send();

            $alertMessage = 'El código de restablecimiento ha sido enviado a tu correo.';
            echo "<script>
                    alert('$alertMessage');
                    window.location.href = '../email/enviarCodigo.php';
                  </script>";
        } catch (Exception $e) {
            // Manejar errores al enviar el correo
            $alertMessage = 'Error al enviar el correo: ' . $mail->ErrorInfo;
            echo "<script>
                    alert('$alertMessage');
                    window.location.href = '../recuperar/index.html';
                  </script>";
        }
    } else {
        // Si el correo no está registrado
        $alertMessage = 'El correo ingresado no está registrado.';
        echo "<script>
                alert('$alertMessage');
              </script>";
    }
    exit();
}
?>
