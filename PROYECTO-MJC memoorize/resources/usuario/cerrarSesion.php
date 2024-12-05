<?php

    session_start();

    $response=[];

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if($data && isset($data['confirmacion'])){
        $confirmacion = $data['confirmacion'];

        if($confirmacion){
            
            $response=[
                'status'=>'true',
                'mensaje'=>'sesion cerrada correctamente'
            ];

            session_destroy();
        }else{
            $response=[
                'status'=>'false',
                'mensaje'=>'error de al cerrar la sesion'
            ];
        }

    }else{
        $response=[
            'status'=>false,
            'mensaje'=>'error al cerrar la sesion'
        ];
    }

?>