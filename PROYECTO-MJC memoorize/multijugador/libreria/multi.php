<?php

// Incluir las clases
include('Sala.php');
include('jugador.php');

// Crear jugadores con nickName
$jugador1 = new Jugador("Thorfinn455");
$jugador2 = new Jugador("isaCarrera");
$jugador3 = new Jugador("ErikTheRed");

// Crear un arreglo vacío para almacenar las salas
$salas = [];

// Crear algunas salas
$sala1 = new SalaMultijugador(1, "Sala de Aventuras", 5);
$sala2 = new SalaMultijugador(2, "Sala de Combate", 10);

// Agregar jugadores a las salas
$sala1->agregarJugador($jugador1); // Thorfinn455 se une a la sala 1
$sala1->agregarJugador($jugador2); // isaCarrera se une a la sala 1

$sala2->agregarJugador($jugador3); // ErikTheRed se une a la sala 2

// Añadir los detalles de las salas al arreglo
$salas[] = $sala1->getDetalles();
$salas[] = $sala2->getDetalles();

// Convertir el arreglo de salas a JSON
$salasJSON = json_encode($salas, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $salasJSON;

?>
