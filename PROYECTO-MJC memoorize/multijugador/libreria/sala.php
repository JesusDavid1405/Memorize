<?php

class SalaMultijugador {
    private $id;
    private $nombre;
    private $maxJugadores;
    private $jugadoresActuales;
    private $estado;

    // Constructor para inicializar los atributos
    public function __construct($id, $nombre, $maxJugadores, $jugadoresActuales = 0) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->maxJugadores = $maxJugadores;
        $this->jugadoresActuales = $jugadoresActuales;
        $this->actualizarEstado();
    }

    // Método para agregar un jugador
    public function agregarJugador() {
        if ($this->jugadoresActuales < $this->maxJugadores) {
            $this->jugadoresActuales++;
            $this->actualizarEstado();
        } else {
            echo "La sala está completa.\n";
        }
    }

    // Método para quitar un jugador
    public function quitarJugador() {
        if ($this->jugadoresActuales > 0) {
            $this->jugadoresActuales--;
            $this->actualizarEstado();
        }
    }

    // Método privado para actualizar el estado de la sala
    private function actualizarEstado() {
        if ($this->jugadoresActuales === $this->maxJugadores) {
            $this->estado = "completa";
        } elseif ($this->jugadoresActuales > 0) {
            $this->estado = "esperando";
        } else {
            $this->estado = "vacía";
        }
    }

    // Método para obtener los detalles de la sala en un array
    public function getDetalles() {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'maxJugadores' => $this->maxJugadores,
            'jugadoresActuales' => $this->jugadoresActuales,
            'estado' => $this->estado
        ];
    }
}

?>
