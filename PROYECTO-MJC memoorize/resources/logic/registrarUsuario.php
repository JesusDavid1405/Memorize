<?php

    include('../entitys/registrar.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nickName = $_POST['nickName'] ?? null;
        $correo = $_POST['correo'] ?? null;
        $contraseña = $_POST['contraseña'] ?? null;


        $persona = new Registrar();
        $persona->setNickName($nickName);
        $persona->setCorreo($correo);
        $persona->setContraseña($contraseña);

        $response = [];
        $persona->registro($response);  

        header('Content-Type: application/json');
        json_encode($response);
    }
?>
