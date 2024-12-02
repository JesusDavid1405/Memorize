<?php

session_start();

$input = file_get_contents('php://input');
$data = json_decode($input, true);
    

if ($data && isset($data['juegoId'])) {

    $_SESSION['juegoId'] = $data['juegoId'];

} elseif (isset($_SESSION['juegoId'])) {

    $juegoId = $_SESSION['juegoId'];

} else {
    
    echo json_encode([
        'error' => 'No se ha proporcionado un juegoId'
    ]);
    
    exit; 
}

?>