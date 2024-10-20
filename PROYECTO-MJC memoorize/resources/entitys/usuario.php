<?php

    class Usuario
    {
        private $nickName;
        private $correo;    
        private $contraseña;

        //nickName

        public function setNickName($nickName)
        {
            $this->nickName = $nickName;
        }
        public function getNickName()
        {
            return $this->nickName;
        }

        //correo

        public function setCorreo($correo)
        {
            $this->correo = $correo;
        }
        public function getCorreo()
        {
            return $this->correo;
        }

        //contraseña

        public function setContraseña($contraseña)
        {
            $this->contraseña = $contraseña;
        }
        public function getContraseña()
        {
            return $this->contraseña;
        }

    }

?>