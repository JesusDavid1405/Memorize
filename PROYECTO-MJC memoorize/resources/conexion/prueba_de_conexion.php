<?php
require_once ('conexion.php');


$database = new Database();
$conn = $database->connect();

if ($conn) {
    echo "Conexión exitosa a la base de datos.";
} else {
    echo "No se pudo establecer la conexión.";
}

require_once ('../entitys/Podio_final_sala.php');

// Crear una instancia de la clase
$podio = new podio_final_sala();

// Llamar a la función eliminar con el ID que deseas borrar
$id = 2; // Cambia a la ID que deseas eliminar
$podio->eliminar($id);
?>
