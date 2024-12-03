<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Asegúrate de que la ruta sea correcta

// Conexión a la base de datos
$mysqli = new mysqli('localhost', 'usuario', 'contraseña', 'nombre_base_datos');

if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

// Verificar si se envió el formulario
if (isset($_POST['submit'])) {
    $email = $mysqli->real_escape_string($_POST['email']);

    // Verificar si el correo existe en la base de datos
    $result = $mysqli->query("SELECT id FROM usuarios WHERE email='$email'");
    
    if ($result->num_rows > 0) {
        // Generar un token único
        $token = bin2hex(random_bytes(50));
        
        // Guardar el token en la base de datos
        $mysqli->query("UPDATE usuarios SET reset_token='$token' WHERE email='$email'");

        // Enviar el correo
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.example.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'tu_correo@example.com';
            $mail->Password   = 'tu_contraseña';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom('tu_correo@example.com', 'Tu Nombre');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Recuperación de Contraseña';
            $mail->Body    = "Haz clic en el siguiente enlace para recuperar tu contraseña: <a href='http://tu_dominio.com/reset_password.php?token=$token'>Recuperar Contraseña</a>";
            $mail->AltBody = "Haz clic en el siguiente enlace para recuperar tu contraseña: http://tu_dominio.com/reset_password.php?token=$token";

            $mail->send();
            echo 'Se ha enviado un enlace para recuperar tu contraseña a tu correo.';
        } catch (Exception $e) {
            echo "El mensaje no pudo ser enviado. Error de Mailer: {$mail->ErrorInfo}";
        }
    } else {
        echo 'No se encontró un usuario con ese correo.';
    }
}

$mysqli->close();
?>

<!-- Formulario HTML -->
<form method="post">
    <input type="email" name="email" placeholder="Ingresa tu correo" required>
    <button type="submit" name="submit">Recuperar Contraseña</button>
</form>
