<?php

    include('usuario.php');

    $usuario1= new Usuario(
        "Thorfinn455",
        "jesusdavidfierrorivera817@gmail.com",
        "jesus123"
    );
    $usuario2= new Usuario(
        "isaCarrera",
        "isabellacarrera@gmail.com",
        "isa123"
    );

    $response=[];

    $response[] = [
        'nickName' => $usuario1->getNickName(),
        'correo' => $usuario1->getCorreo(),
        'contraseña' => $usuario1->getContraseña(),
    ];
    $response[] = [
        'nickName' => $usuario2->getNickName(),
        'correo' => $usuario2->getCorreo(),
        'contraseña' => $usuario2->getContraseña(),
    ];

    header('content-Type: application/json');
    echo json_encode($response);

?>