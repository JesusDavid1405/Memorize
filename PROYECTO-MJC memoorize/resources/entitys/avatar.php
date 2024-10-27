<?php

    class Avatar
    {
        private $nombre;
        private $imagen;
        private $precio;
        private $esGratuito;

        //aqui sera los nombre

        public function setNombre($nombre)
        {
            $this->nombre = $nombre;
        }
        public function getNombre()
        {
            return $this->nombre;
        }

        //las imagenes

        public function setImagen($imagen)
        {
            $this->imagen = $imagen;
        }
        public function getImagen()
        {
            return $this->imagen;
        }

        //precio

        public function setPrecio($precio)
        {
            $this->precio = $precio;
        }
        public function getPrecio()
        {
            return $this->precio;
        }

        //chucho Aqui sera la parte Gratuito

        public function setEsGratuito($esGratuito)
        {
            $this->esGratuito = $esGratuito;
        }
        public function getEsGratuito()
        {
            return $this->esGratuito;
        }

    }

?>
