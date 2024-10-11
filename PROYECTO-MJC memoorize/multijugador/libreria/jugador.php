<?php

class Jugador {
    private $nickName;

    // Constructor para inicializar el nickName del jugador
    public function __construct($nickName) {
        $this->nickName = $nickName;
    }

    // Obtener el nickName del jugador
    public function getNickName() {
        return $this->nickName;
    }
}

?>