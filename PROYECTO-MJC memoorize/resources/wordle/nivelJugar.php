<?php

session_start();

$input = file_get_contents('php://input');
$data = json_decode($input, true);
    

if ($data && isset($data['nivelId'])) {

    $_SESSION['nivelId'] = $data['nivelId'];

} elseif (isset($_SESSION['nivelId'])) {

    $nivelId = $_SESSION['nivelId'];

} else {
    
    echo json_encode([
        'error' => 'No se ha proporcionado un nivelId'
    ]);
    
    exit; 
}

?>