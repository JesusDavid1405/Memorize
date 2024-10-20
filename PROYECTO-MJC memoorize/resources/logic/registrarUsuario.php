<?php

    include('../entitys/registrar.php');
    
    $nickName = isset($_POST['nickName']) ? $_POST['nickName'] : null;
    $correo = isset($_POST['correo']) ? $_POST['correo'] : null;
    $contraseña = isset($_POST['contraseña']) ? $_POST['contraseña'] : null;

    $persona = new Registrar();

    $persona->setNickName($nickName);
    $persona->setCorreo($correo);
    $persona->setContraseña($contraseña);
    $persona->registro();

?>